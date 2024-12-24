from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load the trained model
model = joblib.load(r'C:\Users\Dell\OneDrive\Desktop\Placement\timepass\minor_proj\ml-model\crop_recommendation_model.pkl')
# Test with sample input data
sample_data = {
    'N': 90,
    'P': 32,
    'K': 35,
    'temperature': 45,
    'humidity': 35,
    'ph': 6,
    'rainfall': 56
}
input_data = pd.DataFrame([sample_data])

# Predict and print result
prediction = model.predict(input_data)
print(f"Recommended crop: {prediction[0]}")
