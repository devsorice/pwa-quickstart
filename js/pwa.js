var pwa_firebase_version = '7.15.0';
var pwa_required_scripts = [`https://www.gstatic.com/firebasejs/${pwa_firebase_version}/firebase-app.js`, `https://www.gstatic.com/firebasejs/${pwa_firebase_version}/firebase-messaging.js`];
var pwa_events = [
		'start',
		'tokenRefresh',
		'tokenError',
		'message',
		'installed',
		'installDialogIos',
		'installDialog'
	];
var pwa_object = null;	
class PWA{	
	constructor(config={}){
		this.isIos = /iphone|ipad|ipod/.test( window.navigator.userAgent.toLowerCase() );
		this.online = navigator.onLine;
		this.callbacks = {};
		this.installPromptInitialized = false;
		this.ui = config.ui;
		this.events = pwa_events;
		this.required_scripts = pwa_required_scripts;
		this.config = config;
		this.isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator.standalone);
		this.isInStandaloneMode = this.isInStandaloneMode || window.matchMedia('(display-mode: standalone)').matches;

		if(typeof config.ui_functions!='undefined' && config.ui_functions)
			this.callbacks = config.ui_functions;
		if(typeof config.serviceWorkers!='undefined' && config.serviceWorkers.length){
			window.addEventListener('load', () => {
				for (var i = 0; i < config.serviceWorkers.length; i++) {
					 pwa_object.registerServiceWorker(config.serviceWorkers[i]);
				};
			});
		}
		if(typeof window.localStorage.installDecision!='undefined')
			this.installDecision = 	window.localStorage.installDecision;
		else{
			this.installDecision = 'not_shown';
		}

