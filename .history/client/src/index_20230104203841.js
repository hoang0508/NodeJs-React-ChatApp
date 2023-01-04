import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";

ReactDOM.render(
  <BrowserRouter>
    <AuthContextProvider>
      <App />
      <ToastContainer autoClose={false} />
    </AuthContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
