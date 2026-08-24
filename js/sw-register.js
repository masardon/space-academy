// Register service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js")
      .then(() => console.log("Space Academy offline-ready ✓"))
      .catch((err) => console.log("SW registration skipped:", err));
  });
}
