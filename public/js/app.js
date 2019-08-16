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




// Call on page load:
this.getHouses()

}]);
