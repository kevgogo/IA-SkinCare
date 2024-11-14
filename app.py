from flask import Flask, request, jsonify, render_template
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
from PIL import Image
import numpy as np
import tensorflow as tf
import io

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
height = 244
width = 244
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
        image_bytes = file.stream
        image = io.BytesIO(image_bytes)

        img = tf.keras.utils.load_img(image, target_size=(height, width))
        
        img_array = tf.keras.utils.img_to_array(img)
        img_array = tf.expand_dims(img_array, 0)
        predictions = model.predict(img_array)
        score = tf.nn.softmax(predictions[0])
        clase = class_names[np.argmax(score)]
        points = 100 * np.max(score)

        # Return the result
        return jsonify({
            'prediction': clase,
            'confidence': points
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
