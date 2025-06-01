import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { WalletConnectionProvider } from "./WalletContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <WalletConnectionProvider>
    <App />
  </WalletConnectionProvider>
);
