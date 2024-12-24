import React from "react";
import { Link } from 'react-router-dom';
import Header from "./Header";
import fi from "../assets/field2.jpg";
import pi from "../assets/ml.jpg";
import pj from "../assets/pl.jpg";
import us from "../assets/ab.png";
import cd from "../assets/cd.jpg";
import db from "../assets/db.jpg";
function Home({ user }) {
  return (
    <div>
      <Header uname={user.username} />

      {/* Hero Section */}
      <div className="image-section" style={{ width: "100%", textAlign: "center", margin: 0, padding: 0 }}>
        <img
          src={fi}
          alt="Agriculture Banner"
          style={{ width: "100%", height: "500px", objectFit: "cover", display: "block" }} 
        />
      </div>

        <div className="container-fluid text-center" style={{ position: "relative", top: "-300px" }}>
        <h1 className="text-white font-weight-bold">Machine Learning based Solutions in Agriculture</h1>
      </div>

      <section className="container my-5" id="about-us">
      <h2 className="text-center mb-5 font-weight-bold">About Us</h2>
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src={us}
              alt="About Us"
              style={{ width: "100%", height: "auto", borderRadius: "10px" }}
            />
          </div>
          <div className="col-md-6">
            <h3 className="font-weight-bold">Improving Agriculture, Improving Lives, With Help Of Tech</h3>
            <p style={{ fontSize: "1.1rem", lineHeight: "1.5" }}>
              We use state-of-the-art machine learning and deep learning technologies to help you guide through the entire farming process. Make informed decisions to understand the demographics of your area, understand the factors that affect your crop and keep them healthy for a super awesome successful yield.
            </p>
          </div>
        </div>
      </section>

      <section className="container my-5" id="services">
        <h2 className="text-center mb-5 font-weight-bold" style={{marginTop:"150px"}}>About Services</h2>
        <div className="row" style={{marginTop:"85px"}}>
          <div className="col-lg-4 col-md-6 mb-4">
            <h3 className="fw-normal text-center">Crop Recommender</h3>
            <img
              src={pi}
              alt="Crop Recommender"
              style={{ width: "100%", height: "238px", borderRadius: "10px", marginBottom: "15px" }}
            />
            <p>With the help of Machine Learning, it will help you to identify which kind of food should be grown in your farm according to various parameters.</p>
            <div className="text-center">
              <Link className="btn btn-secondary" to="/cropsys" style={{ backgroundColor: "#52cd19", border: "1px solid #52cd19", borderRadius: "30px", fontWeight: "700" }}>
                View details »
              </Link>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-4">
            <h3 className="fw-normal text-center">Fertilizer Recommender</h3>
            <img
              src={pj}
              alt="Fertilizer Recommender"
              style={{ width: "100%", height: "238px", borderRadius: "10px", marginBottom: "15px" }}
            />
            <p>With the help of Machine Learning, it will help you to identify which kind of fertilizers should be used in your farm according to various parameters.</p>
            <div className="text-center">
              <Link className="btn btn-secondary" to="/fertsys" style={{ backgroundColor: "#52cd19", border: "1px solid #52cd19", borderRadius: "30px", fontWeight: "700" }}>
                View details »
              </Link>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-4">
            <h3 className="fw-normal text-center">Crop Disease Detection</h3>
            <img
              src={cd}
              alt="Crop Disease Detection"
              style={{ width: "100%", height: "238px", borderRadius: "10px", marginBottom: "15px" }}
            />
            <p>With the help of Machine Learning, it will help you to identify diseased plant on the basis of its picture, and give output according to various parameters.</p>
            <div className="text-center">
              <Link className="btn btn-secondary" to="/cropdis" style={{ backgroundColor: "#52cd19", border: "1px solid #52cd19", borderRadius: "30px", fontWeight: "700" }}>
                View details »
              </Link>
            </div>
          </div>


          <div className="col-lg-4 col-md-6 mb-4">
            <h3 className="fw-normal text-center">Dashboard</h3>
            <img
              src={db}
              alt="Crop Disease Detection"
              style={{ width: "100%", height: "238px", borderRadius: "10px", marginBottom: "15px" }}
            />
            <p>In this Dashboard we have uploded what we have collected from real time sensors during our on data based survey and included </p>
            <div className="text-center">
              <Link className="btn btn-secondary" to="/dashboard" style={{ backgroundColor: "#52cd19", border: "1px solid #52cd19", borderRadius: "30px", fontWeight: "700" }}>
                View details »
              </Link>
            </div>
          </div>

          {/* Optional Third Component */}
          {/* You can add a third component similarly if needed */}
        </div>
      </section>
    </div>
  );
}

export default Home;
