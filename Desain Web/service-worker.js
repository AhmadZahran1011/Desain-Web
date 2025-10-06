const CACHE_NAME = "zahran-network-v1"
const OFFLINE_URL = "/offline.html"

const urlsToCache = [
    "./index.html",
    "./about.html",
    "./contact.html",
    "./offline.html",
    "./Edit.css",
    "./About.css",
    "./Artboard 3.png",
    "./Content.css"
];
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            Promise.all(
                cacheNames.map((cache) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      
      return caches.match(event.request).then((response) => {
        return response || caches.match("./offline.html");
      });
    })
  );
});