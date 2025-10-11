const CACHE_NAME = "zahran-network-v1";
const OFFLINE_URL = "./offline.html";

const urlsToCache = [
  "./",
  "./index.html",
  "./about.html",
  "./contact.html",
  "./offline.html",
  "./Edit.css",
  "./About.css",
  "./Content.css",
  "192.png",
  "512.png"
];

// Instalasi Service Worker dan caching awal
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Aktivasi Service Worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Intersep permintaan fetch
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request).then((response) => {
        return response || caches.match(OFFLINE_URL);
      });
    })
  );
});
