import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcryptjs";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import session from "express-session";
import env from "dotenv";
import cors from 'cors';
import flash from "connect-flash";
import axios from "axios";
import moment from "moment";
import { stringify } from "querystring";

const app = express();
const saltRounds = 10;
env.config();

const d =new Date().getDate();

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 5, // 5 minute
            secure: process.env.NODE_ENV === "production", // Ensure cookies are sent over HTTPS
            httpOnly: true,
        }
    })
);

app.use(cors({
    origin: process.env.CLIENT_LINK,
    credentials: true,
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

db.connect();

// Route to check authentication status and fetch user data
app.get('/home', (req, res) => {
    if (req.isAuthenticated()) {
        return res.json({ message: 'Welcome to the home page', user: req.user });
    }
    return res.status(401).json({ error: 'Unauthorized' });
});

// Login route with passport local strategy
app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (!user) {
            return res.status(400).json({ error: info.message || 'Invalid credentials' });
        }
        req.login(user, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to log in' });
            }
            return res.json({ message: 'Logged in successfully', user });
        });
    })(req, res, next);
});

// Logout route
app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to log out' });
        }
        return res.json({ message: 'Logged out successfully' });
    });
});

// Passport local strategy for authentication
passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const result = await db.query('SELECT * FROM cust WHERE email = $1', [username]);
            if (result.rows.length === 0) {
                return done(null, false, { message: 'Incorrect username' });
            }
            const user = result.rows[0];
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, { message: 'Incorrect password' });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

//================================================================================================//

app.get("/google/fail",async(req,res)=>{
    res.json({message:true});
});

app.get("/google/success",async(req,res)=>{
    res.json({message:true});
});


app.get(
    "/auth/google",
    passport.authenticate("google", {
        scope: ['profile', 'email'],
    })
);

//Google call-back
app.get('/auth/google/return',
    passport.authenticate('google',
        {
            failureRedirect: process.env.CLIENT_LINK,
            successRedirect: process.env.CLIENT_LINK,
        }),
);

//Google Auth
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_LINK}/auth/google/return` // Ensure this matches your backend URL
},
    async (token, tokenSecret, profile, done) => {
        // console.log(profile);
        try {
            let user = await db.query("SELECT * FROM cust WHERE email=$1", [profile.email]);

            if (user.rows.length === 0) {
                const result = await db.query(
                    "INSERT INTO cust (username, email, password) VALUES ($1, $2, $3) RETURNING *",
                    [profile.displayName, profile.email, process.env.SECRET_GOOGLE_AUTH_PASSWORD]
                );
                user = result.rows[0];
            } else {
                user = user.rows[0];
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

//=============================================================================================================//



// Serialize user to store user ID in the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});


// Deserialize user to fetch user details from the database using the ID stored in the session
passport.deserializeUser(async (id, done) => {
    try {
        const result = await db.query('SELECT * FROM cust WHERE id = $1', [id]);
        if (result.rows.length > 0) {
            done(null, result.rows[0]);
        } else {
            done(new Error('User not found'));
        }
    } catch (err) {
        done(err);
    }
});


// Registration route
app.post("/register", async (req, res) => {
    const uname = req.body.username;
    const umail = req.body.email;
    const upass = req.body.password;

    try {
        const checkResult = await db.query("SELECT * FROM cust WHERE email = $1", [umail]);

        if (checkResult.rows.length > 0) {
            return res.status(400).json({ message: "User is already registered with this email!", newUser: false });
        } else {
            const hashedPassword = await bcrypt.hash(upass, saltRounds);
            try {
                await db.query("INSERT INTO cust (username, email, password) VALUES ($1, $2, $3)", [uname, umail, hashedPassword]);
                res.json({ message: "User registered successfully!", newUser: true });
            } catch (error) {
                res.status(500).json({ message: 'Error registering user', newUser: false });
            }
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error', newUser: false });
    }
});

//=====================================================Auth Module Completed Here=======================================//

app.get("/get/:id",async(req,res)=>{
    const userId=req.params.id;
    try {
          const respo=(await db.query("SELECT *FROM  todos where user_id=$1",[userId])).rows;
          res.json(respo);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to fetch users" });
    }

});

app.post("/add",async(req,res)=>{
    const id=req.body.id;
    const title=req.body.title;
    const description=req.body.content;
    try {
        await db.query("INSERT INTO todos (user_id,title,description) VALUES ($1,$2,$3)",[id,title,description]);
        res.json({message:"successfully added"});
    } catch (error) {
        res.json({message:"error in adding"});
    }
});

app.delete("/delete/:id",async(req,res)=>{
    const noteItemId=req.params.id;
    try {
        await db.query("DELETE FROM todos WHERE id=$1",[noteItemId]);
        res.json({message:"deleted successfully!"});
    } catch (error) {
        res.json({error:"error deleting record"});
    }
});

//========================================================CRUD module completed====================================================//



const apiKey = "579b464db66ec23bdd0000016fca6c37ed8b4a407b0bd9de67848d6c";
const resourceUUID = '35985678-0d79-46b4-9ed6-6f13308a1d24';
const apiUrl = `https://api.data.gov.in/resource/${resourceUUID}`;

