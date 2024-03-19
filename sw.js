const PREFIX = "V2";
const CACHED_FILES = [ 
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
    "https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css"
];  

self.addEventListener("install", (event) => {
    self.skipWaiting();
    event.waitUntil(
        (async () => {
            const cache = await caches.open(PREFIX);
            await Promise.all(
                [...CACHED_FILES,"/Tests/TutoVideo/offline.html"].map((path) => {
                    return cache.add(new Request(path));
                })
            );
        })()
    );
    console.log(PREFIX," Install");
});

self.addEventListener("activate", (event) => {
    clients.claim();
    event.waitUntil(
        (async () => {
            const keys = await caches.keys();
            await Promise.all(
                keys.map((key) => {
                    if (!key.includes(PREFIX)) {
                        return caches.delete(key);
                    }
                })
            );
        })()
    );
    console.log(PREFIX," Activate");
});


self.addEventListener("fetch", (event) => {
    console.log(PREFIX," Fetch : ", event.request.url, "Mode : ", event.request.mode);
    if (event.request.mode === "navigate") {
        event.respondWith(
            (async () => {
                try {
                    const preloadResponse = await event.preloadResponse;
                    if (preloadResponse) {
                        return preloadResponse;
                    }
                    return await fetch(event.request);
                } catch (e) {
                    const cache = await caches.open(PREFIX);
                    return await cache.match("/Tests/TutoVideo/offline.html");
                }
            })()
        );
    }
    else if (CACHED_FILES.includes(event.request.url)) {
        event.respondWith(caches.match(event.request));
    }
});