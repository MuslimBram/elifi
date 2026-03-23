import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Apply saved theme on load
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
}

// Apply saved font size
const savedFontSize = localStorage.getItem("fontSize");
if (savedFontSize === "large") document.documentElement.style.fontSize = "18px";
else if (savedFontSize === "xlarge") document.documentElement.style.fontSize = "20px";

createRoot(document.getElementById("root")!).render(<App />);
