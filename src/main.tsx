// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { executeQuery } from "./utils/executeQuery"; // Ensure correct path

// Attach executeQuery globally
window.executeQuery = executeQuery;

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
