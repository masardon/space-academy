const CACHE_NAME = "space-academy-v3";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/styles.css",
  "./js/data.js",
  "./js/progress.js",
  "./js/router.js",
  "./js/app.js",
  "./js/sw-register.js",
  "./js/i18n.js",
  "./js/views/welcome.js",
  "./js/views/pilot-select.js",
  "./js/views/missions.js",
  "./js/views/week-detail.js",
  "./js/views/lab.js",
  "./js/views/profile.js",
  "./js/views/settings.js",
  "./js/content/week01.js",
  "./js/content/week02.js",
  "./js/content/week03.js",
  "./js/content/week04.js",
  "./js/content/week05.js",
  "./js/content/week06.js",
  "./js/content/week07.js",
  "./js/content/week08.js",
  "./js/content/week09.js",
  "./js/content/week10.js",
  "./js/content/week11.js",
  "./js/content/week12.js",
  "./icons/icon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) =>
        // add() per-asset so one failure doesn't abort the whole install
        Promise.allSettled(ASSETS.map((url) => cache.add(url)))
      )
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // e.g. Google Fonts: network only

  // Stale-while-revalidate: serve cache fast, refresh in background
  event.respondWith(
    caches.match(req).then((cached) => {
      const fresh = fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || fresh;
    })
  );
});
