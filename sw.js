const CACHE_NAME = "V1";

this.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log("opened cache");
                return cache.addAll([
                    'index.html',
                    'dogs.js',
                    'dogs.css',
                    'materialize.min.css'
                ])
            })
    )
})