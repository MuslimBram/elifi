import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n/config";
import { updateDailyStreak } from "./hooks/useStreak";

// Apply saved theme on load
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
}

// Apply saved font size
const savedFontSize = localStorage.getItem("fontSize");
if (savedFontSize === "large") document.documentElement.style.fontSize = "18px";
else if (savedFontSize === "xlarge") document.documentElement.style.fontSize = "20px";

// Update daily streak on each visit
updateDailyStreak();

// Register service worker only in production.
// In preview/dev, stale cached Vite chunks can cause invalid React hook runtime errors.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    if (import.meta.env.PROD) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
      return;
    }

    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => registration.unregister());
    }).catch(() => {});

    caches.keys().then((keys) => {
      keys.forEach((key) => caches.delete(key));
    }).catch(() => {});
  });
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
