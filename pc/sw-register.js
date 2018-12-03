 // Check that service workers are registered
 if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then((registration) => {
      console.log('ServiceWorker 注册成功: ', registration.scope);
    })
    .catch((error) => {
      console.log('ServiceWorker 注册失败: ', error);
    });
} else {
  console && console.log && console.log('serviceWorker not work!');
}