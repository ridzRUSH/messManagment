import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import AuthProvider from "./contextAPI/AuthProvider";
<<<<<<< Updated upstream
import { ModalProvider } from "./contextAPI/ModalContext";
import { ToastProvider } from "./contextAPI/ToastContext";
=======
import { ModalProvider } from "./contextAPI/ModalContext"; // 👈 add this
>>>>>>> Stashed changes

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
<<<<<<< Updated upstream
      <ToastProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </ToastProvider>
=======
      <ModalProvider>   
        <App />
      </ModalProvider>
>>>>>>> Stashed changes
    </AuthProvider>
  </StrictMode>
);
