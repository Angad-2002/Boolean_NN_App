import os
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"

from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from flask_cors import CORS
from sklearn.decomposition import PCA

app = app = Flask(__name__, static_folder='./build', static_url_path='/')
CORS(app)

def generate_truth_table(num_variables, boolean_function):
    inputs = np.array([[int(x) for x in format(i, f'0{num_variables}b')] for i in range(2**num_variables)])
    outputs = np.array([int(eval(boolean_function, {f'X{i+1}': inputs[j, i] for i in range(num_variables)})) for j in range(2**num_variables)])
    return inputs, outputs

def build_and_train_nn(num_variables, boolean_function, network_structure, epochs, learning_rate, optimizer, loss_function):
    inputs, outputs = generate_truth_table(num_variables, boolean_function)

    model = keras.Sequential()
    model.add(layers.Input(shape=(num_variables,)))  # Input layer

    for layer in network_structure:
        model.add(layers.Dense(layer["outputNeurons"], activation=layer["activation"]))

    model.compile(optimizer=optimizer, loss=loss_function, metrics=['accuracy'])
    model.fit(inputs, outputs, epochs=epochs, verbose=0)

    # Generate a high-dimensional grid for visualization
    grid = np.array(np.meshgrid(*[np.linspace(0, 1, 20)] * num_variables)).T.reshape(-1, num_variables)
    predictions = model.predict(grid)

    if num_variables > 2:
        pca = PCA(n_components=2)
        reduced_grid = pca.fit_transform(grid)
        scatter_data = [{"x": reduced_grid[i, 0], "y": reduced_grid[i, 1], "z": predictions[i][0]} for i in range(len(grid))]
    else:
        scatter_data = [{"x": grid[i, 0], "y": grid[i, 1], "z": predictions[i][0]} for i in range(len(grid))]
    
    scatter_data = [{"x": float(grid[i, 0]), "y": float(grid[i, 1]), "z": float(predictions[i][0])} for i in range(len(grid))]

    return scatter_data

@app.route('/train', methods=['POST'])
def train():
    data = request.json
    scatter_data = build_and_train_nn(
        data['num_variables'],
        data['boolean_function'],
        data['network_structure'],
        data['epochs'],
        data['learning_rate'],
        data['optimizer'],
        data['loss_function']
    )
    return jsonify({"scatter_plot": scatter_data})

if __name__ == '__main__':
    app.run(debug=True)
