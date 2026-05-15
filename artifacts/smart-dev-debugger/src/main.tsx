import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initializeApiLayer } from "@/lib/api";

initializeApiLayer();

createRoot(document.getElementById("root")!).render(<App />);
