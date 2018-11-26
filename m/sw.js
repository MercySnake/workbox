importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");
workbox.setConfig({
  debug: true,
  // modulePathPrefix: ""
});
workbox.skipWaiting();
workbox.clientsClaim();
// html 缓存
workbox.routing.registerRoute(
  new RegExp('/m/$'),
  workbox.strategies.networkFirst({
    cacheName: 'athm-html-cache-m',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 10
      })
    ]
  })
);
// css js
workbox.routing.registerRoute(
  new RegExp('https://x\.autoimg\.cn/.*\.(?:js|css)'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'athm-static-cache-m',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 10
      })
    ]
  })
);