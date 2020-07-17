var pwa_config = {
  'icon':'/sorice/pwa/favicon/android-chrome-192x192.png',
  'notificationsEndpoint':'save.php',
  'firstLoadAskInstall':true,
  'serviceWorkers':[
     '/sorice/pwa/sw_cached_pages.js'
  ],
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
    'buttonDenyInstall':'#buttonIgnore',
    'toast':toast,
    'installPopup':'<div class="modal"> <div class="modal-content"> <h4>&#x1F52A; Installare?</h4> <p>Installa questa bellissima app</p> </div> <div class="modal-footer"> <div class="bottoniera"> <a id="buttonIgnore" class="btn-small waves-effect waves-light red" href="#!" type="submit" name="action">Annulla <i class="material-icons right">close</i> </a> <a id="buttonInstall" class="btn-small waves-effect waves-light" href="#!" type="submit" name="action">Installa <i class="material-icons right">send</i> </a> </div> </div> </div>',
    'notificationBell':'<div class="fixed-action-btn direction-top" style="bottom: 45px; right: 24px;"> <a class="btn btn-floating btn-large cyan"> <i id="icon-notifications" class="material-icons">notifications</i> </a> </div>',
    'iosInstallDialog':'<blockquote class="speech-bubble dialog-ios"><div class="container"><a href="#!" class="close red"><i class="material-icons">close</i></a><div class="apple-add-icon-container"><img src="img/QuickActions_Add.png" class="apple-add-icon"></div><div class="apple-share-container"><div class="apple-share-title">Installa questa App!</div>Fai un tap su <img src="img/Navigation_Action.png"> e poi su "Aggiungi a Home"</div></div></blockquote>'
  },  
  'ui_functions':{
      closeInstallPopup,
      updateUIForPushEnabled,
      updateUIForPushPermissionRequired,
      notifyUserAppInstalled,
      initInstallPromptModal,
      notifyOnlineStatusChange
  },
  'text':{
    installPopupTitle:'',
    installPopupBody:'',
    iosDialogText:''
  }
};

