angular.module('starter.services', [])
.factory('SMSservice', ['$interval', function($interval){

  if(SMS) SMS.startWatch(function(){
    $scope.msg = 'watching started';
  }, function(){
    $scope.msg = 'failed to start watching';
  });

  return {
    check: function(){
        return 'sadsadads';
    }
  };
}])
.factory('Empresa', function(){
  var empresa_data = JSON.parse(localStorage.getItem('empresa'));
  return {
    info: function() {
      return empresa_data;
    },
    logout: function(chat) {
      localStorage.setItem('empresa',"");
    }
  };
})
.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: '+55 95484 8464',
    lastText: 'Lorem ipsum dolor sit amet... ',
  }, {
    id: 1,
    name: '+55 95484 4884',
    lastText: 'Lorem ipsum dolor sit amet...',
  }, {
    id: 2,
    name: '+55 95484 4844',
    lastText: 'Lorem ipsum dolor sit amet...',
  }, {
    id: 3,
    name: '+55 95484 4884',
    lastText: 'Lorem ipsum dolor sit amet...',
  }, {
    id: 4,
    name: '+55 98484 4846',
    lastText: 'Lorem ipsum dolor sit amet...',
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
