var pwa_firebase_version = '7.15.0';
var pwa_config = {
  'icon':'/sorice/pwa/favicon/android-chrome-192x192.png',
  'notificationsEndpoint':'save.php',
  'firstLoadAskInstall':true,
  'ask_every':   7 * 24 * 60* 60 *1000,//Ogni settimana
  'serviceWorkers':[
     '/sorice/pwa/sw_cached_pages.js'
  ],
  'firebaseConfig':{
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
    'installPopupButtons':'<div class="bottoniera"><a id="buttonIgnore" class="btn-small waves-effect waves-light red" href="#!" type="submit" name="action">${installPopupDeny} <i class="material-icons right">close</i> </a> <a id="buttonInstall" class="btn-small waves-effect waves-light" href="#!" type="submit" name="action">${installPopupAccept} <i class="material-icons right">send</i> </a> </div>'
    //'notificationBell':'<div class="fixed-action-btn direction-top" style="bottom: 45px; right: 24px;"> <a class="btn btn-floating btn-large cyan"> <i id="icon-notifications" class="material-icons">notifications</i> </a> </div>'
  },
  'text':{
    installPopupTitle:'&#x1F52A; Installare?',
    installPopupBody:'Installa questa bellissima app',
    installPopupDeny:'Annulla',
    installPopupAccept:'Installa',
    installPopupTitleIOS:'Installa questa App!',
    installPopupBodyIOS:'Fai un tap su <img src="img/Navigation_Action.png"> e poi su "Aggiungi a Home"',
  }
};
var pwa_required_scripts = [`https://www.gstatic.com/firebasejs/${pwa_firebase_version}/firebase-app.js`, `https://www.gstatic.com/firebasejs/${pwa_firebase_version}/firebase-messaging.js`];
var pwa_object = null;
var js_popup = "function loadContent(t,o){var e=new XMLHttpRequest;e.open(\"GET\",o,!0),e.onload=function(){if(e.status>=200&&e.status<400){var o=e.responseText;t.innerHTML=o}},e.send()}const version=\"0.1\",cdn=\"https:\/\/creativajs.altervista.org\/popup\/\",animationSpeed=150;let content,isPage,openAnimation,closeAnimation,position,bgColor,titleColor,textColor,borderRadius,fontFamily,noBackground,timer,totalPopups=0,thereIsContent=!1,isBlocked=!1,width=\"\",height=\"\",positionBottom=window.innerHeight-100;function timerClose(t,o){setTimeout(function(){closePopup(t)},1e3*o)}function popup(t,o,e,n,i){totalPopups++;var p=document.createElement(\"div\");p.className=\"ct-popup-background\",p.id=\"ct-popup-bg-\"+totalPopups,p.onclick=function(){closePopup(totalPopups,i)};var s=document.createElement(\"div\");s.className=\"ct-popup-box\",s.id=\"ct-popup-box-\"+totalPopups,s.innerHTML='<span class=\"ct-popup-image\" id=\"ct-popup-image-'+totalPopups+'\"><\/span>\\n                        <div class=\"ct-popup-content\" id=\"ct-popup-content-'+totalPopups+'\">\\n                            <span class=\"ct-popup-icon\" id=\"ct-popup-icon-'+totalPopups+'\"><\/span>\\n                            <h1 class=\"ct-popup-title\" id=\"ct-popup-title-'+totalPopups+'\"><\/h1>\\n                            <p class=\"ct-popup-text\" id=\"ct-popup-text-'+totalPopups+'\"><\/p>\\n                            <div class=\"ct-popup-options\" id=\"ct-popup-options-'+totalPopups+'\"><\/div>\\n                        <\/div>\\n                        <div class=\"ct-popup-close-icon\" id=\"ct-popup-close-icon-'+totalPopups+'\" onclick=\"closePopup('+totalPopups+')\"><div class=\"ct-popup-close-icon-line-first\"><div class=\"ct-popup-close-icon-line-second\"><\/div><\/div><\/div>',document.body.appendChild(p),document.body.appendChild(s);let l=document.getElementById(\"ct-popup-bg-\"+totalPopups),a=document.getElementById(\"ct-popup-box-\"+totalPopups),c=document.getElementById(\"ct-popup-image-\"+totalPopups),u=document.getElementById(\"ct-popup-icon-\"+totalPopups),r=document.getElementById(\"ct-popup-title-\"+totalPopups),d=document.getElementById(\"ct-popup-text-\"+totalPopups),m=document.getElementById(\"ct-popup-close-icon-\"+totalPopups);if(null!=i&&\"\"!==i?(content=i.content,isPage=i.isPage,isBlocked=i.isBlocked,width=i.width,height=i.height,thereIsContent=!0,openAnimation=i.openAnimation,closeAnimation=i.closeAnimation,position=i.position,bgColor=i.bgColor,titleColor=i.titleColor,textColor=i.textColor,borderRadius=i.borderRadius,fontFamily=i.fontFamily,closeButton=i.closeButton,noBackground=i.noBackground,timer=i.timer):(content=null,isPage=!1,isBlocked=!1,width=null,height=null,thereIsContent=!1,openAnimation=\"fade\",closeAnimation=\"fade\",position=\"center\",bgColor=\"#fff\",titleColor=\"#404040\",textColor=\"#606060\",borderRadius=\"3px\",fontFamily=\"sans-serif\",closeButton=!0,noBackground=!1,timer=!1),void 0===openAnimation&&(openAnimation=\"fade\"),void 0===closeAnimation&&(closeAnimation=\"fade\"),void 0===position&&(position=\"center\"),void 0===bgColor&&(bgColor=\"#fff\"),void 0===titleColor&&(titleColor=\"#404040\"),void 0===textColor&&(textColor=\"#606060\"),void 0===borderRadius&&(borderRadius=\"3px\"),void 0===fontFamily&&(fontFamily=\"sans-serif\"),\"undefined\"==typeof closeButton&&(closeButton=!0),void 0===noBackground&&(noBackground=!1),void 0===timer&&(timer=!1),l.setAttribute(\"isBlocked\",isBlocked),a.setAttribute(\"openAnimation\",openAnimation),a.setAttribute(\"closeAnimation\",closeAnimation),a.setAttribute(\"position\",position),a.setAttribute(\"bgColor\",bgColor),a.setAttribute(\"titleColor\",titleColor),a.setAttribute(\"textColor\",textColor),a.setAttribute(\"borderRadius\",borderRadius),a.setAttribute(\"fontFamily\",fontFamily),a.setAttribute(\"closeButton\",closeButton),a.setAttribute(\"noBackground\",noBackground),!1!==timer&&timer>0&&timerClose(totalPopups,timer),\"false\"!=a.getAttribute(\"closeButton\")&&\"true\"!=l.getAttribute(\"isBlocked\")||m.setAttribute(\"style\",\"display: none;\"),\"true\"==a.getAttribute(\"noBackground\")&&l.setAttribute(\"style\",\"display: none;\"),c.style.display=\"none\",u.style.display=\"none\",n){let t;t=n,c.style.backgroundImage=\"url(\"+t+\")\",c.style.display=\"block\"}if(e){let t;switch(e){case\"error\":t=cdn+\"icons\/error.png\";break;case\"success\":t=cdn+\"icons\/success.png\";break;case\"info\":t=cdn+\"icons\/info.png\";break;default:t=e}u.style.backgroundImage=\"url(\"+t+\")\",u.style.display=\"block\"}r.innerHTML=t,d.innerHTML=o;let g=document.getElementById(\"ct-popup-options-\"+totalPopups);void 0===content||null==content||\"\"==content?(g.style.marginTop=\"0\",g.style.innerHtml=\"\"):thereIsContent&&(isPage?loadContent(g,content):g.innerHTML=content,\"\"!==r.innerHTML&&\"\"!==d.innerHTML&&null!==r&&null!==d&&(g.style.marginTop=\"10px\"));let b,A=100+totalPopups+1,y=100+totalPopups+2;switch(l.style.zIndex=A.toString(),l.classList.add(\"ct-popup-show\"),l.classList.add(\"fade-ct-popup-animation-open\"),position){case\"top\":b=\"top: 100px\";break;case\"bottom\":b=\"top: \"+positionBottom+\"px\"}let f=\"background: \"+a.getAttribute(\"bgColor\")+\" !important; z-index: \"+y.toString()+\";\"+b+\" !important;border-radius: \"+a.getAttribute(\"borderRadius\")+\" !important; font-family: \"+a.getAttribute(\"fontFamily\")+\" !important;\";null!==width&&(f+=\" width: \"+width+\" !important;\"),null!==height&&(f+=\" height: \"+height+\" !important;\"),a.classList.add(\"ct-popup-show\"),a.classList.add(a.getAttribute(\"openAnimation\")+\"-ct-popup-animation-open\"),a.setAttribute(\"style\",f),r.setAttribute(\"style\",\"color: \"+a.getAttribute(\"titleColor\")+\" !important\"),d.setAttribute(\"style\",\"color: \"+a.getAttribute(\"textColor\")+\" !important\")}function closePopup(t,o){ /*websiteOK(false);*/ let e,n=document.getElementById(\"ct-popup-bg-\"+t),i=document.getElementById(\"ct-popup-box-\"+t);(n.classList.add(\"fade-ct-popup-animation-close\"),setTimeout(function(){n.remove()},animationSpeed),i.classList.remove(i.getAttribute(\"openAnimation\")+\"-ct-popup-animation-open\"),i.classList.add(i.getAttribute(\"closeAnimation\")+\"-ct-popup-animation-close\"),setTimeout(function(){i.remove()},animationSpeed),totalPopups--)}window.onresize=function(t){let o=this.document.getElementsByClassName(\"ct-popup-box\");for(let t=0;t<o.length;t++){let e=document.getElementById(o[t].id);\"bottom\"==e.getAttribute(\"position\")&&(positionBottom=window.innerHeight-100,e.style.top=positionBottom+\"px\")}};";
js_popup += "!function(t,o){\"object\"==typeof module&&module.exports?module.exports=o():t.Toastify=o()}(this,function(t){var o=function(t){return new o.lib.init(t)};function i(t,o){return!(!t||\"string\"!=typeof o)&&!!(t.className&&t.className.trim().split(\/\\s+\/gi).indexOf(o)>-1)}return o.lib=o.prototype={toastify:\"1.8.0\",constructor:o,init:function(t){return t||(t={}),this.options={},this.toastElement=null,this.options.text=t.text||\"Hi there!\",this.options.node=t.node,this.options.duration=0===t.duration?0:t.duration||3e3,this.options.selector=t.selector,this.options.callback=t.callback||function(){},this.options.destination=t.destination,this.options.newWindow=t.newWindow||!1,this.options.close=t.close||!1,this.options.gravity=\"bottom\"===t.gravity?\"toastify-bottom\":\"toastify-top\",this.options.positionLeft=t.positionLeft||!1,this.options.position=t.position||\"\",this.options.backgroundColor=t.backgroundColor,this.options.avatar=t.avatar||\"\",this.options.className=t.className||\"\",this.options.stopOnFocus=void 0===t.stopOnFocus||t.stopOnFocus,this.options.onClick=t.onClick,this},buildToast:function(){if(!this.options)throw\"Toastify is not initialized\";var t=document.createElement(\"div\");if(t.className=\"toastify on \"+this.options.className,this.options.position?t.className+=\" toastify-\"+this.options.position:!0===this.options.positionLeft?(t.className+=\" toastify-left\",console.warn(\"Property `positionLeft` will be depreciated in further versions. Please use `position` instead.\")):t.className+=\" toastify-right\",t.className+=\" \"+this.options.gravity,this.options.backgroundColor&&(t.style.background=this.options.backgroundColor),this.options.node&&this.options.node.nodeType===Node.ELEMENT_NODE)t.appendChild(this.options.node);else if(t.innerHTML=this.options.text,\"\"!==this.options.avatar){var o=document.createElement(\"img\");o.src=this.options.avatar,o.className=\"toastify-avatar\",\"left\"==this.options.position||!0===this.options.positionLeft?t.appendChild(o):t.insertAdjacentElement(\"beforeend\",o)}if(!0===this.options.close){var i=document.createElement(\"span\");i.innerHTML=\"&#10006;\",i.className=\"toast-close\",i.addEventListener(\"click\",function(t){t.stopPropagation(),this.removeElement(this.toastElement),window.clearTimeout(this.toastElement.timeOutValue)}.bind(this));var n=window.innerWidth>0?window.innerWidth:screen.width;(\"left\"==this.options.position||!0===this.options.positionLeft)&&n>360?t.insertAdjacentElement(\"afterbegin\",i):t.appendChild(i)}if(this.options.stopOnFocus&&this.options.duration>0){const o=this;t.addEventListener(\"mouseover\",function(o){window.clearTimeout(t.timeOutValue)}),t.addEventListener(\"mouseleave\",function(){t.timeOutValue=window.setTimeout(function(){o.removeElement(t)},o.options.duration)})}return void 0!==this.options.destination&&t.addEventListener(\"click\",function(t){t.stopPropagation(),!0===this.options.newWindow?window.open(this.options.destination,\"_blank\"):window.location=this.options.destination}.bind(this)),\"function\"==typeof this.options.onClick&&void 0===this.options.destination&&t.addEventListener(\"click\",function(t){t.stopPropagation(),this.options.onClick()}.bind(this)),t},showToast:function(){var t;if(this.toastElement=this.buildToast(),!(t=void 0===this.options.selector?document.body:document.getElementById(this.options.selector)))throw\"Root element is not defined\";return t.insertBefore(this.toastElement,t.firstChild),o.reposition(),this.options.duration>0&&(this.toastElement.timeOutValue=window.setTimeout(function(){this.removeElement(this.toastElement)}.bind(this),this.options.duration)),this},hideToast:function(){this.toastElement.timeOutValue&&clearTimeout(this.toastElement.timeOutValue),this.removeElement(this.toastElement)},removeElement:function(t){t.className=t.className.replace(\" on\",\"\"),window.setTimeout(function(){this.options.node&&this.options.node.parentNode&&this.options.node.parentNode.removeChild(this.options.node),t.parentNode&&t.parentNode.removeChild(t),this.options.callback.call(t),o.reposition()}.bind(this),400)}},o.reposition=function(){for(var t,o={top:15,bottom:15},n={top:15,bottom:15},s={top:15,bottom:15},e=document.getElementsByClassName(\"toastify\"),a=0;a<e.length;a++){t=!0===i(e[a],\"toastify-top\")?\"toastify-top\":\"toastify-bottom\";var r=e[a].offsetHeight;t=t.substr(9,t.length-1);(window.innerWidth>0?window.innerWidth:screen.width)<=360?(e[a].style[t]=s[t]+\"px\",s[t]+=r+15):!0===i(e[a],\"toastify-left\")?(e[a].style[t]=o[t]+\"px\",o[t]+=r+15):(e[a].style[t]=n[t]+\"px\",n[t]+=r+15)}return this},o.lib.init.prototype=o.lib,o});";
var css_popup = ".control-panel { display: inline; } .control-panel__btn { display: table-cell; width: 50%; padding-left: 10px; } .control-panel__btn .button-popup { width: 100%; }   .button-popup { margin-top: 12px; text-decoration: none; margin: 0; height: 38px; border-radius: 0; background-image: none; background: #08c; border: 1px solid #08c; cursor: pointer; display: inline-block; padding: 7px 15px; font-size: 15px; box-sizing: border-box; vertical-align: middle; font-weight: 400; line-height: 22px; background-color: #AC9295; border-color: #AC9295; color: #FFFFFF; }\/* ---------------------------- ----------- POPUP ------------ ---------------------------- *\/ .ct-popup-background { width: 100%; height: 100%; position: fixed; left: 0; top: 0; background-color: rgba(10, 10, 10, 0.8); opacity: 0; } .ct-popup-container { position: relative; } .ct-popup-box { opacity: 0; width: fit-content; width: -moz-fit-content; background: #fff; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); box-shadow: 0px 6px 12px 2px #222; border-radius: 3px; font-family: sans-serif; transition-property: width; transition-duration: 3s; } .ct-popup-close-icon { width: 18px; height: 18px; position: absolute; right: -7px; top: -7px; border-radius: 50%; background-color: #ff4d4d; transition: background 0.15s; } .ct-popup-close-icon:hover { cursor: pointer; background-color: #e60000; } .ct-popup-close-icon:active { background-color: #cc0000; } .ct-popup-close-icon-line-first, .ct-popup-close-icon-line-second { height: 10px; width: 2px; background-color: white; } .ct-popup-close-icon-line-first { margin-left: 8px; margin-top: 4px; transform: rotate(45deg); Z-index: 1; } .ct-popup-close-icon-line-second { transform: rotate(90deg); Z-index: 2; } .ct-popup-show { opacity: 1; } .ct-popup-image, .ct-popup-icon { display: block; background-size: cover; background-position: center center; } .ct-popup-image { width: calc(100% + 4px); height: 120px; position: relative; left: -2px; top: -2px; box-shadow: 0px 4px 3px -3px #aaa; border-top-left-radius: 3px; border-top-right-radius: 3px; } .ct-popup-content { padding: 17px 17px; } .ct-popup-icon { margin: auto; margin-bottom: 8px; width: 28px; height: 28px; } .ct-popup-title, .ct-popup-text { margin: 0; text-align: center; } .ct-popup-title { font-weight: 600 !important; font-size: 19px !important; color: #404040 !important; margin-bottom: 3px !important; } .ct-popup-text { font-size: 15px !important; color: #606060 !important; } .ct-popup-text h1, .ct-popup-text h2, .ct-popup-text h3, .ct-popup-text h4, .ct-popup-text h5, .ct-popup-text h6 { color: #222; } .ct-popup-text b { color: #222; font-weight: 600; } .ct-popup-elements { overflow: hidden; width: fit-content; max-width: 100%; margin: auto; } .ct-popup-elements * { float: left; } \/* ---------------------------- -------- ANIMATIONS ----------- ---------------------------- *\/ .fade-ct-popup-animation-open { animation-name: fade-ct-popup-animation-open; animation-duration: 0.15s; animation-fill-mode: forwards; } @keyframes fade-ct-popup-animation-open { from { opacity: 0; } to { opacity: 1; } } .fade-ct-popup-animation-close { animation-name: fade-ct-popup-animation-close; animation-duration: 0.15s; animation-fill-mode: forwards; } @keyframes fade-ct-popup-animation-close { from { opacity: 1; } to { opacity: 0; } } .bubble-ct-popup-animation-open { animation-name: bubble-ct-popup-animation-open; animation-duration: 0.15s; animation-fill-mode: forwards; } @keyframes bubble-ct-popup-animation-open { 0% { transform: translate(-50%, -50%) scale(0, 0); } 50% { transform: translate(-50%, -50%) scale(1.1, 1.1); } 100% { transform: translate(-50%, -50%) scale(1, 1); } } .bubble-ct-popup-animation-close { animation-name: bubble-ct-popup-animation-close; animation-duration: 0.15s; animation-fill-mode: forwards; } @keyframes bubble-ct-popup-animation-close { 0% { transform: translate(-50%, -50%) scale(1, 1); } 50% { transform: translate(-50%, -50%) scale(1.1, 1.1); } 100% { transform: translate(-50%, -50%) scale(0, 0); } } .card-right-ct-popup-animation-open { animation-name: card-right-ct-popup-animation-open; animation-duration: 0.15s; animation-fill-mode: forwards; } @keyframes card-right-ct-popup-animation-open { from { opacity: 0; left: calc(50% + 200px); transform: translate(-50%, -50%) scale(0.8, 0.8); } to { opacity: 1; left: 50%; transform: translate(-50%, -50%) scale(1, 1); } } .card-right-ct-popup-animation-close { animation-name: card-right-ct-popup-animation-close; animation-duration: 0.15s; animation-fill-mode: forwards; } @keyframes card-right-ct-popup-animation-close { from { opacity: 1; left: 50%; transform: translate(-50%, -50%) scale(1, 1); } to { opacity: 0; left: calc(50% + 200px); transform: translate(-50%, -50%) scale(0.8, 0.8); } } .card-left-ct-popup-animation-open { animation-name: card-left-ct-popup-animation-open; animation-duration: 0.15s; animation-fill-mode: forwards; } @keyframes card-left-ct-popup-animation-open { from { opacity: 0; left: calc(50% - 200px); transform: translate(-50%, -50%) scale(0.8, 0.8); } to { opacity: 1; left: 50%; transform: translate(-50%, -50%) scale(1, 1); } } .card-left-ct-popup-animation-close { animation-name: card-left-ct-popup-animation-close; animation-duration: 0.15s; animation-fill-mode: forwards; } @keyframes card-left-ct-popup-animation-close { from { opacity: 1; left: 50%; transform: translate(-50%, -50%) scale(1, 1); } to { opacity: 0; left: calc(50% - 200px); transform: translate(-50%, -50%) scale(0.8, 0.8); } } .newspaper-ct-popup-animation-open { animation-name: newspaper-ct-popup-animation-open; animation-duration: 0.4s; animation-fill-mode: forwards; } @keyframes newspaper-ct-popup-animation-open { from { opacity: 0; transform: translate(-50%, -50%) scale(0) rotate(500deg); } to { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(0deg); } } .newspaper-ct-popup-animation-close { animation-name: newspaper-ct-popup-animation-close; animation-duration: 0.4s; animation-fill-mode: forwards; } @keyframes newspaper-ct-popup-animation-close { from { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(0deg); } to { opacity: 0; transform: translate(-50%, -50%) scale(0) rotate(500deg); } } .unfold-ct-popup-animation-open { animation-name: unfold-ct-popup-animation-open; animation-duration: 0.3s; animation-fill-mode: forwards; } @keyframes unfold-ct-popup-animation-open { from { opacity: 0; transform-style: preserve-3d; transform: translate(-50%, -50%) rotateY(-60deg); } to { opacity: 1; transform: translate(-50%, -50%) rotateY(0deg); } } .unfold-ct-popup-animation-close { animation-name: unfold-ct-popup-animation-close; animation-duration: 0.3s; animation-fill-mode: forwards; } @keyframes unfold-ct-popup-animation-close { from { opacity: 1; transform: translate(-50%, -50%) rotateY(0deg); } to { opacity: 0; transform-style: preserve-3d; transform: translate(-50%, -50%) rotateY(-60deg); } } \/* ---------------------------- ---------- MOBILE ------------- ---------------------------- *\/ @media (max-width: 500px) { .ct-popup-box { width: 90%; } .ct-box-centered { width: 90% !important; } }";
//Creativa Popup
css_popup += '.ct-popup-title{    font-size: 30px!important;}  .ct-popup-text{ line-height: 25px;margin-top: 14px!important;   }   .strikethrough { position: relative; } .strikethrough:before { color:red; position: absolute; content: ""; left: 0; top: 50%; right: 0; border-top: 3px solid; border-color: inherit; -webkit-transform:rotate(-30deg); -moz-transform:rotate(-30deg); -ms-transform:rotate(-30deg); -o-transform:rotate(-30deg); transform:rotate(-30deg); }';	
//Bottone Installa
css_popup += '.hidden{ display:none!important;} .bottoniera{ min-width: 270px; margin-top: 14px;} ';
//Istruzioni IOS
css_popup += "/*Popup Install*/ .bottoniera{ display:flex; justify-content: space-around; margin: 0 0 0 auto; max-width: 308px; } /*Speech Bubble*/ /*custom*/ .speech-bubble a.close { text-align: center; background-color: #fff; border-radius: 50%; -webkit-box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1); box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1); height: 24px; width: 24px; position: absolute; top: -10px; z-index: 1; -webkit-transition: background-color .2s; transition: background-color .2s; color: white; /* display: none; */ right: -11px; } .speech-bubble .container { font-size: 1.2rem; display: flex; padding: 0px!important; margin: 0px 0px 0px 0px!important; justify-content: space-around; align-items: center; width: 97%; background: #8CA8D8; max-width: 344px; border-radius: 5px; position: relative; } .speech-bubble .apple-add-icon-container { background-color: #acc1e4; display: flex; align-items: center; padding: 10px; border-radius: 9px; margin-left: 14px; } .speech-bubble .apple-share-title{ font-size: 20px; font-weight: 500; } @media(max-width: 278px){ .speech-bubble .apple-add-icon-container{ display: none!important; } .speech-bubble .apple-share-container{ text-align: center!important; } } .speech-bubble .apple-share-container { padding: 7px; max-width: 233px; } .speech-bubble .apple-add-icon { width: 32px; border-radius: 8px; background-color: unset; filter: invert(1); height: 32px; } .speech-bubble img { width: 20px; margin: 0px 3px; vertical-align: sub; filter: invert(1); background-color: #8ca084; padding: 3px; border-radius: 4px; } .speech-bubble { position: fixed!important; bottom: -14px; width: 100%; border-left: none; left: 2px; z-index: 200000; padding: 0px 7px!important; } /*original*/ .speech-bubble { -webkit-filter: drop-shadow(-1px -1px 2px rgba(0, 0, 0, 0.1)) drop-shadow(1px 2px 2px rgba(0, 0, 0, 0.15)); filter: drop-shadow(-1px -1px 2px rgba(0, 0, 0, 0.1)) drop-shadow(1px 2px 2px rgba(0, 0, 0, 0.15)); margin: 36px 0px; font-family: 'Source Sans Pro', sans-serif; font-size: 1.2rem; font-weight: 400; /* background: #8CA8D8; */ color: white; display: flex; justify-content: space-around; } /*.speech-bubble::before { border: 12.5px solid transparent; border-top: 12.5px solid #8CA8D8; border-bottom: 0; height: 0; width: 0; border-top-width: 25px; content: ''; display: block; position: absolute; left: 3rem; bottom: -25px; -webkit-transform-origin: center; transform-origin: center; -webkit-transform: rotate(90deg) skew(-25deg) translateY(16.6666666667px); transform: rotate(90deg) skew(-25deg) translateY(16.6666666667px); }*/ .speech-bubble::before { border: 12.5px solid transparent; border-top: 12.5px solid #8CA8D8; border-bottom: 0; height: 0; width: 0; border-top-width: 25px; content: ''; display: block; position: absolute; left: 49%; bottom: -25px; -webkit-transform-origin: center; transform-origin: center; -webkit-transform: rotate(90deg) skew(-25deg) translateY(16.6666666667px); transform: rotate(117deg) translateY(16.6666666667px); } .speech-bubble cite { position: absolute; bottom: -2rem; left: 4.5rem; font-size: 1rem; font-style: normal; font-weight: 300; letter-spacing: 0.5px; color: white; }";
//Toast 
css_popup += " .toastify{padding:12px 20px;color:#fff;display:inline-block;box-shadow:0 3px 6px -1px rgba(0,0,0,.12),0 10px 36px -4px rgba(77,96,232,.3);background:-webkit-linear-gradient(315deg,#73a5ff,#5477f5);background:linear-gradient(135deg,#73a5ff,#5477f5);position:fixed;opacity:0;transition:all .4s cubic-bezier(.215,.61,.355,1);border-radius:2px;cursor:pointer;text-decoration:none;max-width:calc(50% - 20px);z-index:2147483647}.toastify.on{opacity:1}.toast-close{opacity:.4;padding:0 5px}.toastify-right{right:15px}.toastify-left{left:15px}.toastify-top{top:-150px}.toastify-bottom{bottom:-150px}.toastify-rounded{border-radius:25px}.toastify-avatar{width:1.5em;height:1.5em;margin:0 5px;border-radius:2px}.toastify-center{margin-left:auto;margin-right:auto;left:0;right:0;max-width:fit-content}@media only screen and (max-width:360px){.toastify-left,.toastify-right{margin-left:auto;margin-right:auto;left:0;right:0;max-width:fit-content}}";
var ios_install_dialog = '<blockquote class="speech-bubble dialog-ios"><div class="container"><a href="#!" class="close red"><span style=" font-size: 26px; line-height: 25px; ">×</span></a><div class="apple-add-icon-container"><img src="img/QuickActions_Add.png" class="apple-add-icon"></div><div class="apple-share-container"><div class="apple-share-title">${installPopupTitleIOS}</div>${installPopupBodyIOS}</div></div></blockquote>';
class PWA{	
	constructor(config={}){
		String.prototype.render = function(params) {
		  const names = Object.keys(params);
		  const vals = Object.values(params);
		  return new Function(...names, `return \`${this}\`;`)(...vals);
		}
		this.isIos = /iphone|ipad|ipod/.test( window.navigator.userAgent.toLowerCase() );
		this.online = navigator.onLine;
		this.callbacks = {};
		this.installPromptInitialized = false;
		config.ui.iosInstallDialog  = ios_install_dialog;
		this.ui = config.ui;
		this.required_scripts = pwa_required_scripts;
		this.config = config;
		this.isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator.standalone);
		this.isInStandaloneMode = this.isInStandaloneMode || window.matchMedia('(display-mode: standalone)').matches;
		this.config.firebase_version = pwa_firebase_version;
		this.appendText(js_popup,'script');
		this.appendText(css_popup,'style');		
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
		if(typeof window.localStorage.installDecision_lastUpdate!='undefined')
			this.installDecision_lastUpdate = 	window.localStorage.installDecision_lastUpdate;
		else{
			this.installDecision = 0;
		}
		if(typeof window.localStorage.install_next_ask!='undefined')
			this.install_next_ask = window.localStorage.install_next_ask;
		else{
			this.install_next_ask = false;
		}
		if(typeof this.config.ask_every=='undefined')
			this.config.ask_every= false;
		if(typeof window.localStorage.firebaseToken!='undefined')
			this.firebaseToken = window.localStorage.firebaseToken;
		else{
			this.firebaseToken = '';
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
		this.installDecision_lastUpdate = 0;
		window.localStorage.installDecision_lastUpdate = 0;
	}
	setInstallDecision(bool){
		this.setInstallDecisionString(bool ? 'accepted': 'refused')
	}
	setInstallDecisionString(str){
		this.installDecision = str;
		window.localStorage.installDecision = this.installDecision;
		this.installDecision_lastUpdate = new Date().getTime();
		window.localStorage.installDecision_lastUpdate = this.installDecision_lastUpdate;
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
			        this.toggleSubscriptionToServer(currentToken);
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
	   				this.toggleSubscriptionToServer(currentToken,true); //unsubscribe
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
	notificationsEnabled(){
		return 'Notification' in window && Notification.permission === "granted";
	}
	notificationsBlocked(){
		return 'Notification' in window && Notification.permission === "denied";
	}
	promptNotification(){
		this.triggerEvent('requestToken');
		this.getToken();
	}
	toggleSubscriptionToServer(token,del=false){
		if(typeof this.config.notificationsEndpoint!='undefined' && this.config.notificationsEndpoint){
			if (!this.isTokenSentToServer() || del) {
				let data = {'token':token};
				let opt = {
			      method: 'post',
			      headers: {
			        'Accept': 'application/json',
			        'Content-Type': 'application/json'
			      },
			      body: JSON.stringify(data)
			    };
			    if(del){
			    	opt.method = 'delete';
			    	 window.localStorage.setItem('firebaseToken', '');
			    }
			    else{
			    	 window.localStorage.setItem('firebaseToken', token);
			    }
				fetch(this.config.notificationsEndpoint, opt);
				this.setTokenSentToServer(!del);
			}
		}
	}
	bindElement(ui_el_name, event_name, callback){
		if(typeof this.ui !='undefined' && typeof this.ui[ui_el_name]!='undefined' && this.ui[ui_el_name]){
				const el = document.querySelector(this.ui[ui_el_name]);
				el.addEventListener(event_name, callback);
			}
	}
	toast(title, color='', options={newWindow: true, gravity: "top", position: 'center', duration: 2500,  backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)"}){
		if(color)
			options.backgroundColor = color;
		options.text = title;
		Toastify(options).showToast();
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
	installDialog(){
		this.triggerEvent('openInstallDialog');
	}
	installDenied(){
		this.triggerEvent('closeInstallPopup');
	}
	installed(){
		this.triggerEvent('notifyUserAppInstalled');
	}
	onInstallPromptInitialized(e){
		this.triggerEvent('initInstallPromptModal',e);
	}
	notifyUserAppInstalled(evt){ 
		pwa_object.toast('Applicazione Installata'); 
    }
	buttonInstall(e){
		pwa_object.deferredPrompt.prompt();
	    pwa_object.deferredPrompt.userChoice.then((choiceResult) => {
	      if (choiceResult.outcome === 'accepted') {
	         pwa_object.setInstallDecision(true);
	         pwa_object.triggerEvent('installAccepted');
	      } else {
	        pwa_object.setInstallDecision(false);
	        pwa_object.triggerEvent('installDenied');
	      }
		});
	}
	buttonDenyInstall(e){
		pwa_object.triggerEvent('installDenied');
		pwa_object.setInstallDecision(false);
	}
	promptInstall(){
		if (this.isIos){
			this.triggerEvent('installDialogIos');
			pwa_object.setInstallDecisionString('shown');
		}else if(this.isInstallPromptInitialized()){
			pwa_object.setInstallDecisionString('shown');
			this.triggerEvent('installDialog'    ,this.ui.installPopupElement);
			this.bindElement ('buttonInstall'    ,'click',this.buttonInstall);
			this.bindElement ('buttonDenyInstall','click',this.buttonDenyInstall);
		}
	}
	isInstallPromptInitialized(){
		return typeof this.installPromptInitialized!='undefined' && this.installPromptInitialized;
	}
	appendHtml(html,data={},container='div'){
		if(Object.entries(data).length === 0 && typeof this.config.text!='undefined'){
			data = this.config.text;
		}
		html = this.render(html,data);
		let newDiv = document.createElement(container);
		document.body.appendChild(newDiv);
		newDiv.innerHTML = html;
		return newDiv.firstChild;
	}
	appendText(text,container){
	 var container=document.createElement(container);
	 container.innerText = text;
	 document.body.appendChild(container);
	 return container;
	}
	_(str){
		return this.render(str,this.config.text);
	}
	render(template,data){
		if(typeof template.render!=='undefined'){
			return template.render(data);
		}else return template;
	}
	initInstallPrompt(){
		if(!this.isInStandaloneMode){
			let installPopup = null;
			if(typeof this.ui.installPopup !='undefined' && this.ui.installPopup){		    
				installPopup = this.appendHtml(this.ui.installPopup); 
				installPopup.setAttribute('id', 'modal_install'); 
				installPopup.style.display = 'none';
				this.ui.installPopupElement = installPopup;			
			}
			if (this.isIos && !pwa_object.isInstallPopupShown() && typeof this.config.firstLoadAskInstall!='undefined' && this.config.firstLoadAskInstall){
				 	pwa_object.promptInstall();
			}
			window.addEventListener('beforeinstallprompt', (e) => {
				 e.preventDefault();
				 this.deferredPrompt = e;
				 this.installPromptInitialized = true;
				 e.installPopup = installPopup;		
				 this.triggerEvent('onInstallPromptInitialized',e);
				 if(!pwa_object.isInstallPopupShown() && typeof this.config.firstLoadAskInstall!='undefined' && this.config.firstLoadAskInstall){
				 	pwa_object.promptInstall();
				 }
			});
		}
	}
	closeInstallPopup(){
	   closePopup(totalPopups);
	}
	openInstallDialog(modal){ 
	 pwa_object.popup(pwa_object.config.text.installPopupTitle,pwa_object.config.text.installPopupBody+pwa_object._(pwa_object.config.ui.installPopupButtons));
	 pwa_object.bindElement ('buttonInstall'    ,'click',pwa_object.buttonInstall);
	 pwa_object.bindElement ('buttonDenyInstall','click',pwa_object.buttonDenyInstall);
	}
	initNotificationPrompt(){
		if(typeof this.ui.notificationBell !='undefined' && this.ui.notificationBell){	
			let notificationBell = this.appendHtml(this.ui.notificationBell); 
			notificationBell.setAttribute('id','notificationBell');
			notificationBell.addEventListener('click',function(){
				pwa_object.promptNotification();
			});
			this.triggerEvent('updateUIForNotifications');
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
	onlineStatusChange(status){
	}
	popup(title, text, icon, image, options){
		popup(title, text, icon, image, options);
	}
	closeIosDialog(){
	  document.querySelector('.speech-bubble.dialog-ios').classList.add('hidden');
	}
	updateUIForNotifications() {
	   var ic =  document.querySelector('#icon-notifications');
	   ic.innerHTML =  pwa_object.notificationsEnabled() ? 'notifications_active': 'notifications';
	   ic.parentElement.parentElement.style.display =  pwa_object.notificationsBlocked() ? 'none':'block';	  
	}
	updateUIForPushEnabled() {
		this.updateUIForNotifications();
	}
	updateUIForPushPermissionRequired() {
		this.updateUIForNotifications();
	}
	main(){
		if(this.config.ask_every && this.installDecision_lastUpdate){
			if(new Date().getTime() - pwa.installDecision_lastUpdate>this.config.ask_every){
				pwa.reset();
				this.config.firstLoadAskInstall = true;
			}
			else{
				this.ask_in   =  parseInt(pwa.installDecision_lastUpdate) +parseInt(this.config.ask_every);
				this.ask_when = new Date(this.ask_in);
			}
		}
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
    			this.toggleSubscriptionToServer(refreshedToken);
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
	}
}
var pwa = new PWA(pwa_config);
pwa.start();