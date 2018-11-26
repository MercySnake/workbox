importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");
workbox.setConfig({
  debug: true,
  // modulePathPrefix: ""
});
workbox.skipWaiting();
workbox.clientsClaim();
// html 缓存
workbox.routing.registerRoute(
  new RegExp('/pc/$'),
  workbox.strategies.networkFirst({
    cacheName: 'athm-html-cache-pc',
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
    cacheName: 'athm-static-cache-pc',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 10
      })
    ]
  })
);