<template>
  <!-- The Recommendation page displays a Highcharts packedbubble chart to show up to 50 local restaurants in a visual way, hopefully to expose the user to some new restuarants. -->
  <div class="recommendation">
    <my-router-header></my-router-header>

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
                <p class="col-sm-2">Bubble parameter: </p>
                <div class="col-sm-3">
                  <select class="form-control" v-model="searchOptionBubbleChoice">
                      <option v-for="(option,index) in searchOptionBubbleChoices" :key="index">{{ option }}</option>
                  </select>
                </div>
                <div class="col-sm-4"></div>
                <button type="submit" class="btn btn-primary col-sm-3" v-on:click="updateBubbles()">View Recommendations</button>
              </div>

            </div>
          </form>
          <br>

          <highcharts :options="chartOptions"></highcharts> <!-- Gets filled with the highcharts packedbubble chart -->
          <br>
          <p>Restaurants are grouped by food category. The size of the bubble indicates the search parameter selected above. Click on a bubble to see more details.</p>

        </div>
        <div class="col-sm-2 sidenav"></div>

      </div>
    </div>
  </div>
</template>

<script>

import MyRouterHeader from '../components/MyRouterHeader'
import { Chart } from 'highcharts-vue'
import axios from 'axios'
import { getYelpApiKey } from '../credentials'

export default {
  components: {
    'my-router-header': MyRouterHeader,
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
        series: [{ // the series attribute gets modified by the API calls
          name: '',
          data: [0, 0, 0] // starter data
        }],
        plotOptions: {
          // https://www.highcharts.com/docs/chart-and-series-types/packed-bubble
          packedbubble: {
            useSimulation: false,
            layoutAlgorithm: {
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

    var v = this
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (pos) {
        console.log('updated position')
        v.position = pos.coords
      })
    } else {
      console.error('Error retrieving geolocation')
    }
  },
  methods: {
    updateBubbles: function () {
      var req = this.corsAnywherePrefix + 'https://api.yelp.com/v3/businesses/search'
      axios
        .get(req, {
          params: {
            term: 'food',
            latitude: this.position.latitude,
            longitude: this.position.longitude,
            radius: 40000, // 40000 meters is the max distance specified by the API
            open_now: false,
            sort_by: 'best_match',
            limit: 50
          }
        })
        .then(response => {
          // console.log('Got response from business indexing, length=' + response.data.businesses.length)

          // the following code combines the businesses returned by the API call into a dictionary of business lists, organized by categori
          this.chartOptions.series = []
          this.data = {}
          var keys = []
          var tempData = []
          for (var i = 0; i < response.data.businesses.length; i++) {
            var business = response.data.businesses[i]

            var ikey = business.categories[0].title
            var ivalue = business[this.searchOptionBubbleChoice]
            var iname = business.name
            var iid = business.id

            tempData.push({ key: ikey, value: ivalue, name: iname, id: iid })
            keys.push(ikey)
          }

          var keysUnique = keys.filter((v, i, a) => a.indexOf(v) === i) // duplicates are removed from the array of categories
          for (var c = 0; c < keysUnique.length; c++) { // loop over categories to initialize the category lists
            this.data[keysUnique[c]] = []
          }
          for (var p = 0; p < tempData.length; p++) { // loop over data points to add them to correct category lists
            var b = tempData[p]
            this.data[b.key].push({ value: b.value, name: b.name, id: b.id })
          }
          for (var k = 0; k < Object.keys(this.data).length; k++) { // loop over categories to finally update the chartData
            var cat = Object.keys(this.data)[k]

            var v = this
            this.chartOptions.series.push({ //
              name: cat,
              data: this.data[cat].map(i => ({
                name: i.name,
                value: this.getBubbleValue(i),
                events: {
                  click: function (event) {
                    // console.log('clicked a bubble: ' + i.name)
                    v.$router.push({ name: 'MerchantInfo', params: { id: i.id } })
                  }
                }
              }))
            })
          }
          console.log('done with business indexing')
        })
        .catch(error => {
          console.error(error)
        })
    },
    getBubbleValue: function (bubble) {
      // options from form are: rating, price, review_count
      if (this.searchOptionBubbleChoice === 'price') {
        return ((bubble.value === undefined) ? 0 : this.factorial(bubble.value.length + 2)) // converts dollar signs to value reflecting price
      } else if (this.searchOptionBubbleChoice === 'rating') {
        return this.factorial(parseFloat(bubble.value) ^ 2)
      } else if (this.searchOptionBubbleChoice === 'review_count') {
        return parseFloat(bubble.value)
      } else {
        return 1
      }
    },
    factorial: function (num) {
      var rval = 1
      for (var i = 2; i <= num; i++) {
        rval = rval * i
      }
      return rval
    }
  }
}

</script>
