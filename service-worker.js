self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('gloria-v5').then((cache) => {
      return cache.addAll([
        'index.html',
        'dashboard.html',
        'css/style.css',
        'js/login.js',
        'js/dashboard.js',
        'img/placeholder.jpg'
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
