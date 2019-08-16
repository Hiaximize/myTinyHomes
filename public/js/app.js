const app = angular.module('MyApp', []);

app.controller('MyController', ['$http', function($http){

   const controller = this;
   this.indexOfEditFormToShow = null;

//======================
// CANCEL EDIT
//======================
this.cancelEdit = () => {
	this.indexOfEditFormToShow = null;
}

//======================
// INDEX/GET ROUTE
//======================
this.getHouses = () => {
  	$http({
		method: 'GET',
		url: '/houses'
	}).then((response) => {
		this.houses = response.data
		console.log(this.houses)
	}, (error) => {
		console.log(error);
	})
  }

//======================
// CREATE ROUTE
//======================
 this.addHouse = () => {
    $http({
       method: 'POST',
       url: '/houses',
       data: {
          name: this.name,
		  type: this.type,
          builder: this.builder,
		  description: this.description,
          price: this.price,
		  image: this.image,
          mobile: this.mobile,
          beds: this.beds,
		  baths: this.baths,
		  lofts: this.lofts,
       }
    }).then(
       (response) => {
          this.resetForm();
          this.getHouses();
       }, (error) => {
          console.log(error);
       })
 };


 //======================
 // AUTHENTIFICATION
 //======================

 // this.createUser = function(){
 //   $http({
 //     method:'POST',
 //     url:'/users',
 //     data:{
 //       username:this.username,
 //       password:this.password
 //     }
 //   }).then(
 //     function(response){
 //       controller.username = null;
 //       controller.password = null;
 //       console.log(response);
 //     },
 //     function(error){
 //       console.log(error);
 //     }
 //   )
 // }
 //
 // this.logIn = function(){
 //   $http({
 //     method:'POST',
 //     url:'/sessions',
 //     data: {
 //       username:this.username,
 //       password:this.password
 //     }
 //   }).then(
 //     function(response){
 //       console.log(response);
 //       controller.username = null;
 //       controller.password = null;
 //       controller.goApp();
 //     },
 //     function(error){
 //       console.log(error);
 //     }
 //   )
 // }
 //
 // this.logOut = function(){
 //   $http({
 //     method:'DELETE',
 //     url:'/sessions'
 //   }).then(
 //     function(response){
 //       console.log(response);
 //       controller.loggedInUsername = null;
 //     },
 //     function(error){
 //       console.log(error);
 //     }
 //   )
 // }
 //
 // this.goApp = function(){
 //   $http({
 //     method:'GET',
 //     url:'/app'
 //   }).then(
 //     function(response){
 //       controller.loggedInUsername = response.data.username;
 //     },
 //     function(error){
 //       console.log(error);
 //     }
 //   )
 // }

// Call on page load:
this.getHouses()

}]);
