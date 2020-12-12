const filesToCache = [
    'index.html',
    'js/dogs.js',
    'css/dogs.css',
    '404.html',
    'offline.html'
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

self.addEventListener('fetch', event => {
    console.log('Fetch event for  ' , event.request.url);
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            if (response) {
                console.log('Found ', event.request.url, ' in cache');
                return response;
            }
            console.log('network request for ', event.request.url);
            return fetch(event.request)
            .then(response => {
                if(response.status === 404){
                    return caches.match('404.html');
                }
                return caches.open(staticCacheName)
                .then(cache => {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })

        })
        .catch(err => {
            console.log(err);
            return caches.match('offline.html');
        })
    )
})

self.addEventListener('activate', event => {
    console.log('activating a new serviceworker');

    const cacheWhiteList = [staticCacheName];

    event.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhiteList.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )
})