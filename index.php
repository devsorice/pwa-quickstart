<?php 
  $version = rand();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="favicon.ico" type="image/x-icon" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="css/style.css">
  <title>Home - Service Worker Example</title>
  <script src="//cdn.jsdelivr.net/npm/eruda"></script>
  <script>eruda.init();</script>
  <!-- Compiled and minified CSS -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
  <!-- Compiled and minified JavaScript -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js?v=<?=$version?>"></script>
  <!-- Icons -->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel="manifest" href="manifest.webmanifest">
  <link rel="stylesheet" type="text/css" href="css/addtohomescreen.css">
  <script src="js/addtohomescreen.min.js?v=<?=$version?>"></script>
  <script>
  addToHomescreen({
       autostart:true
  });
  </script>
  <style>
  .bottoniera{
    display:flex;
    justify-content: space-around;
    margin: 0 0 0 auto;
    max-width: 308px;
  }
  </style>
</head>


<body>
<div class="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header">

  <!-- Header section containing title -->
  <header class="mdl-layout__header mdl-color-text--white mdl-color--light-blue-700">
    <div class="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid">
      <div class="mdl-layout__header-row mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--8-col-desktop">
        <h3>PWA</h3>
      </div>
    </div>
  </header>

  <main class="mdl-layout__content mdl-color--grey-100">
    <div class="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid">

      <!-- Container for the Table of content -->
      <div class="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop">
        <div class="mdl-card__supporting-text mdl-color-text--grey-600">
          <!-- div to display the generated Instance ID token -->
          <div id="main-container"></div>
          <div id="token_div" style="display: none;">
            <h4>Instance ID Token</h4>
            <p id="token" style="word-break: break-all;"></p>
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                    onclick="deleteToken()">Delete Token</button>
          </div>
          <!-- div to display the UI to allow the request for permission to
               notify the user. This is shown if the app has not yet been
               granted permission to notify. -->
          <div id="permission_div" style="display: none;">
            <h4>Needs Permission</h4>
            <p id="token"></p>
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                    onclick="requestPermission()">Request Permission</button>
          </div>
          <!-- div to display messages received by this app. -->
          <div id="messages"></div>
        </div>
      </div>

    </div>
  </main>
</div>

