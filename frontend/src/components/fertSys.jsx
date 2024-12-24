import React, { useState } from 'react';
import axios from 'axios';
import styles from "./fertSys.module.css";

function Fertsys() {
  const [formData, setFormData] = useState({
    Temperature: '',
    Humidity: '',
    Moisture: '',
    Soil_Type: '',
    Crop_Type: '',
    Nitrogen: '',
    Potassium: '',
    Phosphorous: ''
  });
  const [recommendation, setRecommendation] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/recommend', formData);
      setRecommendation(response.data.recommended_fertilizer);
    } catch (error) {
      console.error("There was an error making the request", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Fertilizer Recommender</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Temperature:</label>
          <input
            type="number"
            name="Temperature"
            className="form-control"
            value={formData.Temperature}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Humidity:</label>
          <input
            type="number"
            name="Humidity"
            className="form-control"
            value={formData.Humidity}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Moisture:</label>
          <input
            type="number"
            name="Moisture"
            className="form-control"
            value={formData.Moisture}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Soil Type:</label>
          <input
            type="text"
            name="Soil_Type"
            className="form-control"
            value={formData.Soil_Type}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Crop Type:</label>
          <input
            type="text"
            name="Crop_Type"
            className="form-control"
            value={formData.Crop_Type}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Nitrogen:</label>
          <input
            type="number"
            name="Nitrogen"
            className="form-control"
            value={formData.Nitrogen}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Potassium:</label>
          <input
            type="number"
            name="Potassium"
            className="form-control"
            value={formData.Potassium}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Phosphorous:</label>
          <input
            type="number"
            name="Phosphorous"
            className="form-control"
            value={formData.Phosphorous}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Get Recommendation</button>
      </form>

      {recommendation && (
        <div className="mt-4">
          <h4>Recommended Fertilizer:</h4>
          <p>{recommendation}</p>
        </div>
      )}
    </div>
  );
}

export default Fertsys;
