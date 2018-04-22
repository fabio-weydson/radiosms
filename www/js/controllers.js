angular.module('starter.controllers', [])

.controller('WelcomeCtrl', function($scope) {
 
        $scope.showSkip = true;
        $scope.dir = 'ltr';
        $scope.slideList = [
            {
                title: "What is <strong>Food</strong>Ionic?",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus, dui accumsan cursus lacinia, nisl risus.",
                image: "assets/img/foodIonic-ico.png",
            },
            {
                title: "Why FoodIonic?",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus, dui accumsan cursus lacinia, nisl risus.",
                image: "assets/img/foodIonic-ico.png",
            },
            {
                title: "Your delicious dish is coming!",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus, dui accumsan cursus lacinia, nisl risus.",
                image: "assets/img/foodIonic-ico.png",
            }
        ];
    
    $scope.onSlideNext = function () {
        $scope.slides.slideNext(300);
    };
    $scope.onSlidePrev = function () {
        $scope.slides.slidePrev(300);
    };
    $scope.onLastSlide = function () {
        $scope.slides.slideTo(3, 300);
    };


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
