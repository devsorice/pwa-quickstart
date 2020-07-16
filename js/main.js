 document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
    document.querySelector('#main-container').innerHTML = toUl({
    	'Prova':''
    });
	elems = document.querySelectorAll('.collapsible');
	instances = M.Collapsible.init(elems);
  });
  if (!('PushManager' in window)) {
      toast('Sorry, Push notification isn\'t supported in your browser.');
  }
// Make sure sw are supported
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sorice/pwa/sw_cached_pages.js')
      .then(reg => console.log('Service Worker: Registered (Pages)'))
      .catch(err => console.log(`Service Worker: Error: ${err}`));
       //showNotification('So nice to have you here!', 'Hey there!');
  });
}
function toast(msg){
	 M.toast({html:msg, classes: 'red'});
}
function saveSubscriptionID(subscription) {
    var subscription_id = subscription.endpoint.split('gcm/send/')[1];
    console.log("Subscription ID", subscription_id);
    fetch('/save.php', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user_id : subscription_id })
    });
}
function subscribePush() {
    navigator.serviceWorker.ready.then(function(registration) {
      if (!registration.pushManager) {
        toast('Your browser doesn\'t support push notification.');
        return false;
      }
      //To subscribe `push notification` from push manager
      registration.pushManager.subscribe({
        userVisibleOnly: true //Always show notification when received
      })
      .then(function (subscription) {
        //toast('Subscribed successfully.');
        console.info('Push notification subscribed.');
        console.log(subscription);
        saveSubscriptionID(subscription);
      })
      .catch(function (error) {
        console.error('Push notification subscription error: ', error);
      });
    })
  }
function unsubscribePush() {
    navigator.serviceWorker.ready
    .then(function(registration) {
      //Get `push subscription`
      registration.pushManager.getSubscription()
      .then(function (subscription) {
        //If no `push subscription`, then return
        if(!subscription) {
          toast('Unable to unregister push notification.');
          return;
        }
        //Unsubscribe `push notification`
        subscription.unsubscribe()
          .then(function () {
            toast('Unsubscribed successfully.');
            console.info('Push notification unsubscribed.');
            //deleteSubscriptionID(subscription);
          })
          .catch(function (error) {
            console.error(error);
          });
      })
      .catch(function (error) {
        console.error('Failed to unsubscribe push notification.');
      });
    })
  }
function showNotification(title, message) {
  if ('Notification' in window) {
    navigator.serviceWorker.ready.then(registration => {
      registration.showNotification(title, {
        title:title,
        body: message,
        icon: '/sorice/pwa/favicon/android-chrome-192x192.png',
        tag: 'vibration-sample',
        vibrate: [200, 100, 200, 100, 200, 100, 200]
      });
    });
  }
}
window.addEventListener('appinstalled', (evt) => {
  // Log install to analytics
  toast('INSTALL: Success');
});
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
	 toast('Questa app è installabile');
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can install the PWA
  showInstallPromotion();
  buttonInstall.addEventListener('click', (e) => {
  	 toast('Hai accettato l\'installazione');
	   // Hide the app provided install promotion
	   hideMyInstallPromotion();
	   // Show the install prompt
	   deferredPrompt.prompt();
	   //Notifiche
	   if ('Notification' in window) {
		   Notification.requestPermission(result =>  {
			  console.log(result)
			  if (result === 'granted') {
			    toast('thanks for giving me permissions')
			  }
			});
		}
	  // Wait for the user to respond to the prompt
	  deferredPrompt.userChoice.then((choiceResult) => {
	    if (choiceResult.outcome === 'accepted') {
	      console.log('User accepted the install prompt');
	    } else {
	      console.log('User dismissed the install prompt');
	    }
	  });
	});
});
function toUl(a){
	console.log(a);
	if(typeof a ==='function'){
		try {
		 a = navigator[a.name]();
		} catch (error) {
		  console.log('Error: errore'+error);
		}
	}
	if(Array.isArray(a)){
		console.log('array');
		return "<ul class='collection'>"+a.map(x=>"<li  class='collection-item'>"+toUl(x)+"</li>").join('')+"</ul>";
	}
	else if(typeof a === 'object' && a !== null){
		console.log('object');
		return "<ul class='collapsible popout'>"+Object.keys(a).map(x => "<li><div class='collapsible-header'>"+x+"</div><div class='collapsible-body'>"+toUl(a[x])+"</div></li>").join('')+"</ul>";
	}
	else if(!a || typeof a.toString !== "function"){
		console.log('empty');
		return '';
	}
	else{
		console.log('other');
		return a.toString();
	} 
}
function showInstallPromotion(){
	M.Modal.getInstance(modal_install).open();
	//buttonInstall.classList.remove('hide');	
}
function hideMyInstallPromotion(){
	//buttonInstall.classList.add('hide');
}