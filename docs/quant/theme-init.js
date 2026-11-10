// Apply a saved light/dark choice before first paint (external file so the CSP needs no inline scripts).
try { var t = localStorage.getItem("theme"); if (t === "light" || t === "dark") document.documentElement.dataset.theme = t; } catch (e) {}
