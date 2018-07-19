const app = angular.module('AnimalApp', []);

app.controller('MyController', ['$http', function($http){

  const controller = this;

  this.createUser = function(){
    $http({
        method:'POST',
        url: '/users',
        data: {
            username: this.username,
            password: this.password
        }
    }).then(function(response){
        console.log(response);
    }, function(){
        console.log('error');
    });
  }

  this.logIn = function(){
    $http({
        method:'POST',
        url: '/sessions',
        data: {
            username: this.username,
            password: this.password
        }
    }).then(function(response){
        console.log(response);
        controller.goApp();
    }, function(){
        console.log('error');
    });
  }

  this.goApp = function(){
    const controller = this; //add this
    $http({
        method:'GET',
        url: '/app'
    }).then(function(response){
        controller.loggedInUserName = response.data.username;
    }, function(){
        console.log('error');
    });
  }

  this.logOff = function(){
    $http({
        method:'DELETE',
        url: '/sessions'
    }).then(function(response){
        console.log(response);
        controller.loggedInUserName = null;
    }, function(){
        console.log('error');
    });
  }


}]);
