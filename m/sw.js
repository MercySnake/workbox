// importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");
importScripts("https://s.autoimg.cn/fe/workbox/3.6.3/workbox-sw.js");
workbox.setConfig({
  debug: true,
  modulePathPrefix: "https://s.autoimg.cn/fe/workbox/3.6.3/"
});
workbox.core.setCacheNameDetails({
  prefix: 'athm-m',
  suffix: 'v2',
  precache: 'precache',
  runtime: 'runtime-cache'
});
workbox.skipWaiting();
workbox.clientsClaim();
// html 缓存
workbox.routing.registerRoute(
  new RegExp('/(.*)'),
  workbox.strategies.networkFirst()
);
// css js
workbox.routing.registerRoute(
  new RegExp('https://s\.autoimg\.cn/.*\.(?:js|css)'),
  workbox.strategies.staleWhileRevalidate()
);