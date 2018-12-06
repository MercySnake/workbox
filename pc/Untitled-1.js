"use strict";
(function () {
  window.addEventListener("load", function () {
    if ("serviceWorker" in window.navigator && !/; wv(;|\)).+ Chrome\/.+ Mobile/g.test(window.navigator.userAgent)) {
      var version = window.config.version.replace("v", "");
      var swJsURL = "https://m.weibo.cn/sw.js";
      var isRegistered = false;
      if (version && (version.split(".")[0] > 1 || version.split(".")[1] >= 20)) {
        if (!isRegistered) {
          isRegistered = true;
          navigator.serviceWorker.register(swJsURL).then(function (registration) {
            registration.onupdatefound = function () {
              if (navigator.serviceWorker.controller) {
                var installingWorker = registration.installing;
                installingWorker.onstatechange = function () {
                  switch (installingWorker.state) {
                    case "installed":
                      window.__wb_performance_data.sw = 1;
                      console.log("[SW]: New content is available; please refresh.");
                      break;
                    case "redundant":
                      window.__wb_performance_data.sw = "redundant";
                      navigator.serviceWorker.controller.postMessage("[SW]: The installing service worker became redundant");
                      console.error("[SW]: The installing service worker became redundant");
                      break;
                    default:
                  }
                }
              }
            }
          }).catch(function (e) {
            window.__wb_performance_data.sw = e.msg;
            navigator.serviceWorker.controller.postMessage("[SW]: Error during service worker registration: " + e);
            console.error("[SW]: Error during service worker registration:", e)
          });
          navigator.serviceWorker.onmessage = function (e) {
            var data = e.data;
            if (data.command === "UPDATE_FOUND") {
              console.log("[SW]: New cache is available; please refresh.")
            }
          }
        }
      } else if (navigator.serviceWorker.getRegistration) {
        navigator.serviceWorker.getRegistration(swJsURL).then(function (registration) {
          if (registration && registration.unregister) {
            registration.unregister().then(function (isUnRegistered) {
              if (isUnRegistered) {
                console.log("[SW]: UnRegistration  succeeded.")
              } else {
                navigator.serviceWorker.controller.postMessage("[SW]: UnRegistration failed.");
                console.error("[SW]: UnRegistration failed.")
              }
            })
          }
        }).catch(function (e) {
          window.__wb_performance_data.sw = e.msg;
          navigator.serviceWorker.controller.postMessage("[SW]: UnRegistration failed with. " + e);
          console.error("[SW]: UnRegistration failed with. " + e)
        })
      }
    }
  })
})();