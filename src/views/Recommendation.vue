<template>
  <div class="recommendation">
    <div id="nav">
      <router-link to="/search">Search</router-link> |
      <router-link to="/recommendation">Recommendation</router-link> |
      <router-link to="/about">About</router-link>
    </div>

    <h1>Restaurant Recommendations</h1>
    <p>Find new local restaurants in a visual way.</p>

    <div class="container-fluid text-center">
      <div class="row content">

        <div class="col-sm-2 sidenav"></div>
        <div class="col-sm-8 text-center">
          <hr>

          <form>
            <div class="container-fluid form-group">

              <div class="row">
                <a class="col-sm-2">Bubble parameter: </a>

                <div class="col-sm-3">
                  <select class="form-control" v-model="searchOptionBubbleChoice">
                      <option v-for="(option,index) in searchOptionBubbleChoices" :key="index">{{ option }}</option>
                  </select>
                </div>

                <div class="col-sm-3"></div>

                <button type="submit" class="btn btn-primary col-sm-4" v-on:click="updateBubbles()">View Recommendation Map</button>

              </div>

            </div>
          </form>
          <br>

          <highcharts :options="chartOptions"></highcharts>
          <br>
          <p>Restaurants are grouped by food category. The size of the bubble indicates the search parameter selected above.</p>

        </div>
        <div class="col-sm-2 sidenav"></div>

      </div>
    </div>
  </div>
  <!-- TODO copy github readme -->
</template>

<script>

import { Chart } from 'highcharts-vue'
import axios from 'axios'
import { getYelpApiKey } from '../credentials'

export default {
  components: {
    highcharts: Chart
  },
  data () {
    return {
      corsAnywherePrefix: 'https://cors-anywhere.herokuapp.com/',

      position: null,
      searchOptionBubbleChoices: ['rating', 'price', 'review_count'],
      searchOptionBubbleChoice: 'review_count',

      data: {},
      chartOptions: {
        chart: {
          type: 'packedbubble',
          height: '100%'
        },
        title: {
          text: 'Local Restaurants by Category'
        },
        series: [{
          name: '',
          data: [0, 0, 0] // starter data
        }],
        plotOptions: {
          packedbubble: {
            useSimulation: false,
            // minSize: '30%',
            // maxSize: '120%',
            // zMin: 0,
            // zMax: 1000,
            layoutAlgorithm: {
              // useSimulation: false,
              // splitSeries: true,
              // seriesInteraction: false,
              // dragBetweenSeries: false,
              // parentNodeLimit: false
              // gravitationalConstant: 0.05,
              splitSeries: true,
              seriesInteraction: false,
              dragBetweenSeries: false,
              parentNodeLimit: true
            },
            dataLabels: {
              enabled: true,
              format: '{point.name}'
            }
          }
        }
      }
    }
  },
  async mounted () {
    axios.defaults.headers.common.Authorization = 'Bearer ' + getYelpApiKey()

    // var v = this
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(function (pos) {
    //     console.log('updated position')
    //     v.position = pos.coords
    //   })
    // } else {
    //   console.error('Error retrieving geolocation')
    // }
  },
  methods: {
    updateBubbles: function () {
      var req = this.corsAnywherePrefix + 'https://api.yelp.com/v3/businesses/search'
      axios
        .get(req, {
          params: {
            term: 'food',
            latitude: 0, // this.position.latitude,
            longitude: 0, // this.position.longitude,
            radius: 40000, // 40000 meters is the max distance
            open_now: false,
            sort_by: 'best_match',
            limit: 50
          }
        })
        .then(response => {
          console.log('Got response from business indexing, length=' + response.data.businesses.length)
          this.chartOptions.series = []
          this.data = {}
          // this.data = response.data.businesses
          var keys = []
          var tempData = []
          for (var i = 0; i < response.data.businesses.length; i++) {
            // console.log(this.data[i].categories[0].title)
            var business = response.data.businesses[i]
            var ikey = business.categories[0].title
            var ivalue = business[this.searchOptionBubbleChoice]
            var iname = business.name
            tempData.push({ key: ikey, value: ivalue, name: iname })
            keys.push(ikey) // duplicates are not added to the set of categories
            // console.log('got data with cat ' + ikey)
          }
          // console.log('key 0: ' + keys.values()[0])
          var keysUnique = keys.filter((v, i, a) => a.indexOf(v) === i)
          // console.log('unique: ' + keysUnique)
          for (var c = 0; c < keysUnique.length; c++) { // categories
            // console.log('initializing category ' + keysUnique[c])
            this.data[keysUnique[c]] = []
          }
          for (var p = 0; p < tempData.length; p++) { // data points
            var b = tempData[p]
            // console.log('trying to push a value to list ' + b.key)
            this.data[b.key].push({ value: b.value, name: b.name })
          }
          for (var k = 0; k < Object.keys(this.data).length; k++) { // categories
            var cat = Object.keys(this.data)[k]
            // console.log('setting cat data with __ elements, ' + this.data[cat].length)
            // console.log('updating chartOptions with cat=' + cat)
            this.chartOptions.series.push({
              // type: 'packedbubble',
              name: cat,
              data: this.data[cat].map(i => ({ name: i.name, value: this.getBubbleValue(i) }))
              // data: this.data[cat].map(i => this.getBubbleValue(i))
            })
          }

          console.log('done with business indexing')
          // this.chartOptions.series = [1, 1, 1, 1, 1]
        })
        .catch(error => {
          console.error(error)
        })
    },
    getBubbleValue: function (bubble) { // rating, price, review_count
      if (this.searchOptionBubbleChoice === 'price') {
        return ((bubble.value === undefined) ? 0 : bubble.value.length ^ 10) // converts dollar signs to number reflecting price
      } else if (this.searchOptionBubbleChoice === 'rating') {
        return parseFloat(bubble.value) ^ 13
      } else if (this.searchOptionBubbleChoice === 'review_count') {
        return parseFloat(bubble.value)
      } else {
        return 1
      }
    }
  }
}

</script>
