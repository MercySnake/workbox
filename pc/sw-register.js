 // Check that service workers are registered
 if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then((registration) => {
      console.log('ServiceWorker 注册成功: ', registration.scope);
      registration.onupdatefound = function() {
        var installingWorker = registration.installing;
        installingWorker.onstatechange = function() {
          switch (installingWorker.state) {
            case 'installed':
              if (navigator.serviceWorker.controller) {
                var event = document.createEvent('Event');
                event.initEvent('sw.update', true, true);
                window.dispatchEvent(event)
              }
              break;
          }
        }
      }
    })
    .catch((error) => {
      console.log('ServiceWorker 注册失败: ', error);
    });
} else {
  console && console.log && console.log('serviceWorker not work!');
}