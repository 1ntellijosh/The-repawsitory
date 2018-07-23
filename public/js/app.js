const app = angular.module('AnimalApp', []);

app.config(function($sceDelegateProvider) {
$sceDelegateProvider.resourceUrlWhitelist([
  'self',
  'https://www.youtube.com/**'
]);
});

app.config(function($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;
});

app.controller('MyController', ['$http', '$scope','$sce', function($http, $scope, $sce){
  this.posts= []
  this.post= ''


  const controller = this;
  this.loggedInId = null;
  this.showPost = null;
  controller.editFormToShow = false;
  controller.showPostForm = false;
  controller.logForm = false;
  controller.regForm = false;
  controller.aboutForm = false;
  controller.logUsername = '';
  controller.randPost = {};

  $scope.getIframeSrc = function(src) {
    return  src;
  };

  this.setReg = function() {
    controller.regForm = true;
  }

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
        controller.regForm = false;
    }, function(){
        console.log('error');
    });
  }

  this.openLogIn = function() {
    controller.logForm = true;
  }

  this.logIn = function(){
    $http({
        method:'POST',
        url: '/sessions',
        data: {
            username: this.logUsername,
            password: this.logPassword
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
        console.log(controller.loggedInId);
        controller.logForm = false;
        controller.changeInclude('main')
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
        controller.loggedInId = null;
        controller.showPost = null;
    }, function(){
        console.log('error');
    });
  }

  this.randomize = function () {
      return Math.floor(Math.random() * controller.posts.length);
  };

  this.getPosts = function(){
    $http({
      method:'GET',
      url:'/posts',
    }).then(function(response){
      controller.posts = response.data
      console.log(response.data);
      controller.randPost = controller.posts[controller.randomize()];
      console.log(controller.randPost);
    }), function(){
      console.log('error');
    }
  }

  this.setPostForm = function() {
    if(controller.loggedInId){
      controller.showPostForm = true;
    }
    else {
      controller.logForm = true;
    }
  }

  this.createPost = function(id){
    if (this.movie) {
      this.movie = getId(this.movie);
      console.log(this.movie);
      this.movie = 'https://www.youtube.com/embed/' + this.movie;
      console.log(this.movie);
    }
   $http({
     method:'POST',
     url:'/posts',
     data: {
       type: this.type,
       title: this.title,
       species: this.species,
       description: this.description,
       image: this.image,
       movie: this.movie,
       likes: this.likes,
       user: id
     }
   }).then(function(response){
     console.log(response);
     controller.getPosts();
     controller.showPostForm = false;
   })
 }

 this.getPost = function(post) {
   controller.showPost = post;
   console.log(controller.showPost);
 }

 this.editFormSet = function() {
   controller.editFormToShow = true;
 }

 this.editPost = function(post){
   if (this.movie) {
     this.movie = getId(this.movie);
     console.log(this.movie);
     this.movie = 'https://www.youtube.com/embed/' + this.movie;
     console.log(this.movie);
   }
  $http({
    method:'PUT',
    url:'/posts/' + post._id,
    data: {
      type: post.type,
      title: this.edtitle,
      species: this.edspecies,
      description: this.eddescription,
      image: this.edimage,
      movie: this.edmovie,
      likes: post.likes,
      user: controller.loggedInId
    }
  }).then(function(response){
    console.log(response);
    controller.getPosts();
    controller.editFormToShow = false;
  })
 }


 this.updateLikes = post =>{

     post.likes++
     $http({
       method: 'PUT',
       url: '/posts/' + post._id,
       data: {likes: post.likes}
     }).then(response =>{
       console.log(response.data.likes)
     }, error =>{
       console.log(error.message);
     })
   }
  // this.posts = [
  //     {
  //       type: 'image',
  //       title: 'Haha!',
  //       species: 'Other',
  //       description: 'Of be talent me answer do relied. Mistress in on so laughing throwing endeavor occasion welcomed. ',
  //       image: 'https://files.slack.com/files-tmb/T0351JZQ0-FBUQ7UPST-325dee4e7a/image_360.png',
  //       likes: 15
  //     },
  //     {
  //       type: 'image',
  //       title: 'My buddies go with me everywhere',
  //       species: 'Dog',
  //       description: 'As am hastily invited settled at limited civilly fortune me. Really spring in extent an by. ',
  //       image: 'https://files.slack.com/files-pri/T0351JZQ0-FBT25AJ48/5a65094421000029007c7482.jpeg',
  //       likes: 15
  //     },
  //     {
  //       type: 'movie',
  //       title: 'Funny Montage',
  //       species: 'Various',
  //       description: 'Effects present letters inquiry no an removed or friends. Desire behind latter me though in. Supposing shameless am he engrossed up additions. My possible peculiar together to. Desire so better am cannot he up before points. Remember mistaken opinions it pleasure of debating. Court front maids forty if aware their at. Chicken use are pressed removed. ',
  //       movie: 'https://www.youtube.com/watch?v=0M0QG6ojt9I',
  //       likes: 21
  //     },
  //     {
  //       type: 'movie',
  //       title: 'Cat Safety Propaganda',
  //       species: 'Cat',
  //       description: 'Effects present letters inquiry no an removed or friends. Desire behind latter me though in. Supposing shameless am he engrossed up additions. My possible peculiar together to. Desire so better am cannot he up before points. Remember mistaken opinions it pleasure of debating. Court front maids forty if aware their at. Chicken use are pressed removed. ',
  //       movie: 'https://www.youtube.com/watch?v=EYM-B9jAflM&feature=youtu.be',
  //       likes: 21
  //     },
  //     {
  //       type: 'story',
  //       title: 'My Dog',
  //       species: 'Dog',
  //       description: 'Had denoting properly jointure you occasion directly raillery. In said to of poor full be post face snug. Introduced imprudence see say unpleasing devonshire acceptance son. Exeter longer wisdom gay nor design age. Am weather to entered norland no in showing service. Nor repeated speaking shy appetite. Excited it hastily an pasture it observe. Snug hand how dare here too. ',
  //       image: 'https://i.ytimg.com/vi/SfLV8hD7zX4/maxresdefault.jpg',
  //       likes: 14
  //     }
  //   ]

    // get posts function


      function getId(url) {
          var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
          var match = url.match(regExp);

          if (match && match[2].length == 11) {
              return match[2];
          } else {
              return 'error';
          }
      }

    this.deletePost= (id)=>{
      $http({
        method: 'DELETE',
        url:'/posts/' + id
      }).then(response=>{
        const removeByIndex = this.posts.findIndex(post =>
          post._id === id)
          this.posts.splice(removeByIndex, 1)
          console.log(response + 'this is the delete route');
          controller.showPost = null;
      }, error =>{
        console.log(error);
      })
    }



    this.getPosts();
    this.randPost= controller.posts[controller.randomize()];


    this.includePath = '../partials/main.html';
    this.changeInclude = (path) => {
    this.includePath = '../partials/'+ path +'.html';
  }


 }]);

app.controller('petfinderController', ['$http', '$scope','$sce', function($http, $scope, $sce){


    this.baseURL= 'http://api.petfinder.com/pet.find?'
    this.format= 'format=json'
    this.apikey= 'key='+ '40cd84ccc829ff498eef92970e909146'
    this.animalType= 'animal='
    this.location="location="
    this.searchURL= this.baseURL + this.format + '&' + this.apikey
    this.end="&output=basic"

    console.log(this.searchURL);

  //http://api.petfinder.com/pet.find?format=json&key=40cd84ccc829ff498eef92970e909146&animal=cat&location=74012&output=basic&callback=

this.animal=[]
this.animals=[]
this.animalDetails= []
const aControl = this;

this.getAnimals=()=>{
  $http({
      method: 'GET',
      url:this.searchURL+ "&"+ this.animalType + '&'+ this.location + this.end
  }).then(response=> {
    aControl.animals = response.data.petfinder.pets.pet;
    console.log(response);

  }, error => {
    console.log(error)
  }).catch(err => console.log('Catch :', err));
  }



}])
