<template>
  <div class="home">
    <h1>Yelp Merchant Search</h1>

    <div class="container-fluid text-center">
      <div class="row content"> <!-- TODO needed? -->
        <div class="col-sm-2 sidenav">
          <p><a href="#">Link</a></p>
          <p><a href="#">Link</a></p>
          <p><a href="#">Link</a></p>
        </div>
        <div class="col-sm-8 text-left">
          <!-- <h1>Welcome</h1> -->
          <p>To get started, search for merchants below.</p>
          <hr>

          <form>
            <div class="form-group">
              <div class="row">
                <label for="inputSub" class="col-sm-2 col-form-label">Search term: </label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" id="inputSearch" v-model="searchOptionTerm" placeholder='"Starbucks" or "mexican food"'>
                </div>
                <button type="submit" class="btn btn-primary col-sm-1" v-on:click="getCloseMerchants()">Search</button>
              </div>
              <div class="row">
                <label class="form-check-label" for="searchOptionOpenNowId">Only Open Now: </label>
                <input type="checkbox" id="searchOptionOpenNowId" v-model="searchOptionOpenNow">

                <label class="form-range-label" for="searchOptionRadiusId">Search Radius: {{searchOptionRadius}} miles</label>
                <input type="range" min="1" max="25" id="searchOptionRadiusId" v-model="searchOptionRadius">

                <label class="form-check-label" for="searchOptionSortId">Sort By: </label>
                <div id="searchOptionSortId">
                  <select class="form-control" v-model="searchOptionSortByChoice">
                    <option v-for="(option,index) in searchOptionSortByChoices" :key="index">{{ option }}</option>
                    <!-- .replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) -->
                  </select>
                </div>

              </div>
            </div>
            <!-- <div class="form-group row">
              <label><input type="checkbox" :value="searchOptionOpenNow">Only Open Now</label>
              <label><input type="range" :value="searchOptionRadius">Search Radius</label>
            </div> -->
          </form>

          <my-map ref="map"></my-map>
          <button type="submit" class="btn btn-primary" v-on:click="speak()">Speak</button>
          <h5>Click on a pin on the map above to see details</h5>
          <!-- <h4 v-if="$refs.map !== undefined">Currently selected: {{ $refs.map.selectedId }}</h4> -->
        </div>
        <div class="col-sm-2 sidenav">
          <p><a href="#">Link</a></p>
          <p><a href="#">Link</a></p>
          <p><a href="#">Link</a></p>
          <div class="well">
            <p>ADS</p>
          </div>
          <div class="well">
            <p>ADS</p>
          </div>
        </div>
      </div>
    </div>

    <h4>Bottom Text</h4>

  </div>
</template>

<style scoped>
#searchOptionRadiusId {
  width: 400px;
}
</style>

<script>

import { YelpApiKey } from '../credentials'
import MyMap from '../components/MyMap.vue'
import axios from 'axios'

export default {
  components: {
    'my-map': MyMap
  },
  data () {
    return {
      corsAnywherePrefix: 'https://cors-anywhere.herokuapp.com/',

      position: null,
      searchOptionTerm: '',
      searchOptionRadius: 10,
      searchOptionOpenNow: false,
      searchOptionSortByChoices: ['best_match', 'rating', 'review_count', 'distance'],
      searchOptionSortByChoice: 'best_match'
    }
  },

  mounted () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setLocation)
      // function (pos) {
      // console.log('Got location!')
      // this.position = pos
      // this.$refs.map.refocus(pos.coords.latitude, pos.coords.longitude, 12)
      // })
    } else {
      console.error('Error retrieving geolocation')
    }

    axios.defaults.headers.common.Authorization = 'Bearer ' + YelpApiKey
    // axios.defaults.headers.common['x-requested-with'] = 'XMLHttpRequest'
  },
  methods: {
    speak: function () {
      console.log('selected: ' + this.$refs.map.selectedId)
    },
    setLocation: function (pos) {
      this.$refs.map.refocus(pos.coords.latitude, pos.coords.longitude, 12)
    },
    addMarkersFromData: function (apiData) {
      var businesses = apiData.data.businesses
      for (var i = 0; i < 20; i++) {
        var b = businesses[i]
        var data = {
          location: { lat: b.coordinates.latitude, lng: b.coordinates.longitude },
          name: b.name,
          id: b.id
        }
        this.$refs.map.addMarker(data)
      }
    },
    getCloseMerchants: function () {
      var req = this.corsAnywherePrefix + 'https://api.yelp.com/v3/businesses/search' +
        '?term=coffee' + // this.searchOptionTerm +
        '&location=charlottesville'
      // '&radius=' + this.searchOptionRadius +
      // '&open_now=' + this.searchOptionOpenNow +
      // '&sort_by=' + this.searchOptionSortByChoice // this.searchOptionSortByChoices.indexOf(this.searchOptionSortByChoice)
      // '{0}&latitiude={1}&longitude={2}&radius={3}&open_now={4}&sort_by={5}
      // .format(this.searchOptionTerm, 1, 1, this.searchOptionRadius, this.searchOptionOpenNow, this.searchOptionSortByChoices.indexOf(this.searchOptionSortByChoice))
      // console.log('requesting with url: ' + req)

      axios
        .get(req)
        .then(response => {
          // console.log(response)
          this.$refs.map.clearAllMarkers()
          this.addMarkersFromData(response)
          this.$refs.map.refocus(response.data.region.center.latitude, response.data.region.center.longitude, 13)
        })
        .catch(error => {
          console.error(error)
        })
    },
    getMerchantInfo: function (merchantID) {

    }
  }
}

</script>

<!--

{data: {…}, status: 200, statusText: "OK", headers: {…}, config: {…}, …}
data: {businesses: Array(20), total: 164, region: {…}}
status: 200
statusText: "OK"
headers:
accept-ranges: "bytes"
access-control-allow-origin: "*"
connection: "keep-alive"
content-encoding: "gzip"
content-type: "application/json"
date: "Wed, 26 Feb 2020 00:42:31 GMT"
ratelimit-dailylimit: "5000"
ratelimit-remaining: "4997"
ratelimit-resettime: "2020-02-27T00:00:00+00:00"
server: "nginx"
transfer-encoding: "chunked"
vary: "Accept-Encoding"
via: "1.1 varnish, 1.1 vegur"
x-b3-sampled: "0"
x-cache: "MISS"
x-cache-hits: "0"
x-final-url: "https://api.yelp.com/v3/businesses/search?term=coffee&location=charlottesville"
x-proxied: "10-65-163-96-useast1bprod"
x-routing-service: "10-65-226-173-useast1cprod; site=public_api_v3"
x-served-by: "cache-dca17765-DCA"
x-zipkin-id: "7b4d9267bd84ff21"
__proto__: Object
config: {url: "https://cors-anywhere.herokuapp.com/https://api.ye…esses/search?term=coffee&location=charlottesville", method: "get", headers: {…}, transformRequest: Array(1), transformResponse: Array(1), …}
request: XMLHttpRequest {readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, onreadystatechange: ƒ, …}
__proto__: Object

-->
