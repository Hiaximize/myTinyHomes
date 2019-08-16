const app = angular.module('myTinyHomes', []);

app.controller('MainController', ['$http', function($http){

const controller = this;
this.indexOfEditFormToShow = null;

//======================
// GET ID
//======================
this.getID = function(home) {
	console.log(home._id);
}

//======================
// INCLUDES
//======================

this.includePath = 'partials/cards.html'
	this.changeInclude = (path) => {
		this.includePath = 'partials/' + path + '.html'
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
		console.log(this.homes)
	}, (error) => {
		console.log(error);
	})
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
this.editHome = function(home) {
   $http({
      method: 'PUT',
      url: '/homes/' + home._id,
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
         controller.getHomes();
         controller.indexOfEditFormToShow = null;
      }
   )
};

//======================
// CANCEL EDIT
//======================
this.cancelEdit = () => {
	this.indexOfEditFormToShow = null;
}

//======================
// DELETE ROUTE
//======================
   this.deleteHome = function(home) {
      $http({
         method: 'DELETE',
         url: '/home/' + home._id
      }).then(
         (response) => {
            controller.getHomes();
         }
      )
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

this.homes = [
	{
		name: "Coastal Tiny House",
	    type: "Tiny House",
	    builder: "dwalraven21",
	    description: "This tiny house can be custom build to order for you. Please inquire if you have questions and are interested in purchasing one for yourself!",
	    price: 79900,
	    image: "https://res.cloudinary.com/tinyhouselistings/image/upload/f_auto,q_auto:eco/e_trim/c_fill,h_592,w_896/IMG_20190501_181714919_HDR_sdc7ph_fz9f6t",
	    mobile: true,
		sqft: 180,
	    beds: 2,
	    baths: 1,
	    lofts: 2,
    },
	{
		name: "Brand New Tiny House",
		type: "Tiny House",
		builder: "dwalraven21",
		description: "This tiny house can be custom build to order for you. Please inquire if you have questions and are interested in purchasing one for yourself!",
		price: 70000,
		image: "https://res.cloudinary.com/tinyhouselistings/image/upload/f_auto,q_auto:eco/e_trim/c_fill,h_592,w_896/rkpTWSlM_azl396",
		mobile: true,
		sqft: 204,
		beds: 2,
		baths: 1,
		lofts: 1,
	},
	{
		name: "Art on Wheels!",
		type: "Tiny House",
		builder: "dwalraven21",
		description: "This tiny house can be custom build to order for you. Please inquire if you have questions and are interested in purchasing one for yourself!",
		price: 14000,
		image: "https://res.cloudinary.com/tinyhouselistings/image/upload/f_auto,q_auto:eco/e_trim/c_fill,h_592,w_896/2DBA2ECE-27E3-47ED-B7EF-7AF770660047_i1q7if",
		mobile: true,
		sqft: 54,
		beds: 1,
		baths: 0,
		lofts: 0,
	},
	{
		name: "Mt. Hood Lodge",
		type: "RV",
		builder: "dwalraven21",
		description: "This tiny house can be custom build to order for you. Please inquire if you have questions and are interested in purchasing one for yourself!",
		price: 106900,
		image: "https://res.cloudinary.com/tinyhouselistings/image/upload/f_auto,q_auto:eco/e_trim/c_fill,h_592,w_896/MtHoodLodge_km38xy",
		mobile: true,
		sqft: 432,
		beds: 2,
		baths: 1,
		lofts: 1,
	},
	{
		name: "NW Mountaineer",
		type: "Tiny House",
		builder: "dwalraven21",
		description: "This tiny house can be custom build to order for you. Please inquire if you have questions and are interested in purchasing one for yourself!",
		price: 45225,
		image: "https://res.cloudinary.com/tinyhouselistings/image/upload/f_auto,q_auto:eco/e_trim/c_fill,h_592,w_896/NWMountaineer_bv1yvc",
		mobile: true,
		sqft: 128,
		beds: 1,
		baths: 1,
		lofts: 1,
	},
	{
		name: "Tiny Traveler",
		type: "Camper",
		builder: "dwalraven21",
		description: "This tiny house can be custom build to order for you. Please inquire if you have questions and are interested in purchasing one for yourself!",
		price: 34500,
		image: "https://res.cloudinary.com/tinyhouselistings/image/upload/f_auto,q_auto:eco/e_trim/c_fill,h_592,w_896/Tiny_Traveler_n28v1y",
		mobile: true,
		sqft: 80,
		beds: 1,
		baths: 1,
		lofts: 1,
	},

	  ]
// Call on page load:
this.getHomes()

}]);
