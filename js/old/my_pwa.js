var pwa_config = {
  'icon':'/sorice/pwa/favicon/android-chrome-192x192.png',
  'notificationsEndpoint':'save.php',
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
    'buttonInstall': '#buttonInstall',
    'toast':toast,
    'installPopup':'<div class="modal"> <div class="modal-content"> <h4>&#x1F52A; Installare?</h4> <p>Installa questa bellissima app</p> </div> <div class="modal-footer"> <div class="bottoniera"> <a id="buttonIgnore" class="btn-small waves-effect waves-light red" href="#!" type="submit" name="action">Annulla <i class="material-icons right">close</i> </a> <a id="buttonInstall" class="btn-small waves-effect waves-light" href="#!" type="submit" name="action">Installa <i class="material-icons right">send</i> </a> </div> </div> </div>',
    'notificationBell':'<div class="fixed-action-btn direction-top" style="bottom: 45px; right: 24px;"> <a class="btn btn-floating btn-large cyan"> <i id="icon-notifications" class="material-icons">notifications</i> </a> </div>'
  },
  'serviceWorkers':[
     '/sorice/pwa/sw_cached_pages.js'
  ],
  'events':{
    'start':onStartPWA,
    'requestToken':requestToken,
    'tokenRefresh':onTokenRefreshPWA,
    'tokenError':onTokenErrorPWA,
    'message':onMessagePWA,
    'installDialog':openInstallDialog,
    'installDialogIos':openInstallDialogIos,
    'installAccepted':onInstallDenied,
    'installDenied':onInstallAccepted,
    'installed':onInstallPWA,
    'installPromptInitialized':onInstallPromptInitialized,
    'updateUIForPushPermissionRequired':updateUIForPushPermissionRequired
  }
};
//Inizializzazione PWA


function requestToken(){
  pwa.getToken(saveToken);
}


function saveToken(currentToken){
      if (currentToken) {
        sendTokenToServer(currentToken);
        updateUIForPushEnabled(currentToken);
      } else {
        console.log('No Instance ID token available. Request permission to generate one.');
        updateUIForPushPermissionRequired();
        setTokenSentToServer(false);
      }
  }

//Abbiamo ottenuto un nuovo token per ricevere notifiche push
function onTokenRefreshPWA(refreshedToken){
  setTokenSentToServer(false);
  sendTokenToServer(refreshedToken);
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
function deleteToken() {
   pwa.deleteToken(function(currentToken){
      console.log('Token deleted.');
      setTokenSentToServer(false);
        });
}

