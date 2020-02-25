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
                <input type="range" min="1" max="100" id="searchOptionRadiusId" v-model="searchOptionRadius">

                <label class="form-check-label" for="searchOptionSortId">Sort By: </label>
                <div id="searchOptionSortId">
                  <select class="form-control" v-model="searchOptionSortByChoice">
                    <option v-for="(option,index) in searchOptionSortByChoices" :key="index">{{ option }}</option>
                    <!-- <option>Best match</option>
                    <option>Rating</option>
                    <option>Number of reviews</option>
                    <option>Distance</option> -->
                  </select>
                </div>

              </div>
            </div>
            <!-- <div class="form-group row">
              <label><input type="checkbox" :value="searchOptionOpenNow">Only Open Now</label>
              <label><input type="range" :value="searchOptionRadius">Search Radius</label>
            </div> -->
          </form>

          <my-map></my-map>
          <h5>Click on a pin on the map above to see details</h5>
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
      searchOptionRadius: 50,
      searchOptionOpenNow: false,
      searchOptionSortByChoices: ['best_match', 'rating', 'review_count', 'distance'],
      searchOptionSortByChoice: 'best_match',

      merchants: [
        {
          name: 'Sentiment',
          id: 'abc',
          long: 2,
          lat: 3
        }
      ]

    }
  },

  mounted () {
    /*
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (pos) {
        console.log('Got location!')
        // this.position = pos
      })
    } else {
      console.error('Error retrieving geolocation')
    }
    */

    axios.defaults.headers.common.Authorization = 'Bearer ' + YelpApiKey
    // axios.defaults.headers.common['x-requested-with'] = 'XMLHttpRequest'
    // this.getCloseMerchants()
  },
  methods: {
    getCloseMerchants: function () {
      var req = this.corsAnywherePrefix + 'https://api.yelp.com/v3/businesses/search' +
        '?term=' + this.searchOptionTerm +
        '&location=paris'
      // '&radius=' + this.searchOptionRadius +
      // '&open_now=' + this.searchOptionOpenNow +
      // '&sort_by=' + this.searchOptionSortByChoice // this.searchOptionSortByChoices.indexOf(this.searchOptionSortByChoice)
      // '{0}&latitiude={1}&longitude={2}&radius={3}&open_now={4}&sort_by={5}
      // .format(this.searchOptionTerm, 1, 1, this.searchOptionRadius, this.searchOptionOpenNow, this.searchOptionSortByChoices.indexOf(this.searchOptionSortByChoice))
      console.log('requesting with url: ' + req)

      axios
        .get(req)
        .then(response => (console.log(response)))
        .catch(error => {
          console.error(error)
        })
    },
    getMerchantInfo: function (merchantID) {

    }
  }
}

</script>
