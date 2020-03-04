<template>
  <div class="info row">
    <div class="col-sm-2 sidenav"></div>

    <div v-if="merchant != null" class="col-sm-8">
      <button class="btn btn-secondary" v-on:click="$router.go(-1)">Go back</button>

      <br><br>
      <h1>{{ merchant.name }}</h1>
      <hr>
      <div class="row">
        <div class="col-sm-4">
          <p>{{merchant.location.display_address.join('\n')}}</p>
        </div>
        <div class="col-sm-4">
          <p>Phone: {{ merchant.display_phone }}</p>
        </div>
        <div class="col-sm-4">
          <a v-bind:href='merchant.url'>View on Yelp</a>
        </div>
      </div>
      <p>Categories: {{ merchant.categories.map(c => c.title).join(', ') }}</p>

      <br>
      <div class="row">
        <div v-for="(url,index) in merchant.photos" :key="index" class="col-lg-4 col-6">
          <img :src="url" :title="'Merchant photo #' + (index + 1)" class="img-thumbnail" id="merchantPhoto">
        </div>
      </div>

      <h3>Reviews from <a href='https://zomato.com'>Zomato.com</a> for this location{{ (merchantZomato == null || merchantZomato == undefined) ? '' : ': ' + merchantZomato.name }}</h3>
      <hr>
      <div v-if="zomatoReviews == null">
        <p>...</p>
      </div>
      <div v-else-if="zomatoReviews.reviews_count == 0">
        <p><i>There are no reviews for this restaurant.</i></p>
      </div>
      <div v-else>
        <ul v-for="(review,index) in zomatoReviews.user_reviews" :key="index" class="row text-left">
          <li><h4>Review by <b>{{ review.review.user.name }}</b> on {{ review.review.review_time_friendly }}</h4></li>
          <a>{{ review.review.review_text }}</a>
        </ul>
      </div>

    </div>
    <div v-else>
      <p><i>Loading...</i></p>
      <!-- <div class="loader"></div> -->
    </div>

    <br>
    <div class="col-sm-2 sidenav"></div>
  </div>

</template>

<style scoped>
#merchantPhoto {
  max-height: 60%;
  /* max-width: 90%; */
  /* margin: 0 auto; */
}
</style>

<script>

import axios from 'axios'
import { ZomatoUserKey } from '../credentials'

export default {
  props: ['id'],
  data () {
    return {
      // id: null,
      merchant: null,
      merchantZomato: null,
      zomatoReviews: null,

      corsAnywherePrefix: 'https://cors-anywhere.herokuapp.com/'
    }
  },
  mounted () {
    var req1 = this.corsAnywherePrefix + 'https://api.yelp.com/v3/businesses/' + this.id
    axios
      .get(req1)
      .then(response => {
        // console.log(response)
        this.merchant = response.data
        this.zomatoSearchFirst() // updates merchantZomato
      })
      .catch(error => {
        console.error(error)
      })
  },
  methods: {
    zomatoSearchFirst: function () {
      var req2 = this.corsAnywherePrefix + 'https://developers.zomato.com/api/v2.1/search'
      axios
        .get(req2, {
          headers: {
            'user-key': ZomatoUserKey
          },
          params: {
            q: this.merchant.name,
            lat: this.merchant.coordinates.latitude,
            lon: this.merchant.coordinates.longitude,
            radius: 15,
            count: 3,
            sort: 'real_distance'
          }
        })
        .then(response => {
          // console.log('got zomato search response')
          try {
            this.merchantZomato = response.data.restaurants[0].restaurant // defaults to selecting the first result
            this.zomatoGetReviews()
            // console.log(this.merchantZomato)
          } catch (error) { // couldn't find a matching restaurante on zomato
            this.merchantZomato = null
            this.zomatoReviews = null
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    zomatoGetReviews: function () {
      var req2 = this.corsAnywherePrefix + 'https://developers.zomato.com/api/v2.1/reviews'
      axios
        .get(req2, {
          headers: {
            'user-key': ZomatoUserKey
          },
          params: {
            res_id: this.merchantZomato.id
          }
        })
        .then(response => {
          console.log('got zomato reviews response: ' + response.data.reviews_count)
          // return response.data.user_reviews
          this.zomatoReviews = response.data
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>
