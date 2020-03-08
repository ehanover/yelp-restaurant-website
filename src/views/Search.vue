<template>
  <div class="search">
    <div id="nav">
      <router-link to="/search">Search</router-link> |
      <router-link to="/recommendation">Recommendation</router-link> |
      <router-link to="/about">About</router-link>
    </div>

    <h1>Yelp Restaurant Search</h1>
    <p>Search for restaurants with the options below.</p>

    <div class="container-fluid text-center">
      <div class="row content">
        <div class="col-sm-2 sidenav">
          <!-- <p><a href="#">Link</a></p>
          <p><a href="#">Link</a></p>
          <p><a href="#">Link</a></p> -->
        </div>
        <div class="col-sm-8 text-left">
          <hr>

          <form>
            <div class="container-fluid form-group">

              <div class="row">
                <a class="col-sm-2">Search term: </a>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="inputSearch" v-model="searchOptionTerm" placeholder='"Starbucks" or "barbeque"'>
                </div>
              </div>

              <br>
              <div class="row">
                <a class="col-sm-2">Location: </a>
                <!-- TODO implement -->
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="inputLocation" v-model="searchOptionLocation" placeholder='"Charlottesville" or blank for current location'>
                </div>
              </div>

              <br>
              <div class="row">
                <div class="col-sm-3">
                  <label class="form-check-label" for="searchOptionOpenNowId">Only Open Now: </label>
                  <span style="display:inline-block; width: 10px;"></span>
                  <input type="checkbox" id="searchOptionOpenNowId" v-model="searchOptionOpenNow">
                </div>

                <div class="col-sm-4">
                  <label class="form-range-label" for="searchOptionRadiusId">Search Radius: {{searchOptionRadius}} miles</label>
                  <br>
                  <input type="range" min="1" max="24" id="searchOptionRadiusId" v-model="searchOptionRadius">
                </div>

                <div class="col-sm-4">
                  <label class="form-check-label" for="searchOptionSortId">Sort By: </label>
                  <br>
                  <div id="searchOptionSortId">
                    <select class="form-control" v-model="searchOptionSortByChoice">
                      <option v-for="(option,index) in searchOptionSortByChoices" :key="index">{{ option }}</option>
                      <!-- .replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) -->
                    </select>
                  </div>
                </div>

                <button type="submit" class="btn btn-primary col-sm-1" v-on:click="getCloseMerchants()">Search</button>

              </div>

            </div>
          </form>

          <my-map ref="map"></my-map>
          <h5><i>Click a pin on the map above to see more details</i></h5>
          <br>
          <!-- <merchant-info ref="info"></merchant-info> -->
          <merchant-list ref="list"></merchant-list>
          <br>
          <!-- <h4 v-if="$refs.map !== undefined">Currently selected: {{ $refs.map.selectedId }}</h4> -->
        </div>
        <div class="col-sm-2 sidenav">
          <!-- <p><a href="#">Link</a></p>
          <p><a href="#">Link</a></p>
          <p><a href="#">Link</a></p>
          <div class="well">
            <p>ADS</p>
          </div>
          <div class="well">
            <p>ADS</p>
          </div> -->
        </div>
      </div>
    </div>

    <!-- centered -->
    <!-- <h4>Bottom Text</h4> -->

  </div>
</template>

<style scoped>
#searchOptionRadiusId {
  width: 50%;
}
#searchOptionSortId {
  width: 60%;
}
</style>

<script>

import MyMap from '../components/MyMap.vue'
import MerchantList from '../components/MerchantList.vue'
import { getYelpApiKey, getMapsApiKey } from '../credentials'
import { Loader } from 'google-maps'
import axios from 'axios'

export default {
  components: {
    'my-map': MyMap,
    'merchant-list': MerchantList
  },
  data () {
    return {
      corsAnywherePrefix: 'https://cors-anywhere.herokuapp.com/',
      // loader: null,
      google: null,
      // labelToId: {},

      position: null,
      searchOptionTerm: '',
      searchOptionLocation: '',
      searchOptionRadius: 10,
      searchOptionOpenNow: false,
      // searchOptionSortByChoices: ['best_match', 'rating', 'review_count', 'distance'],
      searchOptionSortByActual: ['rating', 'best_match', 'review_count', 'distance'], // terms that are used in the API call
      searchOptionSortByChoices: ['Rating', 'Best Match', 'Review Count', 'Distance'], // terms that are displayed to the user
      searchOptionSortByChoice: 'Rating'
    }
  },

  async mounted () {
    axios.defaults.headers.common.Authorization = 'Bearer ' + getYelpApiKey()

    // console.log('maps key: ' + getMapsApiKey())

    const loader = new Loader(getMapsApiKey())
    this.google = await loader.load()
    this.$refs.map.init(this.google)

    var v = this
    if (navigator.geolocation) {
      // navigator.geolocation.getCurrentPosition(this.mapRefocus)
      navigator.geolocation.getCurrentPosition(function (pos) {
        console.log('updated position')
        // console.log('updated position, lat=' + v.position.latitude)
        v.position = pos.coords
        v.mapRefocus(pos)
      })
    } else {
      console.error('Error retrieving geolocation')
    }
  },
  methods: {
    mapRefocus: function (pos) {
      this.$refs.map.refocus(pos.coords.latitude, pos.coords.longitude, 12)
    },
    mapMarkerClicked: function (marker) {
      // var clickedId = this.labelToId[marker.label]
      var clickedId = marker.get('myid')
      console.log('marker clicked, id=' + clickedId)

      this.$refs.list.highlightRow(clickedId)

      console.log('scrolling to row ' + clickedId)
      var element = document.getElementById('row ' + clickedId)
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    },
    addMarkersFromData: function (apiData) {
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
        // this.labelToId[m.label] = b.id
      }

      this.$refs.list.init(businesses, this.convertSearchTerm(this.searchOptionSortByChoice))
    },
    getCloseMerchants: function () {
      // console.log('requesting with pos rad=' + this.searchOptionRadius)
      var req = this.corsAnywherePrefix + 'https://api.yelp.com/v3/businesses/search'

      var params = {
        term: this.searchOptionTerm,
        radius: this.searchOptionRadius * 1609, // convert miles to meters
        open_now: this.searchOptionOpenNow,
        sort_by: this.convertSearchTerm(this.searchOptionSortByChoice)
      }
      if (this.searchOptionLocation === '') {
        params.latitude = this.position.latitude
        params.longitude = this.position.longitude
      } else {
        params.location = this.searchOptionLocation
      }

      axios
        .get(req, {
          params: params
        })
        .then(response => {
          console.log('Got response from business search')
          this.$refs.map.clearAllMarkers()
          this.addMarkersFromData(response)
          this.$refs.map.refocus(response.data.region.center.latitude, response.data.region.center.longitude, 13) // TODO make this depend on search radius?
        })
        .catch(error => {
          console.error(error)
        })
    },
    convertSearchTerm: function (displayTerm) {
      return this.searchOptionSortByActual[this.searchOptionSortByChoices.indexOf(displayTerm)]
    }

  }
}

</script>
