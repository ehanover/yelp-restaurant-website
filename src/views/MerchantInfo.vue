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
      <div class="row">
        <p class="col-sm-6">Categories: {{ merchant.categories.map(c => c.title).join(', ') }}</p>
        <div class="col-sm-6">
          <a>Yelp Rating:  </a>
          <img v-bind:src="getImageFromRating(merchant.rating)" style="max-height: 80%;">
        </div>
      </div>

      <br>
      <div class="row">
        <div v-for="(url,index) in merchant.photos" :key="index" class="col-lg-4 col-6">
          <img :src="url" :title="'Merchant photo #' + (index + 1)" class="img-thumbnail" id="merchantPhoto">
        </div>
      </div>

      <h3>Reviews from <a href='https://zomato.com'>Zomato.com</a> at this location{{ (merchantZomato == null || merchantZomato === null) ? '' : ': ' + merchantZomato.name }}</h3>
      <hr>
      <!-- reviews are still being loaded -->
      <!-- <div v-if="zomatoReviews == null">

        <p>...</p>
      </div> -->
      <div v-if="zomatoReviews == null || zomatoReviews.reviews_count == 0">
        <!-- there are no reviews on zomato -->
        <p><i>There are no reviews at this location.</i></p>
      </div>
      <div v-else>
        <!-- there are reviews, so display them all -->
        <ul v-for="(review,index) in zomatoReviews.user_reviews" :key="index" class="row text-left">
          <li><h4>Review by <b>{{ review.review.user.name }}</b> on {{ review.review.review_time_friendly }}</h4></li>
          <a>{{ review.review.review_text }}</a>
        </ul>
      </div>

    </div>
    <div v-else>
      <p><i>Loading...</i></p>
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
      corsAnywherePrefix: 'https://cors-anywhere.herokuapp.com/',

      publicPath: process.env.BASE_URL,
      ratingToImage: { 0: '0', 0.5: '', 1: '1', 1.5: '1_half', 2: '2', 2.5: '2_half', 3: '3', 3.5: '3_half', 4: '4', 4.5: '4_half', 5: '5' },

      merchant: null,

      merchantZomato: null,
      zomatoReviews: null
    }
  },
  mounted () {
    var req = this.corsAnywherePrefix + 'https://api.yelp.com/v3/businesses/' + this.id
    axios
      .get(req)
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
      var req = this.corsAnywherePrefix + 'https://developers.zomato.com/api/v2.1/search'
      axios
        .get(req, {
          headers: {
            'user-key': ZomatoUserKey
          },
          params: {
            q: this.merchant.name,
            lat: this.merchant.coordinates.latitude,
            lon: this.merchant.coordinates.longitude,
            radius: 1,
            count: 1,
            sort: 'real_distance',
            order: 'desc'
          }
        })
        .then(response => {
          // console.log('got zomato search response')
          try {
            this.merchantZomato = response.data.restaurants[0].restaurant // defaults to selecting the first result
            this.zomatoGetReviews()
            // console.log(this.merchantZomato)
          } catch (error) { // couldn't find a matching restaurante on zomato
            console.log('couldnt find a place, setting to null')
            this.merchantZomato = null // null indicates no value, while '' indicates uncertain state
            this.zomatoReviews = null
            this.$forceUpdate()
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
          // console.log('got zomato reviews response, num ' + response.data.reviews_count)
          // return response.data.user_reviews
          this.zomatoReviews = response.data
        })
        .catch(error => {
          console.error(error)
        })
    },
    getImageFromRating (rating) {
      return '/images/regular_' + this.ratingToImage[rating] + '@2x.png'
    }
  }
}
</script>
