const CACHE_NAME = "zahran-network-v1"
const OFFLINE_URL = "/offline.html"

const urlTcoCache = [
    "./",
    "./index.html",
    "./about.html",
    "./contact.html",
    "./offline.html",
    "./Edit.css",
    "./About.css",
    "./Content.css"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("Service Worker: Caching files");
            return cache.addAll(urlTcoCache);
        })
    );
    self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
  console.log("Service Worker activated");
});

// Fetch Request
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // jika ada di cache, tampilkan dari cache
      if (response) {
        return response;
      }
      // jika tidak ada di cache, ambil dari network
      return fetch(event.request).catch(() => {
        // jika gagal ambil dari network (offline), tampilkan offline.html
        if (event.request.mode === "navigate") {
          return caches.match(OFFLINE_URL);
        }
      });
    })
  );
});