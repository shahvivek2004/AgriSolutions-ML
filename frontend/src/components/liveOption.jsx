import React, { useState } from "react";
import axios from "axios";
import Papa from "papaparse";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import styles from "./liveOption.module.css";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import OpacityIcon from "@mui/icons-material/Opacity";
import ScienceIcon from "@mui/icons-material/Science";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import WaterDropIcon from "@mui/icons-material/WaterDrop";

const Live = () => {
  const [cropsData, setCropsData] = useState([]); // Stores predicted crops
  const [uploadedFile, setUploadedFile] = useState(null); // Stores the uploaded CSV file
  const [recommendation, setRecommendation] = useState(null); // Stores the recommended crop

  // Handle file selection
  const handleFileChange = (e) => {
    setUploadedFile(e.target.files[0]);
  };

  // Handle CSV file upload and prediction
  const handleFileUpload = async () => {
    if (!uploadedFile) {
      alert("Please upload a CSV file.");
      return;
    }

    // Parse CSV file
    Papa.parse(uploadedFile, {
      header: true,
      skipEmptyLines: true,
      complete: async function (results) {
        console.log("Parsed CSV Data:", results.data);
        const x = results.data;

        // Ensure valid CSV format
        if (!x[0] || !x[0]["nitrogen"]) {
          alert("Invalid CSV format. Ensure the file has correct headers.");
          return;
        }

        try {
          // Send parsed data to the backend for prediction
          const response = await axios.post("http://localhost:5000/predict", {
            nitrogen: x[0]["nitrogen"],
            phosphorus: x[0]["phosphorus"],
            potassium: x[0]["potassium"],
            temperature: x[0]["temperature"],
            humidity: x[0]["humidity"],
            ph: x[0]["ph"],
            rainfall: x[0]["rainfall"],
          });

          console.log("API Response:", response.data);

          setCropsData(x);
          setRecommendation(response.data.recommended_crop || null);
        } catch (error) {
          console.error("Error processing CSV:", error);
          alert("An error occurred while processing the data.");
        }
      },
    });
  };
  

  return (
    <div className={styles.app}>
      <section className={styles.infoSection}>
        <h1 className={styles.title}>Live Survey Data</h1>
        <div>
          <input type="file" accept=".csv" onChange={handleFileChange} />
          <button className={styles.btn} onClick={handleFileUpload}>Upload and Predict</button>
        </div>

        {/* Display the recommended crop */}
        {recommendation && <h2>Recommended Crop: {recommendation}</h2>}

        {/* Render cards for predicted crops */}
        <div className={styles.cropsGrid}> 
            {
            cropsData.map((crop, index) => (
              <div className={styles.cropCard} key={index}>
                <h2 className={styles.cropName}>{recommendation || "Unknown Crop"}</h2>
                <p>
                  <ThermostatIcon style={{ color: "#f44336" }} /> <strong>Temperature:</strong>{" "}
                  {crop.temperature || "N/A"}°C
                </p>
                <p>
                  <ScienceIcon style={{ color: "#673ab7" }} /> <strong>pH:</strong>{" "}
                  {crop.ph || "N/A"}
                </p>
                <p>
                  <OpacityIcon style={{ color: "#2196f3" }} /> <strong>Moisture:</strong>{" "}
                  {crop.humidity || "N/A"}%
                </p>
                <p>
                  <AgricultureIcon style={{ color: "#4caf50" }} /> <strong>Potassium:</strong>{" "}
                  {crop.potassium || "N/A"}%
                </p>
                <p>
                  <AgricultureIcon style={{ color: "#ff9800" }} /> <strong>Phosphorus:</strong>{" "}
                  {crop.phosphorus || "N/A"}%
                </p>
                <p>
                  <WaterDropIcon style={{ color: "#00bcd4" }} /> <strong>Nitrogen:</strong>{" "}
                  {crop.nitrogen || "N/A"}%
                </p>
              </div>
            ))}
        
        </div>
      </section>

      {/* Render the graph for predicted crops */}
      {cropsData && cropsData.length > 0 && (
        <section className={styles.graphSection}>
          <h2 className={styles.graphTitle}>Graphical Analysis</h2>
          <BarChart width={900} height={400} data={cropsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="temperature" fill="#8884d8" />
            <Bar dataKey="humidity" fill="#82ca9d" />
          </BarChart>
        </section>
      )}
    </div>
  );
};

export default Live;
