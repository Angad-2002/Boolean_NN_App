import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css"; // Import custom styles
import Plot from "react-plotly.js"; // Import Plotly

const App = () => {
    const [numVariables, setNumVariables] = useState(2);
    const [booleanFunction, setBooleanFunction] = useState("X1 and X2");
    const [numLayers, setNumLayers] = useState(2);
    const [layers, setLayers] = useState([
        { inputNeurons: 2, outputNeurons: 4, activation: "relu" },
        { inputNeurons: 4, outputNeurons: 1, activation: "sigmoid" }
    ]);
    const [epochs, setEpochs] = useState(100);
    const [learningRate, setLearningRate] = useState(0.01);
    const [optimizer, setOptimizer] = useState("adam");
    const [lossFunction, setLossFunction] = useState("binary_crossentropy");
    const [scatterData, setScatterData] = useState([]);
    const [showPlot, setShowPlot] = useState(false); // New state to toggle view

    const handleLayerChange = (index, field, value) => {
        const updatedLayers = [...layers];
        updatedLayers[index] = { ...updatedLayers[index], [field]: value };
        setLayers(updatedLayers);
    };

    const handleNumLayersChange = (value) => {
        const newNumLayers = parseInt(value) || 1;
        setNumLayers(newNumLayers);
        setLayers(Array.from({ length: newNumLayers }, (_, i) => ({
            inputNeurons: i === 0 ? numVariables : layers[i - 1]?.outputNeurons || 4,
            outputNeurons: i === newNumLayers - 1 ? 1 : 4,
            activation: "relu"
        })));
    };

    const trainModel = async () => {
        try {
            const response = await axios.post("/train", {
                num_variables: numVariables,
                boolean_function: booleanFunction,
                network_structure: layers,
                epochs,
                learning_rate: learningRate,
                optimizer,
                loss_function: lossFunction
            });
            console.log("Response:", response.data);
            setScatterData(response.data.scatter_plot);
            setShowPlot(true); // Show plot after training
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const goHome = () => {
        setShowPlot(false); // Go back to the input form
    };

    return (
        <div className="container py-5">
            {!showPlot ? (
                <>
                    <h1 className="text-center mb-4">Boolean Function Neural Network</h1>
                    <div className="row">
                        {/* Boolean Function Input */}
                        <div className="col-md-6">
                            <div className="card p-4 shadow-sm">
                                <h5>Input Configuration</h5>
                                <div className="mb-3">
                                    <label className="form-label">Number of Variables</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={numVariables}
                                        onChange={(e) => setNumVariables(parseInt(e.target.value) || 1)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Boolean Function</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={booleanFunction}
                                        onChange={(e) => setBooleanFunction(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Neural Network Layers */}
                        <div className="col-md-6">
                            <div className="card p-4 shadow-sm">
                                <h5>Neural Network Configuration</h5>
                                <div className="mb-3">
                                    <label className="form-label">Number of Layers</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={numLayers}
                                        onChange={(e) => handleNumLayersChange(e.target.value)}
                                    />
                                </div>
                                {layers.map((layer, i) => (
                                    <div key={i} className="mb-3">
                                        <h6>Layer {i + 1}</h6>
                                        <div className="row">
                                            <div className="col-4">
                                                <label className="form-label">Input Neurons</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    value={layer.inputNeurons}
                                                    onChange={(e) =>
                                                        handleLayerChange(i, "inputNeurons", parseInt(e.target.value) || 1)
                                                    }
                                                />
                                            </div>
                                            <div className="col-4">
                                                <label className="form-label">Output Neurons</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    value={layer.outputNeurons}
                                                    onChange={(e) =>
                                                        handleLayerChange(i, "outputNeurons", parseInt(e.target.value) || 1)
                                                    }
                                                />
                                            </div>
                                            <div className="col-4">
                                                <label className="form-label">Activation</label>
                                                <select
                                                    className="form-select"
                                                    value={layer.activation}
                                                    onChange={(e) => handleLayerChange(i, "activation", e.target.value)}
                                                >
                                                    <option value="relu">ReLU</option>
                                                    <option value="sigmoid">Sigmoid</option>
                                                    <option value="tanh">Tanh</option>
                                                    <option value="softmax">Softmax</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Training Parameters */}
                    <div className="row mt-4">
                        <div className="col-md-6">
                            <div className="card p-4 shadow-sm">
                                <h5>Training Parameters</h5>
                                <div className="mb-3">
                                    <label className="form-label">Epochs</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={epochs}
                                        onChange={(e) => setEpochs(parseInt(e.target.value) || 1)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Learning Rate</label>
                                    <input
                                        type="number"
                                        step="0.001"
                                        className="form-control"
                                        value={learningRate}
                                        onChange={(e) => setLearningRate(parseFloat(e.target.value) || 0.01)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Optimizer and Loss Function */}
                        <div className="col-md-6">
                            <div className="card p-4 shadow-sm">
                                <h5>Optimization & Loss Function</h5>
                                <div className="mb-3">
                                    <label className="form-label">Optimizer</label>
                                    <select
                                        className="form-select"
                                        value={optimizer}
                                        onChange={(e) => setOptimizer(e.target.value)}
                                    >
                                        <option value="sgd">SGD</option>
                                        <option value="adam">Adam</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Loss Function</label>
                                    <select
                                        className="form-select"
                                        value={lossFunction}
                                        onChange={(e) => setLossFunction(e.target.value)}
                                    >
                                        <option value="mse">Mean Squared Error</option>
                                        <option value="binary_crossentropy">Binary Crossentropy</option>
                                        <option value="categorical_crossentropy">Categorical Crossentropy</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Train Button */}
                    <div className="text-center mt-4">
                        <button className="btn btn-primary w-50" onClick={trainModel}>
                            Train Model
                        </button>
                    </div>
                </>
            ) : (
                <>
                    {/* Home Button */}
                    <div className="text-center mt-4">
                        <button className="btn btn-secondary" onClick={goHome}>
                            Home
                        </button>
                    </div>

                    {/* Scatter Plot */}
                    {scatterData.length > 0 && (
                        <div className="mt-4 text-center">
                            <div className="scatter-plot-container">
                                <Plot
                                    data={[{
                                        x: scatterData.map((point) => point.x),
                                        y: scatterData.map((point) => point.y),
                                        z: scatterData.map((point) => point.z),
                                        mode: "markers",
                                        marker: {
                                            size: scatterData.map((point) => Math.abs(point.z) * 10), // Dynamic size based on z-value
                                            color: scatterData.map((point) => point.z), // Color based on z-value
                                            colorscale: "Viridis",
                                            colorbar: {
                                                title: 'Output',
                                                titleside: 'right',
                                                thickness: 15,
                                                xanchor: 'left',
                                                titlesfont: {
                                                    color: '#e0e0e0',
                                                },
                                                tickfont: {
                                                    color: '#e0e0e0',
                                                },
                                            },
                                            opacity: 0.9,
                                            line: {
                                                width: 0.5,
                                                color: '#1f1f1f', // Add a border color for markers
                                            },
                                        },
                                        type: "scatter3d",
                                        text: scatterData.map(point => `X1: ${point.x}, X2: ${point.y}, Output: ${point.z}`), // Tooltip text
                                        hoverinfo: "text", // Show text on hover
                                    }]}
                                    layout={{
                                        title: {
                                            text: "3D Decision Boundary",
                                            font: {
                                                size: 24,
                                                color: "#bb86fc", // Light purple for title
                                            },
                                        },
                                        autosize: true,
                                        margin: { l: 0, r: 0, b: 0, t: 40 },
                                        scene: {
                                            xaxis: {
                                                title: "X1",
                                                titlefont: { color: "#03dac6" },
                                                gridcolor: "#2b2b2b",
                                                zerolinecolor: "#2b2b2b",
                                                zerolinewidth: 2,
                                            },
                                            yaxis: {
                                                title: "X2",
                                                titlefont: { color: "#03dac6" },
                                                gridcolor: "#2b2b2b",
                                                zerolinecolor: "#2b2b2b",
                                                zerolinewidth: 2,
                                            },
                                            zaxis: {
                                                title: "Output",
                                                titlefont: { color: "#03dac6" },
                                                gridcolor: "#2b2b2b",
                                                zerolinecolor: "#2b2b2b",
                                                zerolinewidth: 2,
                                            },
                                        },
                                        paper_bgcolor: "#121212", // Dark background for plot
                                        plot_bgcolor: "#1f1f1f", // Darker background for plot area
                                        hoverlabel: {
                                            bgcolor: '#1f1f1f', // Background color of hover labels
                                            font: {
                                                color: '#ffffff', // Font color of hover labels
                                            },
                                        },
                                    }}
                                    config={{
                                        responsive: true,
                                        displayModeBar: true,
                                        modeBarButtonsToRemove: ['toImage', 'resetScale2d'], // Remove unnecessary buttons
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default App;