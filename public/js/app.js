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
        controller.loggedInId = response.data._id;
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

  this.posts = [
      {
        type: 'image',
        title: 'Haha!',
        species: 'Other',
        description: 'Of be talent me answer do relied. Mistress in on so laughing throwing endeavor occasion welcomed. ',
        image: 'https://files.slack.com/files-tmb/T0351JZQ0-FBUQ7UPST-325dee4e7a/image_360.png',
        likes: 15
      },
      {
        type: 'image',
        title: 'My buddies go with me everywhere',
        species: 'Dog',
        description: 'As am hastily invited settled at limited civilly fortune me. Really spring in extent an by. ',
        image: 'https://files.slack.com/files-pri/T0351JZQ0-FBT25AJ48/5a65094421000029007c7482.jpeg',
        likes: 15
      },
      {
        type: 'movie',
        title: 'Funny Montage',
        species: 'Various',
        description: 'Effects present letters inquiry no an removed or friends. Desire behind latter me though in. Supposing shameless am he engrossed up additions. My possible peculiar together to. Desire so better am cannot he up before points. Remember mistaken opinions it pleasure of debating. Court front maids forty if aware their at. Chicken use are pressed removed. ',
        movie: 'https://www.youtube.com/watch?v=0M0QG6ojt9I',
        likes: 21
      },
      {
        type: 'movie',
        title: 'Cat Safety Propaganda',
        species: 'Cat',
        description: 'Effects present letters inquiry no an removed or friends. Desire behind latter me though in. Supposing shameless am he engrossed up additions. My possible peculiar together to. Desire so better am cannot he up before points. Remember mistaken opinions it pleasure of debating. Court front maids forty if aware their at. Chicken use are pressed removed. ',
        movie: 'https://www.youtube.com/watch?v=EYM-B9jAflM&feature=youtu.be',
        likes: 21
      },
      {
        type: 'story',
        title: 'My Dog',
        species: 'Dog',
        description: 'Had denoting properly jointure you occasion directly raillery. In said to of poor full be post face snug. Introduced imprudence see say unpleasing devonshire acceptance son. Exeter longer wisdom gay nor design age. Am weather to entered norland no in showing service. Nor repeated speaking shy appetite. Excited it hastily an pasture it observe. Snug hand how dare here too. ',
        image: 'https://i.ytimg.com/vi/SfLV8hD7zX4/maxresdefault.jpg',
        likes: 14
      }
    ]
    this.randomize= function() {
        return 0.5 - Math.random()

      }


}]);
