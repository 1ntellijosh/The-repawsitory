//******************/
// ANGULAR CONTROLLER FILE
//******************/

//**** DECLARE ANGULAR APP ****\\
const app = angular.module('AnimalApp', []);

//**** WHITELIST YOUTUBE DOMAIN FOR RENDERING ON PAGE ****\\
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

//**** MAIN CONTROLLER ****\\
app.controller('MyController', ['$http', '$scope','$sce', function($http, $scope, $sce){
  this.posts= []
  this.post= ''

  // Browsing variables for browsing state changes to page render
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
  controller.adoptForm = false;
  controller.links = false;

  //**** APP METHODS ****\\

  // Capture source for Youtube
  $scope.getIframeSrc = function(src) {
    return  src;
  };
  // set regForm variable to true to render register form on page
  this.setReg = function() {
    controller.regForm = true;
  }
  // Api call to create user in db on register
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
        // close register form render on page
        controller.regForm = false;
    }, function(){
        console.log('error');
    });
  }
  // set logForm variable to true render login form on page
  this.openLogIn = function() {
    controller.logForm = true;
  }
  // api call to log user in and set user session
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
        // call goApp function to pull loggedin user id and set loggedInId vaiable to true (used for permissions/ renders on page)
        controller.goApp();
    }, function(){
        console.log('error');
    });
  }
  // Pull user session information from the back and set loggedInId vaiable to true (used for permissions/ renders on page
  this.goApp = function(){
    const controller = this; //add this
    $http({
        method:'GET',
        url: '/app'
    }).then(function(response){
        controller.loggedInId = response.data._id;
        console.log(controller.loggedInId);
        // close login form render on page
        controller.logForm = false;
        controller.changeInclude('main')
    }, function(){
        console.log('error');
    });
  }
  // api call to log user session of on back end
  this.logOff = function(){
    $http({
        method:'DELETE',
        url: '/sessions'
    }).then(function(response){
        console.log(response);
        // close logged in user view on page and loggedInId variable to null
        controller.loggedInId = null;
        controller.showPost = null;
    }, function(){
        console.log('error');
    });
  }
  // Randomize function to find a random featured post to display on front page (when a user isn't logged in)
  this.randomize = function () {
      return Math.floor(Math.random() * controller.posts.length);
  };
  // Api call to get all posts made from the db to render on page
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
  // Sets the logged in view for page. if the loggedInId variable is turned off, render login form instead
  this.setPostForm = function() {
    if(controller.loggedInId){
      controller.showPostForm = true;
    }
    else {
      controller.logForm = true;
    }
  }
  // Method to prepare and add post to db
  this.createPost = function(id){
    // If post type is Youtube movie, the url will be parsed for the youtube id only. full url will be parsed later for render on page
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
     // Pull all posts again to include the new post
     controller.getPosts();
     // render full rollout of all posts
     controller.showPostForm = false;
   })
 }
 // Render the clicked post to display on featuredPost render at the top of main content
 this.getPost = function(post) {
   controller.showPost = post;
   console.log(controller.showPost);
 }
 // Set editFormToShow variable to true to render edit form on page
 this.editFormSet = function() {
   controller.editFormToShow = true;
 }
 // Method to prepare and send edited post to db
 this.editPost = function(post){
   // If post type is Youtube movie, the url will be parsed for the youtube id only. full url will be parsed later for render on page
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
    // Pull all posts again to include the new post
    controller.getPosts();
    // render full rollout of all posts
    controller.editFormToShow = false;
  })
 }
 // Set aboutForm variable to true to render about on page
 this.setAbout = function() {
   controller.aboutForm = true;
 }
 // Set adoptForm variable to true to render PetFinder on page
 this.setAdopt = function() {
   controller.adoptForm = true;
 }
 // Set links variable to true to render links on page
 this.setLinks = function() {
   controller.links = true;
 }
 // turn off all browsing variables and set render to main page
 this.goHome = function() {
   controller.editFormToShow = false;
   controller.showPostForm = false;
   controller.logForm = false;
   controller.regForm = false;
   controller.adoptForm = false;
   controller.links = false;
   controller.changeInclude('main');
 }
 // Method to add likes to post
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

   //**** DUMMY POST DATA USED FOR DEVELOPMENT ****\\

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

      // Pull ID from youtube url. Used for movie render control on page. (Some forms of Youtube urls are not compatible on AngularJS)
      function getId(url) {
          var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
          var match = url.match(regExp);

          if (match && match[2].length == 11) {
              return match[2];
          } else {
              return 'error';
          }
      }
    // Method to make api call to delete a post (only creating user can delete their own post.)
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

    //**** FUNCTION CALLS ON PAGE LOAD ****\\

    // Grab all posts from db on page load.
    this.getPosts();
    // Find one random post from results to display on front page when not logged in.
    this.randPost= controller.posts[controller.randomize()];

    // show main page on page load.
    this.includePath = '../partials/main.html';
    // Method to changes renders of partials
    this.changeInclude = (path) => {
    this.includePath = '../partials/'+ path +'.html';
  }
}]);
// PetFinder API controller. Not used in launched site. Petfinder.js script file used instead.
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
