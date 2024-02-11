import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DrawerProvider } from "./components/Contexts/DrawerContext";
// import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DrawerProvider>
      <App />
    </DrawerProvider>
  </React.StrictMode>
);
