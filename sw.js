const filesToCache = [
    'index.html',
    'js/dogs.js',
    'css/dogs.css',
    // 'materialize.min.css'
];

const staticCacheName = 'our-first-cache';

self.addEventListener('install', event => {
    console.log("attempting to install service worker and cache static content");
    event.waitUntil(
        caches.open(staticCacheName)
            .then(cache => {
                return cache.addAll(filesToCache);
            })
            .catch (err => {
                console.error(err);
            })
    )
})
