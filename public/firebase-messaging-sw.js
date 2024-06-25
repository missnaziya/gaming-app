// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseConfig = {
    apiKey: "AIzaSyCNspcX2u5bQyHXKOiD1u-AruVaN1H_-VQ",
    authDomain: "konfehti-87a96.firebaseapp.com",
    projectId: "konfehti-87a96",
    storageBucket: "konfehti-87a96.appspot.com",
    messagingSenderId: "149315893779",
    appId: "1:149315893779:web:250c859431af6bfc365de6",
    measurementId: "G-VPMKFKN92S"
};
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );

    // Customize notification here
    const REDIRECT_URI = `https://www.konfehti.com/match?rmc=${payload.data["gcm.notification.details"] ? JSON.parse(payload.data["gcm.notification.details"])?.match_code : "undefined"}`;
    const iconImg = `https://www.konfehti.com/static/18100b0d2fb6422645a163832ff555d3/023cb/logo.webp`;
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: iconImg,
      data: {
        url: `${REDIRECT_URI}` // URL you want to open when notification is clicked
      }
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
    self.addEventListener('notificationclick', function(event) {
      const urlToOpen = `${REDIRECT_URI}`;
      const promiseChain = clients.openWindow(urlToOpen);
      event.waitUntil(promiseChain);
    });
  });
  