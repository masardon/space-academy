const CACHE_NAME = "space-academy-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./css/styles.css",
  "./js/data.js",
  "./js/progress.js",
  "./js/router.js",
  "./js/app.js",
  "./js/views/welcome.js",
  "./js/views/pilot-select.js",
  "./js/views/missions.js",
  "./js/views/week-detail.js",
  "./js/views/lab.js",
  "./js/views/profile.js",
  "./js/views/settings.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
});
