
# data = pd.read_csv(r'C:\Users\Dell\OneDrive\Desktop\Placement\timepass\minor_proj\ml-model\crop_recommendation.csv')


# # Features and target
# X = data[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']]
# y = data['label']

# # Train-test split
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# # Train a Random Forest Classifier
# model = RandomForestClassifier()
# model.fit(X_train, y_train)

# # Evaluate the model
# y_pred = model.predict(X_test)
# print(f"Accuracy: {accuracy_score(y_test, y_pred)}")

# # Save the trained model
# joblib.dump(model, 'crop_recommendation_model.pkl')




import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score
import joblib

# Load the CSV (replace 'fertilizer_data.csv' with your actual file path)
df=pd.read_csv(r'C:\Users\Dell\OneDrive\Desktop\Placement\timepass\to-dolist\ml-model\fert.csv')

# Initialize label encoders for the categorical fields
label_encoder_soil = LabelEncoder()
label_encoder_crop = LabelEncoder()

# Encode the categorical fields
df['Soil_Type'] = label_encoder_soil.fit_transform(df['Soil_Type'])
df['Crop_Type'] = label_encoder_crop.fit_transform(df['Crop_Type'])

# Define the features (X) and target (y)
X = df[['Temparature', 'Humidity', 'Moisture', 'Soil_Type', 'Crop_Type', 'Nitrogen', 'Potassium', 'Phosphorous']]
y = df['Fertilizer']  # Target variable is the 'Fertilizer' column

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a Random Forest classifier
model = RandomForestClassifier()
model.fit(X_train, y_train)


y_pred = model.predict(X_test)
print(f"Accuracy: {accuracy_score(y_test, y_pred)}")

# Save the model and the encoders


joblib.dump(model, 'fert_model.pkl')
joblib.dump(label_encoder_soil, 'soil_type_encoder.pkl')
joblib.dump(label_encoder_crop, 'crop_type_encoder.pkl')

print("Model and encoders saved successfully!")
