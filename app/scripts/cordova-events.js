/*exported onLoad */
'use strict';


function authenticate() {
  gameCenter.authenticate(null, function () {
    setTimeout(authenticate, 1000 * 60 * 2); //retry if error callback is called
  });
}


// Handle the resume event
//
function onResume() {
  authenticate();
}

// device APIs are available
//
function onDeviceReady() {
  document.addEventListener('resume', onResume, false);
  authenticate();
}


// Wait for device API libraries to load
//
function onLoad() {
  document.addEventListener('deviceready', onDeviceReady, false);
}
