if ('serviceWorker' in navigator) {
  // declaring scope manually
  navigator.serviceWorker.register('/sw.js', {scope: '/product/'}).then(function(registration) {
    console.log('Service worker registration succeeded:', registration);
  }, /*catch*/ function(error) {
    console.log('Service worker registration failed:', error);
  });
} else {
  console.log('Service workers are not supported.');
}

// give your cache a name
const cacheName = 'my-cache';

// put the static assets and routes you want to cache here
const filesToCache = [
  '/',
  '/index.html',
  '/resources/css/scoutingPASS.css',
  '/resources/fonts/alex.woff',
  '/resources/fonts/alexisv.ttf
  '/resources/js/TBAInterface.js',
  '/resources/js/easy.qrcode.min.js',
  '/resources/js/scoutingPASS.js',
  '/2022/RR_config.js'
];

// the event handler for the activate event
self.addEventListener('activate', e => self.clients.claim());

// the event handler for the install event 
// typically used to cache assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName)
    .then(cache => cache.addAll(filesToCache))
  );
});

// the fetch event handler, to intercept requests and serve all 
// static assets from the cache
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
    .then(response => response ? response : fetch(e.request))
  )
});
