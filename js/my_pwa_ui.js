function toast(msg,color='red'){
	 M.toast({html:msg, classes: color});
}
function initInstallPromptModal(e){
	M.Modal.init(e.installPopup);
}
function closeIosDialog(){
  document.querySelector('.speech-bubble.dialog-ios').classList.add('hide');
}
function closeInstallPopup(){
  M.Modal.getInstance(modal_install).close();
}
function notifyUserAppInstalled(evt){
  toast('Applicazione Installata','green');
}
function updateUIForPushEnabled(currentToken) {
  document.querySelector('#icon-notifications').innerHTML =  typeof pwa.firebaseToken!='undefined' &&  pwa.firebaseToken ? 'notifications_active': 'notifications';
}
function updateUIForPushPermissionRequired() {
   document.querySelector('#icon-notifications').innerHTML =  typeof pwa.firebaseToken!='undefined' &&  pwa.firebaseToken ? 'notifications_active': 'notifications';
}
function notifyOnlineStatusChange(){

}
function openInstallDialog(){ 
  M.Modal.getInstance(modal_install).open();
}