		pwa_object = this;	
	}
	reset(){
		this.setInstallPopupNotShown();
	}
	registerServiceWorker(path){
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register(path)
  			.then(reg => this.triggerEvent('serviceWorkerRegistered',reg))
      		.catch(err => this.triggerEvent('serviceWorkerRegistrationError',reg));
		}
		else{
			this.triggerEvent('serviceWorkerNotSupportedError');
		}
	}
	isInstallPopupShown(){
		return typeof this.installDecision!='undefined' && this.installDecision && this.installDecision!='not_shown';
	}
	setInstallPopupNotShown(){
		this.installDecision = 'not_shown';
		window.localStorage.installDecision = 'not_shown';
	}
	setInstallDecision(bool){
		this.installDecision = bool ? 'accepted': 'refused';
		window.localStorage.installDecision = this.installDecision;
	}
	setInstallDecisionString(str){
		this.installDecision = str;
		window.localStorage.installDecision = this.installDecision;
	}
	showNotification(title, message) {
	  if ('Notification' in window) {
	    navigator.serviceWorker.ready.then(registration => {
	      var msg_options = {
	        title:title,
	        body: message
	      };
	      if(this.config.icon)
	      	msg_options.icon = this.config.icon;
	      registration.showNotification(title, msg_options);
	    });
	  }
	}
	start(){
		this.execute(this.required_scripts);
	}
	execute(scripts, i=0){	
		if(i<scripts.length){
			var script = document.createElement('script');
			script.onload = function(){ 
				pwa_object.execute(scripts,i+1); 
			};
			script.src = scripts[i];
			document.head.appendChild(script);
		}		
		else{
			this.main();
		}
	}
	//subscribeForNotifications
	getToken(){
		if (!this.isIos){
			this.messaging.getToken().then((currentToken) => {
	   			this.firebaseToken= currentToken;
	   			if (currentToken) {
			        this.sendTokenToServer(currentToken);
			        this.triggerEvent('updateUIForPushEnabled',currentToken);
			      } else {
			      	this.triggerEvent('updateUIForPushPermissionRequired');
			        this.setTokenSentToServer(false);
			    }
		    }).catch((err) => {
		       this.triggerEvent('tokenError',err);
		    });
		}else{
			 this.triggerEvent('tokenError','Non supportato');
		}		
	}
	triggerEvent(ev,data={}){
		if(typeof this.callbacks[ev]=='function')
			this.callbacks[ev](data);
		else if( typeof this[ev]=='function')
			this[ev](data);		
	}
	//unsubscribeForNotifications
	deleteToken(){
		if (!this.isIos){
			  this.messaging.getToken().then((currentToken) => {
			    this.messaging.deleteToken(currentToken).then(() => {
			        this.firebaseToken= null;
	   				this.setTokenSentToServer(false);
			    }).catch((err) => {
			     this.triggerEvent('deleteTokenError',err);
			    });
			    // [END delete_token]
			  }).catch((err) => {
			    this.triggerEvent('deleteTokenError',err);
			  });
		}else{
			 this.triggerEvent('deleteTokenError','Non supportato');
		}
	}
	promptNotification(){
		this.triggerEvent('requestToken');
		this.getToken();
	}
	sendTokenToServer(token){
		if(typeof this.config.notificationsEndpoint!='undefined' && this.config.notificationsEndpoint){
			if (!this.isTokenSentToServer()) {
				let data = {'token':token};
				fetch(this.config.notificationsEndpoint, {
			      method: 'post',
			      headers: {
			        'Accept': 'application/json',
			        'Content-Type': 'application/json'
			      },
			      body: JSON.stringify(data)
			    });
			    this.setTokenSentToServer(true);
			}
		}
	}
	bindElement(ui_el_name, event_name, callback){
		if(typeof this.ui !='undefined' && typeof this.ui[ui_el_name]!='undefined' && this.ui[ui_el_name]){
				const el = document.querySelector(this.ui[ui_el_name]);
				el.addEventListener('event_name', callback);
			}

	}
	installDialogIos(){
		if(typeof this.ui.iosInstallDialog && this.ui.iosInstallDialog!='undefined'){
			let dialog = this.appendHtml(this.ui.iosInstallDialog);
			let style = dialog.getAttribute('style');  			
  			dialog.querySelector('a.close').addEventListener('click',function(){
  				dialog.setAttribute('style', style+'; display:none!important;');
  				pwa_object.setInstallDecision(false);
  			});
		}
	}
	installAccepted(){
		this.triggerEvent('closeInstallPopup');
	}
	installDenied(){
		this.triggerEvent('closeInstallPopup');
	}
	installed(){
		this.triggerEvent('notifyUserAppInstalled');
	}
	promptInstall(){
		if (this.isIos){
			this.triggerEvent('installDialogIos');
			pwa_object.setInstallDecisionString('shown');
 
		}else{
			this.triggerEvent('installDialog',this.deferredPrompt);
			this.bindElement('buttonInstall','click',(e) => {
					this.deferredPrompt.prompt();
				    this.deferredPrompt.userChoice.then((choiceResult) => {
				      if (choiceResult.outcome === 'accepted') {
				         this.setInstallDecision(true);
				         this.triggerEvent('installAccepted');
				      } else {
				        this.setInstallDecision(false);
				        this.triggerEvent('installDenied');
				      }
				    });
			});
			this.bindElement('buttonDenyInstall','click',(e) => {
					 this.setInstallDecision(false);
			});
		}
	}
	isInstallPromptInitialized(){
		return typeof this.installPromptInitialized!='undefined' && this.installPromptInitialized;
	}
	appendHtml(html){
		let newDiv = document.createElement("div");
		document.body.appendChild(newDiv);
		newDiv.innerHTML = html;
		return newDiv.firstChild;
	}
	initInstallPrompt(){
		if(typeof this.callbacks['installDialog']!='undefined' && !this.isInStandaloneMode){
			let installPopup = null;
			if(typeof this.ui.installPopup !='undefined' && this.ui.installPopup){		    
				installPopup = this.appendHtml(this.ui.installPopup); 
				installPopup.setAttribute('id', 'modal_install'); 
				installPopup.style.display = 'none';			
			}
			window.addEventListener('beforeinstallprompt', (e) => {
				 e.preventDefault();
				 this.deferredPrompt = e;
				 this.installPromptInitialized = true;
				 e.installPopup = installPopup;		
				 this.triggerEvent('installPromptInitialized',e);
				 if(!pwa_object.isInstallPopupShown() && typeof this.config.firstLoadAskInstall!='undefined' && this.config.firstLoadAskInstall)
					pwa_object.promptInstall();
					
			});
		}
	}
	initNotificationPrompt(){
		if(typeof this.ui.notificationBell !='undefined' && this.ui.notificationBell){	
			let notificationBell = this.appendHtml(this.ui.notificationBell); 
			notificationBell.setAttribute('id','notificationBell');
			notificationBell.addEventListener('click',function(){
				pwa_object.promptNotification();
			});
		}
	}
	isTokenSentToServer() {
	  return window.localStorage.getItem('sentToServer') === '1';
	}
	setTokenSentToServer(sent) {
	  window.localStorage.setItem('sentToServer', sent ? '1' : '0');
	}
	setOnlineStatus(isOnline){ 
		this.online = isOnline; 
	}
	main(){
		this.initInstallPrompt();
		this.initNotificationPrompt();
		window.addEventListener('online', () =>  { this.setOnlineStatus(true);   this.triggerEvent('onlineStatusChange',true); }  );
    	window.addEventListener('offline', () => { this.setOnlineStatus(false);  this.triggerEvent('onlineStatusChange',false); }  );
    	var firebaseConfig = this.config.firebaseConfig.init;    	
		firebase.initializeApp(firebaseConfig);
		this.messaging = firebase.messaging();
		
		var publicVapidKey = this.config.firebaseConfig.publicVapidKey;	
		this.messaging.usePublicVapidKey(publicVapidKey);
		this.messaging.onTokenRefresh(() => {
    		pwa_object.messaging.getToken().then((refreshedToken) => {
    			this.firebaseToken = refreshedToken;
    			this.sendTokenToServer(refreshedToken);
    			this.triggerEvent('tokenRefresh',refreshedToken);
    		}).catch((err) => {
	      		this.triggerEvent('tokenError',err);	      		
    		});
  		});
  		this.messaging.onMessage((payload) => {
  			this.triggerEvent('message',payload);	
  		});
		window.addEventListener('appinstalled', (evt) => {
			this.triggerEvent('installed',evt);
		});
  		this.triggerEvent('start',this.messaging);
	}
}
