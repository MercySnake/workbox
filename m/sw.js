// importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");
importScripts("https://s.autoimg.cn/fe/workbox/3.6.3/workbox-sw.js");
workbox.setConfig({
  debug: true,
  modulePathPrefix: "https://s.autoimg.cn/fe/workbox/3.6.3/"
});
workbox.skipWaiting();
workbox.clientsClaim();

var currentCacheNames = {
  page: 'm:page',
  static: 'm:static'
};

// html 缓存
workbox.routing.registerRoute(
  new RegExp('/(.*)'),
  workbox.strategies.networkFirst({
    cacheName: currentCacheNames.page,
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 10
      })
    ]
  })
);
// css js
workbox.routing.registerRoute(
  new RegExp('https://s\.autoimg\.cn/.*\.(?:js|css)'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: currentCacheNames.static,
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 10,
        maxAgeSeconds: 2 * 24 * 60 * 60
      })
    ]
  })
);

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      let validCacheSet = new Set(Object.values(currentCacheNames));
      return Promise.all(
        cacheNames.filter(function(cacheName){
          return !validCacheSet.has(cacheName);
        }).map(function(cacheName) {
          console.log("Delete cache:", cacheName);
          return caches.delete(cacheName);
        })
      );
    })
  );
});