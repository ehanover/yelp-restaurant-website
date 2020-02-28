<template>
  <div class="home">
    <h1>Yelp Merchant Search</h1>

    <div class="container-fluid text-center">
      <div class="row content"> <!-- TODO is this needed? -->
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
              <br>
              <div class="row">
                <label class="form-check-label" for="searchOptionOpenNowId">Only Open Now: </label>
                <input class="col-sm-1" type="checkbox" id="searchOptionOpenNowId" v-model="searchOptionOpenNow">

                <label class="form-range-label" for="searchOptionRadiusId">Search Radius: {{searchOptionRadius}} miles</label>
                <input class="col-sm-3" type="range" min="1" max="25" id="searchOptionRadiusId" v-model="searchOptionRadius">

                <label class="form-check-label" for="searchOptionSortId">Sort By: </label>
                <div class="col-sm-2" id="searchOptionSortId">
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
          <h5><i>Click a pin on the map above to see more details</i></h5>
          <br>
          <!-- <merchant-info ref="info"></merchant-info> -->
          <merchant-list ref="list"></merchant-list>
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

    <!-- centered -->
    <!-- <h4>Bottom Text</h4> -->

  </div>
</template>

<style scoped>
#searchOptionRadiusId {
  width: 400px;
}
</style>

<script>

import MyMap from '../components/MyMap.vue'
// import MerchantInfo from '../components/MerchantInfo.vue'
import MerchantList from '../components/MerchantList.vue'
import { YelpApiKey, MapsApiKey } from '../credentials'
import { Loader } from 'google-maps'
import axios from 'axios'

export default {
  components: {
    'my-map': MyMap,
    // 'merchant-info': MerchantInfo
    'merchant-list': MerchantList
  },
  data () {
    return {
      corsAnywherePrefix: 'https://cors-anywhere.herokuapp.com/',
      // loader: null,
      google: null,
      labelToId: {},

      position: null,
      searchOptionTerm: '',
      searchOptionRadius: 10,
      searchOptionOpenNow: false,
      searchOptionSortByChoices: ['best_match', 'rating', 'review_count', 'distance'],
      searchOptionSortByChoice: 'best_match'
    }
  },

  async mounted () {
    const loader = new Loader(MapsApiKey)
    this.google = await loader.load() // this could use "then" instead of "await" if needed
    this.$refs.map.init(this.google)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.mapRefocus)
    } else {
      console.error('Error retrieving geolocation')
    }

    axios.defaults.headers.common.Authorization = 'Bearer ' + YelpApiKey
  },
  methods: {
    mapRefocus: function (pos) {
      this.$refs.map.refocus(pos.coords.latitude, pos.coords.longitude, 12)
    },
    mapMarkerClicked: function (marker) {
      var clickedId = this.labelToId[marker.label]
      console.log('marker clicked, id=' + clickedId)
    },
    addMarkersFromData: function (apiData) { // TODO move to map component?
      var businesses = apiData.data.businesses
      for (var i = 0; i < businesses.length; i++) {
        var b = businesses[i]
        var data = {
          location: { lat: b.coordinates.latitude, lng: b.coordinates.longitude },
          name: b.name,
          id: b.id
        }
        var m = this.$refs.map.addMarker(data)
        var v = this // stores reference to vue variables and functions
        this.google.maps.event.addListener(m, 'click', function () {
          v.mapMarkerClicked(this) // "this" is the marker that was clicked
        })
        this.labelToId[m.label] = b.id

        // update merchant list
        // this.businesses = businesses
      }
      console.log('about to init: ' + businesses)
      this.$refs.list.init(businesses)
    },
    getCloseMerchants: function () {
      var req = this.corsAnywherePrefix + 'https://api.yelp.com/v3/businesses/search' + // TODO make this params{}?
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
          console.log(response)
          this.$refs.map.clearAllMarkers()
          this.addMarkersFromData(response)
          this.$refs.map.refocus(response.data.region.center.latitude, response.data.region.center.longitude, 13) // TODO make this depend on search radius?
        })
        .catch(error => {
          console.error(error)
        })
    }

  }
}

</script>
