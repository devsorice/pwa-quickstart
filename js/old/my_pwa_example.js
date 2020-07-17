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
  'serviceWorkers':[
     '/sorice/pwa/sw_cached_pages.js'
  ],
  'events':{
    'start':onStartPWA,
    'tokenRefresh':onTokenRefreshPWA,
    'tokenError':onTokenErrorPWA,
    'deleteTokenError':onDeleteTokenError,
    'message':onMessagePWA,
    'installDialog':openInstallDialog,
    'installDialogIos':openInstallDialogIos,
    'installAccepted':onInstallDenied,
    'installDenied':onInstallAccepted,
    'installed':onInstallPWA,
    'onlineStatusChange':onOnlineStatusChange,
    'installPromptInitialized':onInstallPromptInitialized
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
function onDeleteTokenError(){
  toast('Non sono riuscito a rimuovere il token');
}
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
function onInstallDeniedIos(){
   toast('INSTALL: Fail');
  pwa.setInstallDecision(false);

  var dialog = 

  let style = dialog.getAttribute('style');
  dialog.setAttribute ('style', style+'; display:none!important;')
  document.querySelector('.speech-bubble.dialog-ios')
  .setAttribute( 'style', 'background-image: url( "http://placekitten.com.s3.amazonaws.com/homepage-samples/96/139.jpg" ) !important' );
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

function onInstallPromptInitialized(){
   if(!pwa.isInstallPopupShown())
    pwa.promptInstall();
}
//Abbiamo ottenuto un nuovo token per ricevere notifiche push
function onTokenRefreshPWA(refreshedToken){
  setTokenSentToServer(false);
  sendTokenToServer(refreshedToken);
  resetUI();
}
//Non siamo riusciti ad ottenere un nuovo token per ricevere notifiche push
function onTokenErrorPWA(err){
  toast('Non è possibile ricevere notifiche sul tuo dispositivo');
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
  pwa.setInstallDecisionString('shown');
  document.body.innerHTML+='<blockquote class="speech-bubble dialog-ios"><div class="container"><a href="#!" onclick="onInstallDeniedIos()" ountouchend="onInstallDeniedIos()" class="close red"><i class="material-icons">close</i></a><div class="apple-add-icon-container"><img src="img/QuickActions_Add.png" class="apple-add-icon"></div><div class="apple-share-container"><div class="apple-share-title">Installa questa App!</div>Fai un tap su <img src="img/Navigation_Action.png"> e poi su "Aggiungi a Home"</div></div></blockquote>';
}




////////////////////////
//Helper Functions PWA//
////////////////////////
function showToken(currentToken) {
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

function requestToken(){
  pwa.getToken(function(currentToken){
      if (currentToken) {
        sendTokenToServer(currentToken);
        updateUIForPushEnabled(currentToken);
      } else {
        console.log('No Instance ID token available. Request permission to generate one.');
        updateUIForPushPermissionRequired();
        setTokenSentToServer(false);
      }
  });
}
function resetUI() {
  requestToken();
  clearMessages();
}
function deleteToken() {
   pwa.deleteToken(function(currentToken){
      console.log('Token deleted.');
      setTokenSentToServer(false);
      resetUI();
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
  document.querySelector('#icon-notifications').innerHTML =  typeof pwa.firebaseToken!='undefined' &&  pwa.firebaseToken ? 'notifications_active': 'notifications';
  showHideDiv(tokenDivId, true);
  showHideDiv(permissionDivId, false);
  showToken(currentToken);
}
function updateUIForPushPermissionRequired() {
   document.querySelector('#icon-notifications').innerHTML =  typeof pwa.firebaseToken!='undefined' &&  pwa.firebaseToken ? 'notifications_active': 'notifications';
  showHideDiv(tokenDivId, false);
  showHideDiv(permissionDivId, true);
}