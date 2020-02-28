#### Requirements
> We have all been there. Picking a restaurant can sometimes be a daunting task. Even with Yelp, it is never easy. The endless variables, from cuisine, price, and location to rating and hours, can be overwhelming.
> 
> Imagine you had the chance to create a web application that might make this process easier and more intuitive? How do you think you'd go about creating such an app?

1. Submit a deployed web application and include both your website URL and the supporting Github repository.
	- netlify
	- github pages
	- s3?
2. The app must use Yelp's Fusion API
	- get api key
3. Your app should be able to plot merchants on a map
	- authenticate
		- https://www.yelp.com/developers/documentation/v3/authentication
	- get data
		- https://github.com/Yelp/yelp-fusion/tree/master/fusion/node
		- https://www.yelp.com/developers/documentation/v3/business_search
			- gives long, lat
		- https://vuejs.org/v2/cookbook/using-axios-to-consume-apis.html
			- official tutorial
		- fields for seaching
			- on map: name, category, location (and radius), open now
	- displaying map
		- https://developers.google.com/maps/documentation/javascript/marker-clustering
			- allows shading, grouping, image modes
		- needs api key
4. Your app should be able to obtain user location via HTML5 Geolocation
	- https://www.w3schools.com/html/html5_geolocation.asp
	- only works with https? (might be a problem with hosting)


#### Extras
1. Display trends and stats about popular cuisines, quality cuisines, etc.
2. Create a chat bot
3. Unique and interactive user interface

4. "Similar places to ___"
5. "Give me a random recommendation" (I'm feeling lucky)
6. Find places that are "hot_and_new" or or have "deals"/"cashback" (on business search api page)
7. Use other APIs
	- Twitter!


#### Code
- Components
	- graph
	- data getter/helper?
- Views
	- home
	- about
	- map search?
	- recommendation? (can "display trends and stats about merchants")
	- chartjs


#### TODO
- Change favicon
- Use bootstrap theme (yelp's red color?)


#### Other
- eslint: ```node ./node_modules/eslint/bin/eslint.js --fix src/views/Home.vue```
- Hours: 2/22 (1), 2/23 (2), 2/24 (2), 2/25 (1)