const app = angular.module('myTinyHomes', []);

app.controller('MainController', ['$http', function($http){

const controller = this;
// this.indexOfEditFormToShow = null;

//=======================
// UPDATE USER FAVORITES
//=======================
this.getFavorites = () => {
  $http({
    method: "GET",
    url: "/users/" + controller.currentUser._id,
  }).then((response)=>{
    console.log(response.data);

  })
}

this.updateUserFavorites = (userID, home) => {
	let newFavoritesArr = controller.currentUser.favorites
	newFavoritesArr.push(home)
	$http({
       method: 'PUT',
       url: '/users/' + userID,
       data: {
		   favorites: newFavoritesArr
	   }
	}).then(
       (response) => {
       }
    )
}

this.removeFavorite = (userID, favorite) => {
  let newFavoritesArr = controller.currentUser.favorites
  let index = newFavoritesArr.indexOf(favorite);
  newFavoritesArr.splice(index, 1);
	$http({
       method: 'PUT',
       url: '/users/' + userID,
       data: {
		   favorites: newFavoritesArr
	   }
	}).then(
       (response) => {
       }
    )
}

this.showFavorites = () => {
	if (controller.currentUser.favorites.length > 0){
		return true
	} else {
		return false
	}
}
//=======================
// TOGGLE SORT HOMES
//=======================
this.propertyName = 'name'
this.reverse = false;
this.message = ""

this.sortBy = (newName) => {
	if (controller.propertyName === newName) {
		controller.reverse = !controller.reverse
	}
	controller.propertyName = newName;
	if (!controller.reverse){
		controller.message = "Low to High"
	} else {
		controller.message = "High to Low"
	}
}



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

if (this.loggedInUsername == null){
  this.includeHeaderPath = 'partials/auth-buttons.html'
} else {
this.includeHeaderPath = 'partials/auth-view.html'
}

	this.changeHeaderPath = (path) => {
		this.includeHeaderPath = 'partials/' + path + '.html'
		console.log();
	}


this.returnHome = () => {
	controller.goApp();
	controller.getHomes();
	controller.changeInclude('cards')
	if (controller.currentUser) {
	controller.changeHeaderPath('auth-view')
} else {
	controller.changeHeaderPath('auth-buttons')
}
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
	let currentUserEmail = controller.currentUser.email

    $http({
       method: 'POST',
       url: '/homes',
       data: {
          name: controller.name,
		  type: controller.type,
          builder: currentUserEmail,
		  description: controller.description,
          price: controller.price,
		  image: controller.image,
          mobile: controller.mobile,
		  sqft: controller.sqft,
          beds: controller.beds,
		  baths: controller.baths,
		  lofts: controller.lofts,
       }
    }).then(
       (response) => {
		  console.log(response.data.builder);
          controller.getHomes();

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
		  // console.log(this.updatedMobile)
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

 this.createUser = () => {
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
	controller.logIn()
	controller.goApp();
	controller.returnHome()
	controller.getHomes();
	controller.firstName = null
  	controller.lastName = null
  	controller.username = null
  	controller.password = null
  	controller.email = null
  	controller.profileImage = null

   })
 }

 this.logIn = () => {
   $http({
     method:'POST',
     url:'/sessions',
     data: {
       username:controller.username,
       password:controller.password
     }
 	}).then((response) => {

       // console.log(response);
       controller.username = null;
       controller.password = null;
       controller.goApp();
	   controller.changeHeaderPath('auth-view');
	   controller.changeInclude('cards')
	   controller.getHomes();
   },(error) => {
       console.log(error);
	   controller.changeInclude('blank')
	   controller.changeHeaderPath('page404');
     }
   )
 }

 this.logOut = function(){
   $http({
     method:'DELETE',
     url:'/sessions'
   }).then(
     function(response){
       // console.log(response);
       controller.changeHeaderPath('auth-buttons');
	   controller.changeInclude('cards');
       controller.loggedInUsername = null;
	   location.reload()
     },
     function(error){
       console.log(error);
     });

 }

 this.goApp = function(){
   $http({
     method:'GET',
     url:'/users'
   }).then(
     function(response){

       if(response.data.currentUser){

          controller.currentUser = response.data.currentUser;
          controller.profileImage = String(response.data.currentUser.profileImage);
          controller.changeHeaderPath('auth-view');

       } else {

         controller.changeHeaderPath('auth-buttons');

       }
     },
     function(error){
       console.log(error);
     }
   );
 };


// Call on page load:
  this.getHomes();
  this.goApp();
}]);
