pwa.start();
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
function saveLog(data){
  fetch('/save.php', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
}
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