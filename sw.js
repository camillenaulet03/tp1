const staticCacheName = "my-site-cache-v1";
const urlsToCache = ["/", "./style.css", './app.js', './index.js'];

self.addEventListener("install", (e) => {
    e.waitUntil(caches.open(staticCacheName).then((cache) => {
        console.log('opened cache');
        return cache.addAll(urlsToCache);
    }));
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (response) return response;

            const fetchRequest = event.request.clone();

            return fetch(fetchRequest).then(function (response) {
                if (!response || response.status !== 200 || response.type !== "basic") return response;

                const responseToCache = response.clone();
                caches.open(staticCacheName).then(function (cache) {cache.put(event.request, responseToCache);});

                return response;
            });
        })
    );
});

self.addEventListener("activate", (e) => {
    e.waitUntil(caches.keys().then((cacheNames) => {
        return Promise.all(
            cacheNames.map(function(cacheName) {
                if (staticCacheName.indexOf(cacheName) === -1)
                    return caches.delete(cacheName);
            })
        );
    }));
});
