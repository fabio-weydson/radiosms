angular.module('starter.controllers', [])

.controller('WelcomeCtrl', ['$sce', '$scope', function($sce,$scope) {
  $scope.slideDetails = [{
    title: 'Bem vindo à <b>Hello Radio</b>',
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
    title: 'Está pronto?',
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

  $scope.wkButton = function () {
    var lastslide = $scope.slide.total - 1;
    if ($scope.slide.current === lastslide) {
      localStorage.setItem('appFirstRun', 'true');
      $state.go('app.addUser');
    }else {
      $ionicSlideBoxDelegate.next();
    }
  };

	// button events
	$scope.$on('$ionicView.enter', function(){
	  $scope.slide.current = 0;
	});

}])
.controller('AuthCtrl', function($scope,$state,$http) {
    $scope.user = {};
    $scope.login = function(user){
        console.log(user)
        
        $http.post('http://www.helloradio.com.br/api/auth', { telefone: user.telefone})
            .success(function (response) {
            console.log(response);
            if(response.status==true) {
                $state.go('/dash');
            } else if(response.status==false) {
                $state.go('tab.dash');
            }
        }).error(function(response) {
             $state.go('tab.dash');
        });
    }
})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})


.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
