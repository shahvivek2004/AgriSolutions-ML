import React, { useState } from 'react';
import axios from 'axios';
import styles from './cropSys.module.css';  // Import the CSS module
import { useNavigate } from 'react-router-dom';

function Cropsys() {
    const [nitrogen, setNitrogen] = useState('');
    const [phosphorus, setPhosphorus] = useState('');
    const [potassium, setPotassium] = useState('');
    const [temperature, setTemperature] = useState('');
    const [humidity, setHumidity] = useState('');
    const [ph, setPh] = useState('');
    const [rainfall, setRainfall] = useState('');
    const [recommendation, setRecommendation] = useState(null);
    const navigate=useNavigate();

    const handleClick=()=>{
        navigate("/liveopt");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/predict', {
                nitrogen: nitrogen,
                phosphorus: phosphorus,
                potassium: potassium,
                temperature: temperature,
                humidity: humidity,
                ph: ph,
                rainfall: rainfall
            });
            setRecommendation(response.data.recommended_crop);
        } catch (error) {
            console.log("Error submitting data:", error);
        }
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.heading}>Crop Recommendation System</h3>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    className={styles.input}
                    type="number"
                    value={nitrogen}
                    onChange={e => setNitrogen(e.target.value)}
                    placeholder="Nitrogen"
                    name='nitro'
                />
                <input
                    className={styles.input}
                    type="number"
                    value={phosphorus}
                    onChange={e => setPhosphorus(e.target.value)}
                    placeholder="Phosphorus"
                />
                <input
                    className={styles.input}
                    type="number"
                    value={potassium}
                    onChange={e => setPotassium(e.target.value)}
                    placeholder="Potassium"
                />
                <input
                    className={styles.input}
                    type="number"
                    value={temperature}
                    onChange={e => setTemperature(e.target.value)}
                    placeholder="Temperature"
                />
                <input
                    className={styles.input}
                    type="number"
                    value={humidity}
                    onChange={e => setHumidity(e.target.value)}
                    placeholder="Humidity"
                />
                <input
                    className={styles.input}
                    type="number"
                    value={ph}
                    onChange={e => setPh(e.target.value)}
                    placeholder="pH"
                />
                <input
                    className={styles.input}
                    type="number"
                    value={rainfall}
                    onChange={e => setRainfall(e.target.value)}
                    placeholder="Rainfall"
                />
                <button className={styles.button} type="submit">Get Recommendation</button>
            </form>

            <button className={styles.button} onClick={handleClick}>Live Option</button>
            {recommendation && <h2 className={styles.recommendation}>Recommended Crop: {recommendation}</h2>}
        </div>
    );
}

export default Cropsys;
