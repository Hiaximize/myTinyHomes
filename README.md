# My Tiny Home
link to live site: https://my-tiny-home.herokuapp.com/

## Collaborators
* **Derek Martin Barker** - (https://github.com/Hiaximize)
* **Jiha Hwang** - (https://github.com/jhwangit128)
* **Danielle Walraven** - (https://github.com/dwalraven21)

## About
My Tiny Home is a Marketplace Web App that allows users to post tiny homes for sale and contact sellers to purchase tiny homes.

## Motivation
We're millennials. We just love tiny homes!

## Wireframes & Screenshots

![Authenticated Wireframe](https://raw.githubusercontent.com/Hiaximize/myTinyHomes/master/public/screenshots/Authenticated_view.png)

![Authenticated View](https://raw.githubusercontent.com/Hiaximize/myTinyHomes/master/public/screenshots/auth-view.png)

![Unauthenticated Wireframe](https://raw.githubusercontent.com/Hiaximize/myTinyHomes/master/public/screenshots/Unauthenticated_view.png)

![Unauthenticated View](https://raw.githubusercontent.com/Hiaximize/myTinyHomes/master/public/screenshots/unauth-view.png)

![Unauthenticated Details View](https://raw.githubusercontent.com/Hiaximize/myTinyHomes/master/public/screenshots/Unauthenticated_detail_view.png)

![Unauthenticated Details View](https://raw.githubusercontent.com/Hiaximize/myTinyHomes/master/public/screenshots/unauth-show.png)

## User Stories

* Users should be able to view available tiny houses and prices before signing up or logging in the site

* Users should be able to click on any available house to view more details about the house and see an option to "sign in and contact lister" if they are not logged in or "contact lister" if they are logged in (authenticated).

* Users should be able to search all homes for certain key phases or sort the homes by price (from high-low or low-high).

* Users should be able to log in or sign up to have more site access.

## Home Sellers
* Authenticated Users should be able to list a house for sale and then edit or delete that house later. The user who posted the house should have their email automatically associated with the listing, so another user can contact them later.

## Home Buyers
* Authenticated Users should be able to contact the lister for any particular house.

* Authenticated Users should be able to save houses as favorites. Favorite houses should populate about the rest of the houses in a favorites section.

* Authenticated Users should be able to remove houses as favorites.

## Challenges / Example Code

### Sorting
One challenge we faced was implementing a sort feature to sort the homes by price from low-high and high to low.

We accomplished this inside our ng-repeat that displays all of the available houses:

```HTML
<div ng-repeat="home in ctrl.homes | filter: searchbox | orderBy: ctrl.propertyName:ctrl.reverse" class="col s12 m6 l4 xl3">
```
You'll notice that after orderBy: there is a variable called "propertyName". Let's look at our JS file to see what propertyName refers to.

```JavaScript
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
```

propertyName is initially set to the value "name". This means that on page load the properties will sort by 'name', but when we call the function sortBy(), that value can be changed to something else, in our case "price". The sort can also be reversed if the same function is called with the same parameter again.

Now let's look at the button that sorts the price. For better user experience, it also includes a message which changes to indicate if we are sorting high-to-low or low-to-high.

```HTML
<button id="sortButton" ng-click="ctrl.sortBy('price')">Sort By Price: {{ctrl.message}}</button>

<!-- <button id="sortButton" ng-click="ctrl.sortBy('sqft')">Sort By Sqft {{ctrl.message}}</button> -->
```
You'll notice we commented out another button for sorting the sqft. This button worked exactly the same way, but we felt it was slightly redundant, as when you order by price, you tend to also order by sqft, because of the nature of home pricing.

### Storing Favorites

Another challenge was allowing the user to store favorite houses.

We accomplished this by first adding a value to the user model called favorites that would contain an empty array.

Then we used a PUT route to allow the user to update their own user model whenever they select a new favorite. We used the function updateUserFavorites which takes the parameters userID and home. If they have an existing favorites array, it first stores that data in the variable newFavoritesArr and then pushes the new object, the selected home, into the array. The nice thing about this is that the home object already contains all the information we need to access later (name, price, sqft, type, etc.)

```JavaScript
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
```
Here's the AngularJS syntax to add a home as a favorite on click

```HTML
<a ng-click="ctrl.updateUserFavorites(ctrl.currentUser._id, home); ctrl.getHomes(); ctrl.getFavorites()" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">favorite_border</i></a>
```

Then we used a GET Route to access those favorites

```JavaScript
this.getFavorites = () => {
  $http({
    method: "GET",
    url: "/users/",
  }).then((response)=>{
    this.favorites = response.currentUser.favorites
  })
}

```
and an ng-repeat to make them appear in a favorites section about the other content.

```HTML
<div ng-if="ctrl.currentUser" class="row">
<div ng-if="ctrl.showFavorites()">
	<h3>My Favorite Homes</h3>
	<div ng-repeat="favorite in ctrl.currentUser.favorites | orderBy: ctrl.propertyName:ctrl.reverse" class="col s12 m6 l4 xl3">
```

We also want the user to be able to remove or delete a favorite. For this we used splice instead of push, to remove the specific home from the array.

```JavaScript
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
		   this.getFavorites()
       }
    )
}
```

Here's the AngularJS syntax to make this happen on click
```HTML
<a ng-click="ctrl.removeFavorite(ctrl.currentUser._id, favorite); ctrl.getFavorites()" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">favorite</i></a>
```

In order to make the favorites section disappear when the user has no favorites, we added this showFavorites function.

```JavaScript
this.showFavorites = () => {
	if (controller.currentUser.favorites.length > 0){
		return true
	} else {
		return false
	}
}
```
There is still more functionality to be desired here. One problem that we still need to fix is that when a buyer updates the home, it updates in the available homes section but not the favorites section. This is because that user favorites are stored in a separate array within the user data.

## Future Improvements

Our original plan with this app was to allow users to actually use PayPal to buy and sell blueprints for properties. To do this, we would implement PayPal Sandbox which required OAuth 2.0. Unfortunately, we haven't learned to use OAuth 2.0 yet, so it would have required some extensive research and since we only had a few days to put this project together, that wasn't realistic for the timeframe we had been given. However, all of us have the goal of learning OAuth and still see the potential for implementing it in this project.

Another possible feature we could add, would be an embedded google map that shows the location of each home. Again, in this case we simply ran out of time, but hope to implement this in the future.

## Just For Fun

We love the way our "modal" forms turned out! Hope you enjoy them too.

![SignUp](https://raw.githubusercontent.com/Hiaximize/myTinyHomes/master/public/screenshots/signup.png)

![SignIn](https://raw.githubusercontent.com/Hiaximize/myTinyHomes/master/public/screenshots/login.png)

![401](https://raw.githubusercontent.com/Hiaximize/myTinyHomes/master/public/screenshots/oops.png)

![New Home](https://raw.githubusercontent.com/Hiaximize/myTinyHomes/master/public/screenshots/new-home.png)

## Deployment

* Deployed with Heroku and MongoDB Atlas

## Tech/frameworks used

* MongoDB / Mongoose
* Express
* AngularJS
* Node.js
* Materialize (CSS framework)
* bcrypt (password hashing function)
* Using RESTful Routes, full CRUD, MVC
* This is a single-page application


## Acknowledgments

* Inspiration and seed data used in prototype were taken from <a href="https://tinyhouselistings.com">Tiny House Listings</a>.
