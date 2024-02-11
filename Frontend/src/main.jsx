import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <a className="vuelo">🧳</a>
            <a className="vuelo2">🧳</a>
            <a className="vuelo3">🧳</a>
            <a className="vuelo4">🧳</a>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