<!-- Import and configure the Firebase SDK -->
<!-- These scripts are made available when the app is served or deployed on Firebase Hosting -->
<!-- If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup -->
 <script src="https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/7.15.0/firebase-messaging.js"></script>
 <script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyC08RpPoxYSrWEm7BWlG4aayyjhgApignU",
    authDomain: "pushpwa-baa0c.firebaseapp.com",
    databaseURL: "https://pushpwa-baa0c.firebaseio.com",
    projectId: "pushpwa-baa0c",
    storageBucket: "pushpwa-baa0c.appspot.com",
    messagingSenderId: "784600214634",
    appId: "1:784600214634:web:1818e23da1253409442e13"
  };
  firebase.initializeApp(firebaseConfig);
  // [START get_messaging_object]
  // Retrieve Firebase Messaging object.
  const messaging = firebase.messaging();
  // [END get_messaging_object]
  // [START set_public_vapid_key]
  // Add the public key generated from the console here.
  messaging.usePublicVapidKey("BCAPNkOuhc8A_7iA_c5O0R_iFX_cUIZ_eAiISdlOeX2B0ulQu3Tc4iqJxL39hh04-_R2QOyLrxl8Sk4tPP8OOs0");
  // [END set_public_vapid_key]

  // IDs of divs that display Instance ID token UI or request permission UI.
  const tokenDivId = 'token_div';
  const permissionDivId = 'permission_div';

  // [START refresh_token]
  // Callback fired if Instance ID token is updated.
  messaging.onTokenRefresh(() => {
    messaging.getToken().then((refreshedToken) => {
      console.log('Token refreshed.');
      // Indicate that the new Instance ID token has not yet been sent to the
      // app server.
      setTokenSentToServer(false);
      // Send Instance ID token to app server.
      sendTokenToServer(refreshedToken);
      // [START_EXCLUDE]
      // Display new Instance ID token and clear UI of all previous messages.
      resetUI();
      // [END_EXCLUDE]
    }).catch((err) => {
      console.log('Unable to retrieve refreshed token ', err);
      showToken('Unable to retrieve refreshed token ', err);
    });
  });
  // [END refresh_token]

  // [START receive_message]
  // Handle incoming messages. Called when:
  // - a message is received while the app has focus
  // - the user clicks on an app notification created by a service worker
  //   `messaging.setBackgroundMessageHandler` handler.
  messaging.onMessage((payload) => {
    console.log('Message received. ', payload);
    // [START_EXCLUDE]
    // Update the UI to include the received message.
    appendMessage(payload);
    //showNotification(payload.notification.title, payload.notification.message);
    // [END_EXCLUDE]
  });
  // [END receive_message]

  function resetUI() {
    clearMessages();
    showToken('loading...');
    // [START get_token]
    // Get Instance ID token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    messaging.getToken().then((currentToken) => {
      if (currentToken) {
        sendTokenToServer(currentToken);
        updateUIForPushEnabled(currentToken);
      } else {
        // Show permission request.
        console.log('No Instance ID token available. Request permission to generate one.');
        // Show permission UI.
        updateUIForPushPermissionRequired();
        setTokenSentToServer(false);
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      showToken('Error retrieving Instance ID token. ', err);
      setTokenSentToServer(false);
    });
    // [END get_token]
  }


  function showToken(currentToken) {
    // Show token in console and UI.
    const tokenElement = document.querySelector('#token');
    tokenElement.textContent = currentToken;
  }

  // Send the Instance ID token your application server, so that it can:
  // - send messages back to this app
  // - subscribe/unsubscribe the token from topics
  function sendTokenToServer(currentToken) {
    if (!isTokenSentToServer()) {
      console.log('Sending token to server...');
      // TODO(developer): Send the current token to your server.
      setTokenSentToServer(true);
    } else {
      console.log('Token already sent to server so won\'t send it again ' +
          'unless it changes');
    }

  }

  function isTokenSentToServer() {
    return window.localStorage.getItem('sentToServer') === '1';
  }

  function setTokenSentToServer(sent) {
    window.localStorage.setItem('sentToServer', sent ? '1' : '0');
  }

  function showHideDiv(divId, show) {
    const div = document.querySelector('#' + divId);
    if (show) {
      div.style = 'display: visible';
    } else {
      div.style = 'display: none';
    }
  }

  function requestPermission() {
    console.log('Requesting permission...');
    // [START request_permission]
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        // TODO(developer): Retrieve an Instance ID token for use with FCM.
        // [START_EXCLUDE]
        // In many cases once an app has been granted notification permission,
        // it should update its UI reflecting this.
        resetUI();
        // [END_EXCLUDE]
      } else {
        console.log('Unable to get permission to notify.');
      }
    });
    // [END request_permission]
  }

  function deleteToken() {
    // Delete Instance ID token.
    // [START delete_token]
    messaging.getToken().then((currentToken) => {
      messaging.deleteToken(currentToken).then(() => {
        console.log('Token deleted.');
        setTokenSentToServer(false);
        // [START_EXCLUDE]
        // Once token is deleted update UI.
        resetUI();
        // [END_EXCLUDE]
      }).catch((err) => {
        console.log('Unable to delete token. ', err);
      });
      // [END delete_token]
    }).catch((err) => {
      console.log('Error retrieving Instance ID token. ', err);
      showToken('Error retrieving Instance ID token. ', err);
    });

  }

  // Add a message to the messages element.
  function appendMessage(payload) {
    const messagesElement = document.querySelector('#messages');
    const dataHeaderELement = document.createElement('h5');
    const dataElement = document.createElement('pre');
    dataElement.style = 'overflow-x:hidden;';
    dataHeaderELement.textContent = 'Received message:';
    dataElement.textContent = JSON.stringify(payload, null, 2);
    messagesElement.appendChild(dataHeaderELement);
    messagesElement.appendChild(dataElement);
  }

  // Clear the messages element of all children.
  function clearMessages() {
    const messagesElement = document.querySelector('#messages');
    while (messagesElement.hasChildNodes()) {
      messagesElement.removeChild(messagesElement.lastChild);
    }
  }

  function updateUIForPushEnabled(currentToken) {
    showHideDiv(tokenDivId, true);
    showHideDiv(permissionDivId, false);
    showToken(currentToken);
  }

  function updateUIForPushPermissionRequired() {
    showHideDiv(tokenDivId, false);
    showHideDiv(permissionDivId, true);
  }

  resetUI();
</script>
 <div id="modal_install" class="modal">
    <div class="modal-content">
      <h4>&#x1F52A; Installare?</h4>
      <p>Installa questa bellissima app</p>
    </div>
    <div class="modal-footer">
      <div class="bottoniera">
        <a id="buttonIgnore" class="btn-small waves-effect waves-light modal-close red" href="#!" type="submit" name="action">Annulla
          <i class="material-icons right">close</i>
        </a>      
        <a id="buttonInstall" class="btn-small waves-effect waves-light modal-close" href="#!" type="submit" name="action">Installa
          <i class="material-icons right">send</i>
        </a>
      </div>
    </div>
  </div>
<script src="js/main.js?v=<?=$version?>"></script>
</body>
</html>