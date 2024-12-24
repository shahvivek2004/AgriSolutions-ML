import React, { useState } from 'react';
import axios from 'axios';
import styles from './cropDis.module.css';

const CropDiseaseDetector = () => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); // For image preview
  const [diseasePrediction, setDiseasePrediction] = useState('');
  const [info, setInfo] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file)); // Create preview URL for the image
  };

  const detectDisease = async () => {
    if (!image) {
      alert('Please upload an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await axios.post('http://localhost:5000/detect_disease', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setDiseasePrediction(response.data.disease);
      setInfo(response.data.info); // Info contains the HTML string now
    } catch (error) {
      console.error('Error in detecting disease:', error);
      alert('An error occurred while detecting the disease.');
    }
  };

  return (
    <div className={styles.bg}>
    <div className={styles.container}>
      <h2 className={styles.title}>Crop Disease Detection</h2>
      <div className={styles.inputWrapper}>
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className={styles.fileInput}
        />
      </div>

      {/* Image Preview */}
      {previewUrl && (
        <div className={styles.previewWrapper}>
          <img src={previewUrl} alt="Uploaded Preview" className={styles.imagePreview} />
        </div>
      )}

      <button onClick={detectDisease} className={styles.button}>Detect Disease</button>

      {diseasePrediction && (
        <div className={styles.result}>
          <h1 className={styles.resultTitle}>Prediction Result</h1>
          <h3 className={styles.resultText}>{diseasePrediction}</h3>
          <div
            className={styles.resultInfo}
            dangerouslySetInnerHTML={{ __html: info }}
          />
        </div>
      )}
    </div>
    </div>
  );
};

export default CropDiseaseDetector;
