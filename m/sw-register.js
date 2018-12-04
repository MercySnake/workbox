// Check that service workers are registered
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').then((registration) => {
      registration.onupdatefound = function() {
        var installingWorker = registration.installing;
        if (navigator.serviceWorker.controller) {
        installingWorker.onstatechange = function() {
          switch (installingWorker.state) {
            case 'installed':
              console.log("[SW]: New content is available; please refresh.");
              break;
            }
          }
        }
      }
    }).catch((error) => {
      console.log('[SW]: Error during service worker registration:', error);
    });
  });
} else {
  console && console.log && console.log('serviceWorker not work!');
};

// 显示网络状态
const setLineStatus = (lineStatus) => {
  $('#lineStatus').text(`当前网络状态：${lineStatus}`).attr(`class`, `tip ${lineStatus}`);
}
if (navigator.onLine) {
  setLineStatus('online')
} else {
  setLineStatus('offline')
}
window.addEventListener('online', () => setLineStatus('online'));
window.addEventListener('offline', () => setLineStatus('offline'));
// 显示 userAgent
$('#userAgent').html(navigator.userAgent);
// 横幅事件
// var deferredPrompt = null;
// window.addEventListener('beforeinstallprompt', function (e) {
//   // 将事件返回存储起来
//   deferredPrompt = e;
//   // 取消默认事件
//   e.preventDefault();
//   return false;
// });
// // 当按钮点击事件触发的时候，再去触发安装横幅的显示
// $('#addHomescreen').on('click', function () {
//   if (deferredPrompt != null) {
//     // 异步触发横幅显示
//     deferredPrompt.prompt();
//     // 检测用户的安装行为
//     deferredPrompt.userChoice.then(function (choiceResult) {
//       console.log(choiceResult.outcome);
//     });
//     deferredPrompt = null;
//   }
// });