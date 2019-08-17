const app = angular.module('myTinyHomes', []);

app.controller('MainController', ['$http', function($http){

const controller = this;
// this.indexOfEditFormToShow = null;

//======================
// GET ID
//======================
this.getID = (_id) => {
	$http({
		method: 'GET',
		url: '/homes/' + _id
	}).then((response) => {
	this.homes = response.data
	console.log(this.homes);
	}, (error) => {
		console.log(error);
	})
}

//======================
// INCLUDES
//======================

this.includePath = 'partials/cards.html'
	this.changeInclude = (path) => {
		this.includePath = 'partials/' + path + '.html'

	}

this.includeHeaderPath = 'partials/auth-buttons.html'
	this.changeHeaderPath = (path) => {
		this.includeHeaderPath = 'partials/' + path + '.html'
		console.log();
	}


//======================
// INDEX/GET ROUTE
//======================
this.getHomes = () => {
  	$http({
		method: 'GET',
		url: '/homes'
	}).then((response) => {
		this.homes = response.data
		// console.log(this.homes)
	}, (error) => {
		console.log(error);
	})
	// return this.homes
  }

//======================
// CREATE ROUTE
//======================
 this.addHome = () => {
    $http({
       method: 'POST',
       url: '/homes',
       data: {
          name: this.name,
		  type: this.type,
          builder: this.builder,
		  description: this.description,
          price: this.price,
		  image: this.image,
          mobile: this.mobile,
		  sqft: this.sqft,
          beds: this.beds,
		  baths: this.baths,
		  lofts: this.lofts,
       }
    }).then(
       (response) => {
          this.resetForm();
          this.getHomes();
       }, (error) => {
          console.log(error);
       })
 };

//======================
// EDIT ROUTE
//======================
this.editHome = (_id) => {
   $http({
      method: 'PUT',
      url: '/homes/' + _id,
      data: {
		 name: controller.updatedName,
 		 type:  controller.updatedType,
 		 builder:  controller.updatedBuilder,
 		 description:  controller.updatedDescription,
 		 price:  controller.updatedPrice,
 		 image:  controller.updatedImage,
 		 mobile:  controller.updatedMobile,
		 sqft: controller.updatedSqft,
 		 beds:  controller.updatedBeds,
 		 baths:  controller.updatedBaths,
 		 lofts:  controller.updatedLofts,
      }
   }).then(
      (response) => {
		  console.log(this.updatedMobile)
			this.getID(_id);
      }
   )
};

//======================
// CANCEL EDIT
//======================
// this.cancelEdit = () => {
// 	this.indexOfEditFormToShow = null;
// }

//======================
// DELETE ROUTE
//======================
   this.deleteHome = (_id) => {
      $http({
         method: 'DELETE',
         url: '/homes/' + _id
      }).then(
         (response) => {
            controller.getHomes();
         }
      )
   };

 //======================
 // AUTHENTIFICATION
 //======================

 this.createUser = function(){
   $http({
     method:'POST',
     url:'/users',
     data:{
		firstName:this.firstName,
		lastName:this.lastName,
	    username:this.username,
	    password:this.password,
		email:this.email,
		profileImage:this.profileImage
     }
 }).then((response) => {
	   controller.firstName = null
  	   controller.lastName = null
  	   controller.username = null
  	   controller.password = null
  	   controller.email = null
  	   controller.profileImage = null
       console.log(response);
   })
 }

 this.logIn = function(){
   $http({
     method:'POST',
     url:'/sessions',
     data: {
       username:this.username,
       password:this.password
     }
   }).then(
     function(response){
       console.log(response);
       controller.username = null;
       controller.password = null;
       controller.goApp();
     },
     function(error){
       console.log(error);
     }
   )
 }

 this.logOut = function(){
   $http({
     method:'DELETE',
     url:'/sessions'
   }).then(
     function(response){
       console.log(response);
       controller.loggedInUsername = null;
     },
     function(error){
       console.log(error);
     }
   )
 }

 this.goApp = function(){
   $http({
     method:'GET',
     url:'/app'
   }).then(
     function(response){
       controller.loggedInUsername = response.data.username;
     },
     function(error){
       console.log(error);
     }
   )
 }


// Call on page load:
this.getHomes()

}]);
