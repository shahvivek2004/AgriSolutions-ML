# AgriSolutions-ML

AgriSolutions-ML is a web-based agriculture assistant system that leverages machine learning models to provide crop recommendations, fertilizer suggestions, and crop detection. This project is built using React.js for the frontend, Node.js for the backend (login and registration), and Flask for serving machine learning models.

## Features

- **User Authentication**: Provides secure login and registration for users.
- **Crop Recommendation**: Recommends suitable crops based on various factors such as soil and weather conditions.
- **Fertilizer Recommendation**: Suggests fertilizers based on the crops selected and soil conditions.
- **Crop Detection**: Detects and classifies crops based on images provided by users.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js (for login and registration)
- **Machine Learning**: Flask (for serving ML models)
- **Database**: (Add if you're using a database, e.g., MongoDB, PostgreSQL, etc.)
- **Hosting/Deployment**: (Mention if you're using any specific hosting, e.g., Heroku, AWS, etc.)

## Installation

Follow these steps to set up and run the project locally:


### 1. Clone the repository

```bash
git clone https://github.com/shahvivek2004/AgriSolutions-ML.git
cd AgriSolutions-ML
```


### 2. Set up the Frontend (React)
Go to the frontend folder and install the required dependencies:

```bash
Copy code
cd frontend
npm install
```


### 3. Set up the Backend (Node.js)
Go to the backend folder and install the necessary dependencies:

```bash
Copy code
cd backend
npm install
```


### 4. Set up the Machine Learning Model (Flask)
Go to the ml-model folder and install the required Python dependencies:

```bash
Copy code
cd ml-model
pip install -r requirements.txt
```
Make sure you have Python 3.6+ installed. You'll also need to configure the models as per the instructions in the ml-model folder.


### 5. Run the Frontend
```bash
Copy code
cd frontend
npm start
```
This will start the frontend application on http://localhost:3000.


### 6. Run the Backend
```bash
Copy code
cd backend
node server.js
```
Make sure your backend is running and listening on a specified port (default is http://localhost:5000).


### 7. Run the Machine Learning Model
Run the Flask application to serve the machine learning models:

```bash
Copy code
cd ml-model
flask run
```
The Flask app should be running on a default port (usually http://localhost:5000).

## How It Works
Frontend: Users can interact with the system to request crop recommendations, fertilizer suggestions, and crop detection by submitting input data through a user-friendly interface.
Backend: The backend manages user authentication and communicates between the frontend and the Flask API for serving the machine learning predictions.
Machine Learning: The Flask API serves the pre-trained machine learning models to provide crop recommendations, fertilizer suggestions, and detect crops based on image input.
Folder Structure
```bash
Copy code
AgriSolutions-ML/
├── backend/              # Node.js backend for login/registration
├── frontend/             # React.js frontend
├── ml-model/             # Flask application serving ML models
├── .gitignore            # Git ignore file
├── README.md             # Project documentation
└── requirements.txt      # Python dependencies for ML model
```

## Contributing
Contributions are welcome! Feel free to fork the repository, open issues, and submit pull requests. Please follow the standard GitHub flow for contributions.

### Steps for Contributing
- Fork the repository.
- Create a new branch `(git checkout -b feature-branch)`.
- Make changes and commit them `(git commit -m 'Add new feature')`.
- Push to the branch `(git push origin feature-branch)`.
- Create a Pull Request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
Special thanks to the open-source community for providing resources and libraries.
