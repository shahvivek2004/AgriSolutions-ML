from flask import Flask, request, jsonify,render_template_string

from flask_cors import CORS
import joblib
import pandas as pd
import torch
import torch.nn as nn
from PIL import Image
from torchvision import models, transforms
import io
from disease import disease_data

# Define the disease classes and load external data
disease_classes = [
    'Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy',
    'Blueberry___healthy', 'Cherry_(including_sour)___Powdery_mildew', 'Cherry_(including_sour)___healthy',
    'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot', 'Corn_(maize)___Common_rust_',
    'Corn_(maize)___Northern_Leaf_Blight', 'Grape___Black_rot', 'Corn_(maize)___healthy',
    'Grape___Esca_(Black_Measles)', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Grape___healthy',
    'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot', 'Pepper,_bell___Bacterial_spot',
    'Pepper,_bell___healthy', 'Potato___Early_blight', 'Potato___Late_blight', 'Potato___healthy',
    'Raspberry___healthy', 'Soybean___healthy', 'Squash___Powdery_mildew', 'Strawberry___Leaf_scorch',
    'Strawberry___healthy', 'Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___Late_blight',
    'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot', 'Tomato___Spider_mites Two-spotted_spider_mite',
    'Tomato___Target_Spot', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus',
    'Tomato___healthy'
]

# Initialize Flask app and enable CORS
app = Flask(__name__)
CORS(app, supports_credentials=True, origins='http://localhost:3000')

# Define the CropDiseaseModel with updated weights loading
class CropDiseaseModel(nn.Module):
    def __init__(self, num_classes):
        super(CropDiseaseModel, self).__init__()
        self.resnet = models.resnet18(weights=models.ResNet18_Weights.IMAGENET1K_V1)
        in_features = self.resnet.fc.in_features
        self.resnet.fc = nn.Linear(in_features, num_classes)
    
    def forward(self, x):
        return self.resnet(x)

# Load models and encoders
try:
    model2 = joblib.load(r'crop_recommendation_model.pkl')
    model = joblib.load(r'fert_model.pkl')
    label_encoder_soil = joblib.load(r'soil_type_encoder.pkl')
    label_encoder_crop = joblib.load(r'crop_type_encoder.pkl')
except Exception as e:
    print(f"Error loading model or encoders: {e}")

# Initialize and load disease model weights
num_classes = len(disease_classes)
disease_model = CropDiseaseModel(num_classes=num_classes)
disease_model.load_state_dict(
    torch.load(r'plant_disease_model.pth', map_location=torch.device('cpu')), strict=False
)
disease_model.eval()

# Define image transformation
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

@app.route('/detect_disease', methods=['POST'])
def detect_disease():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        img = Image.open(io.BytesIO(file.read())).convert('RGB')
        img_tensor = transform(img).unsqueeze(0)

        with torch.no_grad():
            output = disease_model(img_tensor)
            _, predicted = torch.max(output, 1)
            predicted_class = predicted.item()

        disease_name = disease_classes[predicted_class]
        disease_info = disease_data.get(disease_name, 'No information available for this disease.')
        str1=render_template_string(disease_info)
        print(str1)
        return jsonify({'disease': disease_name, 'info': str1})

    except Exception as e:
        print("Error during disease detection:", e)
        return jsonify({'error': 'Internal server error occurred'}), 500


@app.route('/recommend', methods=['POST'])
def fertilizer_recommendation():
    try:
        data = request.get_json()
        soil_type_encoded = label_encoder_soil.transform([data['Soil_Type']])[0]
        crop_type_encoded = label_encoder_crop.transform([data['Crop_Type']])[0]

        input_data = pd.DataFrame([{
            'Temparature': float(data['Temperature']),
            'Humidity': float(data['Humidity']),
            'Moisture': float(data['Moisture']),
            'Soil_Type': soil_type_encoded,
            'Crop_Type': crop_type_encoded,
            'Nitrogen': float(data['Nitrogen']),
            'Potassium': float(data['Potassium']),
            'Phosphorous': float(data['Phosphorous'])
        }])

        recommended_fertilizer = model.predict(input_data)[0]
        return jsonify({'recommended_fertilizer': recommended_fertilizer})

    except Exception as e:
        print("Error during fertilizer recommendation:", e)
        return jsonify({'error': f'Internal server error occurred: {str(e)}'}), 500


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        input_data = pd.DataFrame([{
            'N': float(data['nitrogen']),
            'P': float(data['phosphorus']),
            'K': float(data['potassium']),
            'temperature': float(data['temperature']),
            'humidity': float(data['humidity']),
            'ph': float(data['ph']),
            'rainfall': float(data['rainfall'])
        }])

        prediction = model2.predict(input_data)[0]
        return jsonify({'recommended_crop': prediction})

    except Exception as e:
        print("Error during crop prediction:", e)
        return jsonify({'error': f'Internal server error occurred: {str(e)}'}), 500


if __name__ == '__main__':
    app.run(debug=True)
