import { createRoot } from "react-dom/client";
import { AuthProvider } from "./AuthContext";
import App from "./App";
import "./theme.css";
createRoot(document.getElementById("root")).render(<AuthProvider><App /></AuthProvider>);
