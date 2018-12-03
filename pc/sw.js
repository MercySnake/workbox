importScripts("https://s.autoimg.cn/fe/workbox/3.6.3/workbox-sw.js");
workbox.setConfig({
  debug: true,
  modulePathPrefix: "https://s.autoimg.cn/fe/workbox/3.6.3/"
});
workbox.skipWaiting();
workbox.clientsClaim();


// html 缓存
workbox.routing.registerRoute(
  'https://mercysnake.github.io/workbox/pc/',
  workbox.strategies.networkFirst({
    cacheName: 'athm-html-cache-pc',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 10
      })
    ]
  })
)

// css js cdn
workbox.routing.registerRoute(
  new RegExp('https://s\.autoimg\.cn/.*\.(?:js|css)'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'athm-static-cache-pc',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 20
      })
    ]
  })
);
















// .then(response => {
//   console.log(response)
//   if (!response) {
//     return caches.match('pages/offline.html');
//   } else if (response.status === 404) {
//     return caches.match('pages/404.html');
//   }
//   return response;
// });