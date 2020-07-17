<?php 
  $version = rand();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="favicon.ico" type="image/x-icon" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="css/style.css?v=<?=$version?>">
  <title>Home - Service Worker Example</title>
  <script src="//cdn.jsdelivr.net/npm/eruda"></script>
  <script>eruda.init();</script>
  <!-- Compiled and minified CSS -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
  <!-- Compiled and minified JavaScript -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js?v=<?=$version?>"></script>
  <!-- Icons -->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel="manifest" href="manifest.webmanifest">
  <style>
  .bottoniera{
    display:flex;
    justify-content: space-around;
    margin: 0 0 0 auto;
    max-width: 308px;
  }
  </style>
</head>
<body>
<div class="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header">
  <!-- Header section containing title -->
  <header class="mdl-layout__header mdl-color-text--white mdl-color--light-blue-700">
    <div class="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid">
      <div class="mdl-layout__header-row mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--8-col-desktop">
        <h3>PWA</h3>
      </div>
    </div>
  </header>
  <main class="mdl-layout__content mdl-color--grey-100">
    <div class="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid">
      <!-- Container for the Table of content -->
      <div class="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop">
        <div class="mdl-card__supporting-text mdl-color-text--grey-600">
          <!-- div to display the generated Instance ID token -->
          <div id="main-container"></div>
          <div class="fixed-action-btn direction-top" style="bottom: 45px; right: 24px;">
            <a onclick="requestToken()" class="btn btn-floating btn-large cyan">
              <i id="icon-notifications" class="material-icons">notifications</i>
            </a>
          </div>
      
          <div id="token_div" style="display: none;">
            <h4>Instance ID Token</h4>
            <p id="token" style="word-break: break-all;"></p>
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                    onclick="deleteToken()">Delete Token</button>
          </div>
          <!-- div to display the UI to allow the request for permission to
               notify the user. This is shown if the app has not yet been
               granted permission to notify. -->
          <div id="permission_div" style="display: none;">
            <h4>Needs Permission</h4>
            <p id="token"></p>
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                    onclick="requestToken()">Request Permission</button>
          </div>
          <!-- div to display messages received by this app. -->
          <div id="messages"></div>
        </div>
      </div>
    </div>
  </main>
</div>
 <div id="modal_install" class="modal">
    <div class="modal-content">
      <h4>&#x1F52A; Installare?</h4>
      <p>Installa questa bellissima app</p>
    </div>
    <div class="modal-footer">
      <div class="bottoniera">
        <a id="buttonIgnore" class="btn-small waves-effect waves-light red" href="#!" type="submit" name="action">Annulla
          <i class="material-icons right">close</i>
        </a>      
        <a id="buttonInstall" class="btn-small waves-effect waves-light" href="#!" type="submit" name="action">Installa
          <i class="material-icons right">send</i>
        </a>
      </div>
    </div>
  </div>
 <script src="js/pwa.js?v=<?=$version?>"></script> 
 <script src="js/my_pwa.js?v=<?=$version?>"></script>
 <script src="js/main.js?v=<?=$version?>"></script>
</body>
</html>