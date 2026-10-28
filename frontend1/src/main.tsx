import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../public/style.css";
import { AuthProvider } from "./auth/AuthProvider";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <AuthProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </AuthProvider>
  </BrowserRouter>,
);
