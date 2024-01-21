import tensorflow as tf
import numpy as np
import cv2
from PIL import Image
import matplotlib.pyplot as plt

def load_model():
    model = tf.keras.models.load_model("model.h5")
    return model

hindi_character = ['ञ', 'ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'क', 'न', 'प', 'फ', 'ब', 'भ', 'म', \
                    'य', 'र', 'ल', 'व', 'ख', 'श', 'ष', 'स', 'ह', 'ॠ', 'त्र', 'ज्ञ', 'ग', 'घ', 'ङ', 'च', 'छ', \
                    'ज', 'झ', '0', '१', '२', '३', '४', '५', '६', '७', '८', '९']

model = load_model()

def load_and_prep(file_path):
    opencv_image = cv2.imread(file_path)
    img = tf.image.resize(opencv_image, size=[32, 32])
    return img

def get_n_predictions(pred_prob, n):
    pred_prob = np.squeeze(pred_prob)
    top_n_max_idx = np.argsort(pred_prob)[::-1][:n]
    top_n_max_val = list(pred_prob[top_n_max_idx])
    top_n_class_name = [hindi_character[i] for i in top_n_max_idx]
    return top_n_class_name, top_n_max_val

image_path = '79792.png'

img = load_and_prep(image_path)


pred_prob = model.predict(tf.expand_dims(img, axis=0))
n = 1  
class_name, confidence = get_n_predictions(pred_prob, n)


print(f"Top {n} Prediction for the given image:")
print(f"Class Name: {class_name[0]}, Confidence: {confidence[0]*100:.1f}%")
