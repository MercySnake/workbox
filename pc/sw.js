importScripts("https://s.autoimg.cn/fe/workbox/3.6.3/workbox-sw.js");
workbox.setConfig({
  debug: false,
  modulePathPrefix: "https://s.autoimg.cn/fe/workbox/3.6.3/"
});
workbox.skipWaiting();
workbox.clientsClaim();

var currentCacheNames = {
  page: 'www:page',
  static: 'www:static',
  img: 'www:img'
};
// html 缓存
workbox.routing.registerRoute(
  function({url, event}) {
    if (url.hostname === 'www.autohome.com.cn') {
      return (new RegExp('/(.*)').test(url.pathname))
    } else {
      return false;
    }
  },
  workbox.strategies.networkFirst({
    cacheName: currentCacheNames.page,
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 10
      })
    ]
  })
);
// css js cdn
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
// img
workbox.routing.registerRoute(
  new RegExp('https://qnwww2\.autoimg\.cn/.*\.(?:jpg|png|jpeg|gif)'),
  workbox.strategies.cacheFirst({
    cacheName: currentCacheNames.img,
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxEntries: 20,
        maxAgeSeconds: 2 * 24 * 60 * 60
      })
    ]
  })
);
workbox.routing.registerRoute(
  new RegExp('https://www2\.autoimg\.cn/.*\.(?:jpg|png|jpeg|gif)'),
  workbox.strategies.cacheFirst({
    cacheName: currentCacheNames.img,
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
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