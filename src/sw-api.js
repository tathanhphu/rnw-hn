const API_ORIGIN = 'https://api.hnpwa.com/';
const CACHE_NAME = 'api';

self.addEventListener('fetch', event => {
  if (
    !event.request.url.startsWith(API_ORIGIN) ||
    event.request.method !== 'GET'
  )
    return;

  // Network first
  event.respondWith(
    fetch(event.request).then(
      response => {
        // Put in cache
        caches
          .open(CACHE_NAME)
          .then(cache => {
            return cache.put(event.request, response);
          })
          .catch(error => {
            console.error('Failed to put API response in cache', error);
          });

        return response.clone();
      },
      () => {
        return caches.match(event.request);
      }
    )
  );
});
