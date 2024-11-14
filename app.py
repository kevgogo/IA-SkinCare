from flask import Flask, request, jsonify, render_template
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
from PIL import Image
import numpy as np
import tensorflow as tf

TF_ENABLE_ONEDNN_OPTS=0

app = Flask(__name__)

class_names = {
    0: 'actinic keratosis',
    1: 'basal cell carcinoma',
    2: 'dermatofibroma',
    3: 'melanoma',
    4: 'nevus',
    5: 'pigmented benign keratosis',
    6: 'seborrheic keratosis',
    7: 'squamous cell carcinoma',
    8: 'vascular lesion',
}

# Load the .h5 model
model = load_model('skin_cancer_model.h5', compile=False)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    
    try:
        # Load and preprocess the image
        image = Image.open(file).convert("RGB")
        image = image.resize((224, 224))
        image = img_to_array(image)
        image = np.expand_dims(image, axis=0)

        # Make prediction
        predictions = model.predict(image)
        print("Raw predictions:", predictions)  # Debug: Print raw predictions
        predicted_class_index = np.argmax(predictions[0])
        class_name = class_names[predicted_class_index]
        confidence = float(predictions[0][predicted_class_index])

        # Return the result
        return jsonify({
            'prediction': class_name,
            'confidence': confidence
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
