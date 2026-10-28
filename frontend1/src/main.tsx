import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../public/style.css";
import { AuthProvider } from "./auth/AuthProvider";
createRoot(document.getElementById("root") as HTMLElement).render(
  <AuthProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </AuthProvider>,
);
