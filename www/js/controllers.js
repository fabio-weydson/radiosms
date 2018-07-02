angular.module('starter.controllers', [])

.controller('WelcomeCtrl', ['$sce', '$scope', function($sce,$scope) {
  
  $scope.slideDetails = [{
    title: 'Bem vindo à <br><b>Hello Radio</b>',
    buttonText: 'Próximo',
    image: 'img/screen/screen-1.png'
  },
  {
    title: 'A solução mais completa para sua rádio',
    buttonText: 'Próximo',
    image: 'img/screen/screen-2.png'
  },
  {
    title: 'Crie promoções onde seus ouvintes possam interar',
    buttonText: 'Próximo',
    image: 'img/screen/screen-3.png'
  },
 {
    title: 'Tudo pronto?',
    buttonText: 'Próximo',
    image: 'img/screen/screen-4.png',
    htmls: $sce.trustAsHtml(' <a class="button  button-calm" href="#/auth">'+
                    'Acessar o sistema SMS'+
                '</a>'+
                '<a class="button button-dark" href="http://www.helloradio.com.br" target="_blank">'+
                    'Ainda não sou cliente'+
                '</a>')
  }];

  $scope.slide = {
    current: 0,
    total: $scope.slideDetails.length,
    pagerClick: function (index) {
      $ionicSlideBoxDelegate.slide(index, 250);
    },
    slideChanged: function (index){
      $scope.slide.current = index;
    }
  };

	// button events
	$scope.$on('$ionicView.enter', function(){
	  $scope.slide.current = 0;
	});

}])
.controller('AuthCtrl', function($scope,$state,$http, $httpParamSerializerJQLike) {
    localStorage.setItem('FirstRun', 'false');
    //window.plugins.sim.getSimInfo(successCallBack, errorCallback);
    function successCallBack(result){
      var resultado = JSON.stringify(result);
      alert(resultado) 
    }
    function errorCallback(result){
      return  false;
    }
    $scope.user = {};
    $scope.message_error = "";
    $scope.login = function(user){  
             
        $http({ 
            url: 'https://hello.radio.midia9.online/api/autenticar', 
            method: 'POST', 
            dataType:"json",
            data: $httpParamSerializerJQLike($scope.user), 
         
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
            .success(function (response) {
            if(response.result==true) {
                $scope.message_error = false;
                localStorage.setItem('empresa', JSON.stringify(response.data));
                $state.go('tab.dash');
            } else if(response.result==false) {
                $scope.message_error = response.msg;
            }
        }).error(function(response) {
             $scope.message_error = response.msg;
        });
    }
})

.controller('DashCtrl', function($scope, Chats, Empresa) {
    $scope.Empresa = Empresa.info();
})

.controller('ChatsCtrl', function($scope, $rootScope, Chats, $interval) {

  $scope.$on('$ionicView.enter', function(e) {
    $scope.Totalchats = Chats.allCount();
    $scope.chats = Chats.refresh();
    $scope.chats = Chats.all();

    $interval(function(){
      alert('atualizar');
    },50000);
   
  });
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
