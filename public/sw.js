// install
self.addEventListener('install', evt => {
    evt.skipWaiting();
  });
  
  // activate
  self.addEventListener('activate', evt => {
    evt.skipWaiting();
  });
  
  // fetch
  self.addEventListener('fetch', evt => {
    evt.respondWith(
      fetch(evt.request)
        .then(fetchResponse => {
          return fetchResponse;
        })
        .catch(() => {
          caches.match(evt.request)
            .then(cacheResponse => {
              return cacheResponse;
            })
        })
    );
  });