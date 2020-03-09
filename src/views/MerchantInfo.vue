<template>
  <!-- The MerchantInfo page displays information from Yelp and Zomato for a business whose ID is passed in the route navigation parameters. It shows contact information, pictures, and reviews. -->
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
          <p>Yelp Rating:   </p>
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
      <div v-if="zomatoReviews == null || zomatoReviews.reviews_count == 0">
        <!-- there are no reviews on zomato -->
        <p><i>There are no reviews at this location.</i></p>
      </div>
      <div v-else>
        <!-- there are reviews, so display them all using a for loop -->
        <ul v-for="(review,index) in zomatoReviews.user_reviews" :key="index" class="row text-left">
          <li><h4>Review by <b>{{ review.review.user.name }}</b> on {{ review.review.review_time_friendly }}</h4></li>
            <br>
            <p>{{ review.review.review_text }}</p>
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
}
</style>

<script>

import axios from 'axios'
import { getZomatoUserKey } from '../credentials'

export default {
  props: ['id'], // parameters passed by the vue router when navigating to this page. Used in the API requests.
  data () {
    return {
      corsAnywherePrefix: 'https://cors-anywhere.herokuapp.com/',

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
        this.zomatoSearchFirst() // updates merchantZomato with the reviews from the first merchant in the zomato response
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
            'user-key': getZomatoUserKey()
          },
          params: {
            q: this.merchant.name,
            lat: this.merchant.coordinates.latitude, // 38.9697
            lon: this.merchant.coordinates.longitude, // -77.3838
            radius: 1000, // in meters
            count: 1,
            sort: 'real_distance',
            order: 'asc'
          }
        })
        .then(response => {
          // console.log('got zomato search response')
          try {
            this.merchantZomato = response.data.restaurants[0].restaurant // defaults to selecting the first result
            this.zomatoGetReviewsFirst()
            // console.log(this.merchantZomato)
          } catch (error) {
            // couldn't find a matching restaurante on zomato
            // console.log('couldnt find a place, setting to null')
            this.merchantZomato = null
            this.zomatoReviews = null
            this.$forceUpdate()
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    zomatoGetReviewsFirst: function () {
      var req2 = this.corsAnywherePrefix + 'https://developers.zomato.com/api/v2.1/reviews'
      axios
        .get(req2, {
          headers: {
            'user-key': getZomatoUserKey()
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
    getImageFromRating (rating) { // converts a rating 0-5 with 0.5 increments to the local filepath for the Yelp given images
      return '/images/regular_' + this.ratingToImage[rating] + '@2x.png'
    }
  }
}
</script>
