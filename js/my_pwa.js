var pwa_config = {
  'icon':'/sorice/pwa/favicon/android-chrome-192x192.png',
  'firebaseConfig':{
    'firebase_version':pwa_firebase_version,
    'publicVapidKey':'BCAPNkOuhc8A_7iA_c5O0R_iFX_cUIZ_eAiISdlOeX2B0ulQu3Tc4iqJxL39hh04-_R2QOyLrxl8Sk4tPP8OOs0',
    'init':{
          apiKey: "AIzaSyC08RpPoxYSrWEm7BWlG4aayyjhgApignU",
          authDomain: "pushpwa-baa0c.firebaseapp.com",
          databaseURL: "https://pushpwa-baa0c.firebaseio.com",
          projectId: "pushpwa-baa0c",
          storageBucket: "pushpwa-baa0c.appspot.com",
          messagingSenderId: "784600214634",
          appId: "1:784600214634:web:1818e23da1253409442e13"
        }
    },
  'ui':{
    'buttonInstall': document.querySelector('#buttonInstall')
  },
  'events':{
    'start':onStartPWA,
    'tokenRefresh':onTokenRefreshPWA,
    'tokenError':onTokenErrorPWA,
    'message':onMessagePWA,
    'installDialog':openInstallDialog,
    'installDialogIos':openInstallDialogIos,
    'installAccepted':onInstallDenied,
    'installDenied':onInstallAccepted,
    'installed':onInstallPWA,
    'onlineStatusChange':onOnlineStatusChange
  }
};

//Inizializzazione PWA
var pwa = new PWA(pwa_config);

///Variabili Globali per comodità
const tokenDivId      = 'token_div';
const permissionDivId = 'permission_div';
let deferredPrompt;


////////////////////
//Eventi PWA////////
////////////////////
//L'utente ha installato la nostra pwa
function onOnlineStatusChange(status){
  if(status){
     toast('Adesso sei Online');
  }else{
    toast('Adesso sei Offline');
  }
}
function onInstallDenied(){
   toast('INSTALL: Fail');
   M.Modal.getInstance(modal_install).close();
   console.log('User dismissed the install prompt');
}
function onInstallAccepted(){
  toast('INSTALL: Success');
  M.Modal.getInstance(modal_install).close();
   console.log('User accepted the install prompt');
}
function onInstallPWA(evt){
  toast('INSTALL: Success');
}
//La Pwa è stata inizializzata
function onStartPWA(messaging){
  console.log(pwa);
  resetUI();
}
//Abbiamo ottenuto un nuovo token per ricevere notifiche push
function onTokenRefreshPWA(refreshedToken){
  setTokenSentToServer(false);
  sendTokenToServer(refreshedToken);
  resetUI();
}
//Non siamo riusciti ad ottenere un nuovo token per ricevere notifiche push
function onTokenErrorPWA(err){
  console.log('Unable to retrieve refreshed token ', err);
  showToken('Unable to retrieve refreshed token ', err);
}
//Abbiamo ricevuto una notifica push
function onMessagePWA(payload){
  console.log('Message received. ', payload);
  appendMessage(payload);
}
function openInstallDialog(){ 
  buttonIgnore.addEventListener('click',function(){
       pwa.setInstallDecision(false);
       onInstallDenied();
  });
  M.Modal.getInstance(modal_install).open();
}
function openInstallDialogIos(){
  alert('sei su ios');
  pwa.setInstallDecision(false);
}




////////////////////////
//Helper Functions PWA//
////////////////////////
function showToken(currentToken) {
  // Show token in console and UI.
  const tokenElement = document.querySelector('#token');
  tokenElement.textContent = currentToken;
}
function isTokenSentToServer() {
  return window.localStorage.getItem('sentToServer') === '1';
}
function setTokenSentToServer(sent) {
  window.localStorage.setItem('sentToServer', sent ? '1' : '0');
}
function sendTokenToServer(currentToken) {
  if (!isTokenSentToServer()) {
    console.log('Sending token to server...');
    saveLog(currentToken);
    // TODO(developer): Send the current token to your server.
    setTokenSentToServer(true);
  } else {
    console.log('Token already sent to server so won\'t send it again ' +
        'unless it changes');
  }
}
function showHideDiv(divId, show) {
  const div = document.querySelector('#' + divId);
  if (show) {
    div.style = 'display: visible';
  } else {
    div.style = 'display: none';
  }
}
function resetUI() {
  pwa.getToken(function(currentToken){
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
  });
  clearMessages();
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