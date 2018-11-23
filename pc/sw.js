importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");
workbox.setConfig({
  debug: true,
  // modulePathPrefix: ""
});
workbox.skipWaiting();
workbox.clientsClaim();
// html 缓存
// workbox.routing.registerRoute(

// );
// css js
workbox.routing.registerRoute(
  new RegExp('https://s\.autoimg\.cn/.*\.(?:js|css)'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'athm-static-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 10
      })
    ]
  })
);