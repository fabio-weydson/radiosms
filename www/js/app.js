// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngSanitize'])

.run(function($ionicPlatform,$rootScope) {
  $rootScope.SMSList  = [];
  $rootScope.firstRun = localStorage.getItem('FirstRun');
  $rootScope.Empresa = JSON.parse(localStorage.getItem("empresa"));
  $ionicPlatform.ready(function() {
    
    document.addEventListener('deviceready', initApp, false);
    
    cordova.plugins.backgroundMode.setDefaults({  title:  'Em modo background', ticker: 'Entrando em segundo plano',  text:'Clique para abrir o aplicativo.'});
    cordova.plugins.backgroundMode.enable();
    cordova.plugins.backgroundMode.onactivate = function () {
             
    }
                  
    document.addEventListener("backbutton",BackgroundMode(), true); 

     function initApp() {

      var permissions = cordova.plugins.permissions;
      permissions.hasPermission(permissions.READ_SMS, checkPermissionCallback, null);
  
        
       function checkPermissionCallback(status) {
           if(!status.hasPermission) {
               var errorCallback = function() {
                   alert('SMS permission is not turned on');
               }
  
               permissions.requestPermission(
                   permissions.READ_SMS,
                   function(status) {
                       if(!status.hasPermission) errorCallback();
                   },
                   errorCallback);
           }
       }

       if(SMS) SMS.startWatch(function(){
        alert('watching');
        document.addEventListener('onSMSArrive', function(e) {
          var IncomingSMS = e.data;
          alert('NOVO:'+IncomingSMS.body);
          // $rootScope.SMSList.push({
          //   'address' : IncomingSMS.address,
          //   'body': IncomingSMS.body
          // })
          // if($rootScope.Empresa.EMP_CodigoEmpresa) {
          //   alert("Logado! Fazer o envio");
          // }
        });
      }, function(){
        alert('failed to start watching');
      });

   
      function BackgroundMode(e){
          e.preventDefault();
      }
       
      if (! SMS ) { alert( 'SMS plugin not ready' ); return; } else {
       return; 
      }
       

     }

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:
.state('auth', {
    url: '/auth',
        templateUrl: 'templates/auth.html',
        controller: 'AuthCtrl'
  })
    
.state('welcome', {
    url: '/welcome',
        templateUrl: 'templates/welcome.html',
        controller: 'WelcomeCtrl'
  })

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  var FirstRun = JSON.parse(localStorage.getItem("FirstRun"));
  console.log(FirstRun);
  var Logado = JSON.parse(localStorage.getItem("empresa"));
  
  if(FirstRun!=false){
    $urlRouterProvider.otherwise('/welcome');
  } else {
    if(Logado) {
      $urlRouterProvider.otherwise('/tab/dash');
    } else {
      $urlRouterProvider.otherwise('/auth');
    }
  }

});
