# Boolean Neural Network Web Application  

This web application allows users to input a Boolean truth table and a neural network structure, and it will generate a scatter plot as the output. The application uses a Flask backend to handle data processing and a React frontend for a responsive user interface. It integrates machine learning using neural networks to visualize Boolean function results.  

## Features  

- **Interactive UI**: An intuitive, responsive frontend built with React.  
- **Input Boolean Functions**: Users can input the number of input variables and the corresponding Boolean function.  
- **Neural Network Training**: The backend utilizes a neural network model to train on the Boolean function.  
- **Scatter Plot Output**: Displays a scatter plot that visualizes the neural network's output.  
- **Optimized for Limited Resources**: Runs on Render with `0.1 CPU`, so complexity needs to be kept low.  
- **Multiple Activation Functions**: Supports **ReLU, Sigmoid, Tanh, and Softmax** activation functions.  
- **Multiple Loss Functions**: Supports **Mean Squared Error (MSE), Binary Cross-Entropy, and Categorical Cross-Entropy**.  
- **Optimizers Available**: Supports **Adam and Stochastic Gradient Descent (SGD)** for training.  
- **Responsive Design**: Fully optimized for mobile screens.  
- **Animation Effects**: Enhanced UI animations for a modern look and feel.  

## Neural Network Structure  

The application uses a fully connected neural network (MLP - Multi-Layer Perceptron) to train on the Boolean truth table. Here's a breakdown of the network structure:  

### **1. Input Layer**  
- The number of neurons corresponds to the number of input variables in the Boolean function. Each input neuron represents one variable in the truth table.  

### **2. Hidden Layer(s)**  
- One or more hidden layers with a varying number of neurons (usually depends on experimentation).  
- The following activation functions are available:  
  - **ReLU (Rectified Linear Unit)** – Default for hidden layers, introduces non-linearity.  
  - **Sigmoid** – Maps output between 0 and 1, useful for probability-based models.  
  - **Tanh** – Similar to Sigmoid but maps between -1 and 1.  
  - **Softmax** – Typically used in multi-class classification problems.  

### **3. Output Layer**  
- A single neuron in the output layer, representing the result of the Boolean function (0 or 1).  
- The activation function for the output layer can be **Sigmoid (for binary classification)** or **Softmax (for multi-class classification)**.  

### **4. Loss Functions**  
Depending on the use case, different loss functions are available:  
- **Mean Squared Error (MSE)** – Typically used for regression problems but can be used for binary classification with sigmoid outputs.  
- **Binary Cross-Entropy** – Used when the output is binary (0 or 1).  
- **Categorical Cross-Entropy** – Used when handling multi-class classification.  

### **5. Optimizers**  
The following optimization algorithms can be chosen:  
- **Adam** – A widely used optimizer that adapts learning rates for each parameter.  
- **Stochastic Gradient Descent (SGD)** – A simpler optimizer that updates parameters using small batches of data.  

### **6. Training**  
- The model is trained using the provided Boolean inputs and outputs for a predefined number of epochs.  
- The training process involves adjusting the weights of the network to minimize the selected loss function.  

## Boolean Function Format  

To ensure correct evaluation of Boolean functions, the format should follow Python's `eval()` function syntax. Variables should be named as `X1`, `X2`, `X3`, etc., representing the input variables.  

### **Example Boolean Functions**  
- AND function (for two variables):  
  ```python
  "X1 and X2"
  ```
- OR function (for three variables):  
  ```python
  "X1 or X2 or X3"
  ```
- XOR function (for two variables):  
  ```python
  "(X1 and not X2) or (not X1 and X2)"
  ```
- NAND function:  
  ```python
  "not (X1 and X2)"
  ```
- Custom function example for 3 variables:  
  ```python
  "(X1 and X2) or (not X3)"
  ```

⚠️ **Important Notes:**  
- The function should be written using Python's logical operators: `and`, `or`, `not`.  
- No additional mathematical operations (such as `+`, `-`, `*`, `/`) should be used.  
- Ensure that the number of variables in the function matches the number of input variables specified.  

## Keeping Computational Complexity Low  

Since the application is hosted on **Render** with limited computational resources (`0.1 CPU`), it is **strongly recommended** to:  
- **Limit the number of input variables**: Too many input variables result in an exponentially large truth table (e.g., 10 variables → 1024 entries).  
- **Keep neural network layers minimal**: Using too many layers or neurons will significantly increase the computation time.  
- **Reduce the number of epochs**: Training for too many epochs will slow down response time.  
- **Use a lightweight optimizer and loss function**: Adam is used for efficiency, and batch sizes should be kept reasonable.  
- **Avoid complex non-linear functions**: The more complex the Boolean function, the harder it is to learn, which can result in longer training times.  

Additionally, the environment variable `TF_ENABLE_ONEDNN_OPTS=0` is set to optimize TensorFlow for performance on low-resource environments.  

## Technologies Used  

- **Frontend**: React.js, HTML5, CSS3  
- **Backend**: Flask (Python)  
- **Machine Learning**: Keras/TensorFlow (Neural Network for training on Boolean functions)  
- **Data Visualization**: Chart.js (for generating scatter plots)  
- **Styling**: Custom CSS (Responsive design, animations, modern UI)  
- **Hosting**: Render (Flask backend and React frontend)  

## Project Structure  

```
/boolean-nn-app
├── /backend
│   ├── app.py                  # Main Flask application
│   └── requirements.txt        # Backend dependencies
│
├── /frontend
│   ├── /public
│   ├── /src
│   │   ├── App.js              # Main React app
│   │   └── index.js            # React entry point
│   └── package.json            # Frontend dependencies
│
├── /static
│   └── /css
│       └── styles.css          # Main stylesheet
│
└── README.md                   # This file
```

## Installation  

### **Backend Setup**  

1. Clone the repository:  
   ```bash
   git clone https://github.com/Angad-2002/boolean-nn-app.git
   cd boolean-nn-app/backend
   ```

2. Create a virtual environment (optional but recommended):  
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows, use venv\Scripts\activate
   ```

3. Install required dependencies:  
   ```bash
   pip install -r requirements.txt
   ```

4. Run the Flask backend:  
   ```bash
   python app.py
   ```

The Flask server will be running on `http://127.0.0.1:5000`.  

### **Frontend Setup**  

1. Navigate to the frontend directory:  
   ```bash
   cd ../frontend
   ```

2. Install frontend dependencies:  
   ```bash
   npm install
   ```

3. Run the React development server:  
   ```bash
   npm start
   ```

The React frontend will be available at `http://localhost:3000`.  

## License  

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.  

---
