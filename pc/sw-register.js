 // Check that service workers are registered
 if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then((registration) => {
    // console.log('[SW]: registration success: ', registration.scope);
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

  if (navigator.serviceWorker.getRegistration) {
    navigator.serviceWorker.getRegistration('sw.js').then((registration) => {
      if (registration && registration.unregister) {
        // console.log(registration, registration.unregister)
      }
    }).catch((error) => {

    });
  }
}

