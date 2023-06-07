import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import { BrowserRouter, HashRouter } from "react-router-dom";
import { HashRouter } from "react-router-dom";
// import AuthContextProvider from "./contexts/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <AuthContextProvider>
  <HashRouter>
    <App />
  </HashRouter>
  // </AuthContextProvider>
);
