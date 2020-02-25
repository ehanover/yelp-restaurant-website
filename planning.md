### Requirements
1. Submit a deployed web application and include both your website URL and the supporting Github repository.
	netlify
	github pages
	s3?
2. The app must use Yelp's Fusion API
	get api key
3. Your app should be able to plot merchants on a map
	authenticate
		https://www.yelp.com/developers/documentation/v3/authentication
	get data
		https://github.com/Yelp/yelp-fusion/tree/master/fusion/node
		https://www.yelp.com/developers/documentation/v3/business_search
			gives long, lat
		https://vuejs.org/v2/cookbook/using-axios-to-consume-apis.html
			official tutorial
		fields for seaching
			name, category, location (and radius), open now
	displaying map
		https://developers.google.com/maps/documentation/javascript/marker-clustering
			allows shading, grouping, image modes
		needs api key
4. Your app should be able to obtain user location via HTML5 Geolocation
	https://www.w3schools.com/html/html5_geolocation.asp
	only works with https?


### Extras
1. Display trends and stats about popular cuisines, quality cuisines, etc.
2. Create a chat bot
3. Unique and interactive user interface

4. "Similar places to ___"
5. "Give me a random recommendation"


### Code
Components
	graph
	data getter/helper?
Views
	home
	about
	map search?
	recommendation? (can "display trends and stats about merchants")


### TODO
Change favicon
Use bootstrap theme (yelp's red color?)


### Other
eslint: ```node ./node_modules/eslint/bin/eslint.js --fix src/views/Home.vue```
Hours: 2/22 (1), 2/23 (2), 2/24 (2)