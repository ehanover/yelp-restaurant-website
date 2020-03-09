<template>
  <!-- The Specials page lists up to 50 local restuarants that have any of the 'hot_and_new', 'cashback', or 'deals' attributes according to Yelp. It uses a Highcharts packedbubble chart as a simple way to show the results. -->
  <div class="specials">
    <my-router-header></my-router-header>

    <h1>Special Restaurants</h1>
    <p>These local restaurants have special deals, cashback opportunities, or are recently opened. Try something new and exciting!</p>

    <div class="container-fluid">
      <div class="row content">

        <div class="col-sm-2 sidenav"></div>
        <div class="col-sm-8 text-center">
          <hr>

          <div v-if="responded == true">
            <highcharts :options="chartOptions"></highcharts>
          </div>
          <div v-else>
            <br>
            <br>
            <p><i>Loading...</i></p>
          </div>

          <!-- <p>Hot above here</p> -->

        </div>
        <div class="col-sm-2 sidenav"></div>

        <br>
        <br>

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
      responded: false,
      chartOptions: {
        chart: {
          type: 'packedbubble',
          height: '100%'
        },
        title: {
          text: ''
        },
        series: [],
        plotOptions: {
          packedbubble: {
            minSize: '50%',
            maxSize: '120%',
            useSimulation: true,
            layoutAlgorithm: {
              splitSeries: false,
              seriesInteraction: false,
              dragBetweenSeries: false,
              parentNodeLimit: false
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
        v.updateDeals()
      })
    } else {
      console.error('Error retrieving geolocation')
    }
  },
  methods: {
    updateDeals: function () {
      var req = this.corsAnywherePrefix + 'https://api.yelp.com/v3/businesses/search'
      var v = this
      axios
        .get(req, {
          params: {
            term: 'food',
            latitude: this.position.latitude,
            longitude: this.position.longitude,
            radius: 40000, // 40000 meters is the max distance specified by the API
            open_now: false,
            sort_by: 'best_match',
            limit: 40,
            attributes: ['hot_and_new', 'cashback', 'deals']
          }
        })
        .then(response => {
          // console.log(response.data)
          console.log('got data...')
          this.responded = true

          this.chartOptions.series = [{
            name: '',
            data: response.data.businesses.map(b => ({
              name: b.name,
              value: 1,
              events: {
                click: function (event) {
                  // console.log('clicked a bubble: ' + i.name)
                  v.$router.push({ name: 'MerchantInfo', params: { id: b.id } })
                }
              }
            })),
            tooltip: {
              pointFormat: '',
              headerFormat: ''
            },
            color: '#e74742' // same color as bootstrap red journal theme
          }]
        })
        .catch(error => {
          console.error(error)
        })
    }

  }
}

</script>