app.get('/api/data/', async (req, res) => {
    try {
      // Step 2: Make the request to the external API and apply filter by date (if possible)
      const params = {
        'api-key': apiKey,
        format: 'json',
        limit: 1000,  // Fetch more results, if needed
        filters: { Arrival_Date: '07/10/2024', State:'Gujarat'}, // Filter for yesterday's date
      };
  
      const response = await axios.get(apiUrl, { params });
      const mainDistricts = ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"];
      const filteredData = response.data.records.filter(record => 
      mainDistricts.includes(record.District));
     // console.log(filteredData);
      res.json(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Error fetching data' });
    }
  });


// Start the server
app.listen(process.env.SERVER_PORT, () => {
    console.log(`API is running at ${process.env.SERVER_LINK}`);
});



























// passport.use(
//     "local",
//     new Strategy(async function verify(username, password, cb) {
//         try {
//             const result = await db.query("SELECT * FROM users WHERE email = $1 ", [
//                 username,
//             ]);
//             if (result.rows.length > 0) {
//                 const user = result.rows[0];
//                 console.log(user);
//                 const storedHashedPassword = user.password;
//                 bcrypt.compare(password, storedHashedPassword, (err, valid) => {
//                     if (err) {
//                         console.log(err);
//                         return cb(err);
//                     } else {
//                         if (valid) {
//                             return cb(null, user);
//                         } else {
//                             return cb(null, false);
//                         }
//                     }
//                 });
//             } else {
//                 console.log("USER NOT FOUND")
//                 return cb("USER NOT FOUND");
//             }
//         } catch (err) {
//             console.log("ERROR IN LOGIN");
//             console.log(err);
//         }
//     })
// );




// app.get('/home', (req, res) => {
//     console.log("HI");
//     if (req.isAuthenticated()) {
//         console.log(req.user);
//         res.json({ message: 'Welcome to the home page', user: req.user });
//     } else {
//         console.log("HI@");
//         res.status(401).json({ error: 'Unauthorized' });
//     }
// });

// app.get('/logout', (req, res) => {
//     req.logout(err => {
//       if (err) {
//         return next(err);
//       }
//       res.json({ message: 'Logged out successfully' });
//     });
//   });
  


// app.post('/login', (req, res, next) => {
//     console.log('Request Body:', req.body); // Log the request body
//     passport.authenticate('local', (err, user, info) => {
//         if (err) {
//             console.error('Authentication Error:', err); // Log any errors
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }
//         if (!user) {
//             console.error('Invalid credentials:', info); // Log invalid credentials
//             return res.status(400).json({ error: 'Invalid credentials' });
//         }

//         req.login(user, (err) => {
//             if (err) {
//                 console.error('Login Error:', err); // Log login errors
//                 return res.status(500).json({ error: 'Failed to log in' });
//             }
//             console.log(`User in POST login: ${[user]}`);
//             return res.json({ message: 'Logged in successfully' });
//         });
//     })(req, res, next);
// });




// passport.use(new Strategy(
//     async (username, password, done) => {
//         try {
//             const res = await db.query('SELECT * FROM users WHERE email = $1', [username]);
//             if (res.rows.length > 0) {
//                 const user = res.rows[0];
//                 const match = await bcrypt.compare(password, user.password);
//                 if (match) {
//                     return done(null, user);
//                 } else {
//                     return done(null, false, { message: 'Incorrect password' });
//                 }
//             } else {
//                 return done(null, false, { message: 'Incorrect username' });
//             }
//         } catch (err) {
//             return done(err);
//         }
//     }
// ));

// passport.serializeUser((user, done) => {
//     console.log(`serilalizeUserData: ${user}`);
//     done(null, user);
// });

// passport.deserializeUser((user, done) => {
//    console.log(`deserializeUserData: ${user}`);
//    done(null,user);
// });