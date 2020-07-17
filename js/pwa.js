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
		this.callbacks = config.events;
		this.ui = config.ui;
		this.events = pwa_events;
		this.required_scripts = pwa_required_scripts;
		this.config = config;
		this.isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator.standalone);
		this.isInStandaloneMode = this.isInStandaloneMode || window.matchMedia('(display-mode: standalone)').matches;		
		if(typeof window.localStorage.installDecision!='undefined')
			this.installDecision = 	window.localStorage.installDecision;
		else{
			this.installDecision = 'not_shown';
		}
		pwa_object = this;	
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
	getToken(callback){
		if (!this.isIos){
			this.messaging.getToken().then((currentToken) => {
	   			this.firebaseToken= currentToken;
	   			callback(currentToken);
		    }).catch((err) => {
		       this.callbacks['tokenError'](err);
		    });
		}else{
			 this.callbacks['tokenError']('Non supportato');
		}		
	}
	deleteToken(callback){
		if (!this.isIos){
			  this.messaging.getToken().then((currentToken) => {
			    this.messaging.deleteToken(currentToken).then(() => {
			        this.firebaseToken= null;
	   				callback(currentToken);
			    }).catch((err) => {
			     this.callbacks['deleteTokenError'](err);
			    });
			    // [END delete_token]
			  }).catch((err) => {
			    this.callbacks['deleteTokenError'](err);
			  });
		}else{
			 this.callbacks['deleteTokenError']('Non supportato');
		}
	}
	initInstallPrompt(){
		if (this.isIos && !this.isInStandaloneMode && this.installDecision == 'not_shown') {
		 	this.callbacks['installDialogIos']();
		}else if(typeof this.callbacks['installDialog']!='undefined' && this.installDecision == 'not_shown' && !this.isInStandaloneMode){
			window.addEventListener('beforeinstallprompt', (e) => {
				 e.preventDefault();
				 this.deferredPrompt = e;
				 this.callbacks['installDialog'](e);
				 this.ui.buttonInstall.addEventListener('click', (e) => {
     				this.deferredPrompt.prompt();
				    this.deferredPrompt.userChoice.then((choiceResult) => {
				      if (choiceResult.outcome === 'accepted') {
				         this.setInstallDecision(true);
				         this.callbacks['installAccepted']();
				      } else {
				        this.setInstallDecision(false);
				        this.callbacks['installDenied']();
				      }
				    });
  				});
			});
		}
	}
	setOnlineStatus(isOnline){ 
		this.online = isOnline; 
	}
	main(){
		this.initInstallPrompt();
		window.addEventListener('online', () =>  { this.setOnlineStatus(true);   this.callbacks['onlineStatusChange'](true); }  );
    	window.addEventListener('offline', () => { this.setOnlineStatus(false);  this.callbacks['onlineStatusChange'](false); }  );
    	var firebaseConfig = this.config.firebaseConfig.init;    	
		firebase.initializeApp(firebaseConfig);
		this.messaging = firebase.messaging();
		
		var publicVapidKey = this.config.firebaseConfig.publicVapidKey;	
		this.messaging.usePublicVapidKey(publicVapidKey);
		this.messaging.onTokenRefresh(() => {
    		pwa_object.messaging.getToken().then((refreshedToken) => {
    			this.firebaseToken = refreshedToken;
    			this.callbacks['tokenRefresh'](this,refreshedToken);
    		}).catch((err) => {
	      		this.callbacks['tokenError'](err);	      		
    		});
  		});
  		this.messaging.onMessage((payload) => {
  			this.callbacks['message'](payload);	
  		});
		window.addEventListener('appinstalled', (evt) => {
			this.callbacks['installed'](evt);
		});
  		this.callbacks['start'](this.messaging);
	}
}
