/**
 * Here is is the code snippet to initialize Firebase Messaging in the Service
 * Worker when your app is not hosted on Firebase Hosting.*/

 // [START initialize_firebase_in_sw]
 // Give the service worker access to Firebase Messaging.
 // Note that you can only use Firebase Messaging here, other Firebase libraries
 // are not available in the service worker.
 importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js');
 importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-messaging.js');

 // Initialize the Firebase app in the service worker by passing in
 // your app's Firebase config object.
 // https://firebase.google.com/docs/web/setup#config-object
 firebase.initializeApp({
    apiKey: "AIzaSyC08RpPoxYSrWEm7BWlG4aayyjhgApignU",
    authDomain: "pushpwa-baa0c.firebaseapp.com",
    databaseURL: "https://pushpwa-baa0c.firebaseio.com",
    projectId: "pushpwa-baa0c",
    storageBucket: "pushpwa-baa0c.appspot.com",
    messagingSenderId: "784600214634",
    appId: "1:784600214634:web:1818e23da1253409442e13"
  });

 // Retrieve an instance of Firebase Messaging so that it can handle background
 // messages.
 const messaging = firebase.messaging();
 // [END initialize_firebase_in_sw]


// [END background_handler]



 self.addEventListener('notificationclick', function(event) {
    console.log('SW: Clicked notification', event)

    let data = event.notification.data

    event.notification.close()

    self.clients.openWindow(event.notification.data.link)
  })

  self.addEventListener('push', event => {
    let data = {}

    if (event.data) {
      data = event.data.json()
    }

    console.log('SW: Push received', data)

    if (data.notification && data.notification.title) {
      self.registration.showNotification(data.notification.title, {
        body: data.notification.body,
        icon: 'https://developers.aperion.it/sorice/pwa/favicon/android-chrome-192x192.png',
        data
      })
    } else {
      console.log('SW: No notification payload, not showing notification')
    }
  })