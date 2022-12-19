import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
// import "react-toastify/dist/ReactToastify.css";
import "./index.scss";
import { ToastContainer } from "react-toastify";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <App />
        <ToastContainer />
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
