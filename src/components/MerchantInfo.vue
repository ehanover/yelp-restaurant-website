<template>
  <div class="info"> <!-- gets filled by javascript below -->
    <!-- <a v-bind:href='url'> -->

    <div class="row">
      <div class="col-sm-5">
        <h4>Info for <b>{{ name }}</b></h4>
      </div>
      <div class="col-sm-4">
        <p><a v-bind:href='url'>View on Yelp</a> | Phone: {{ phone }}</p>
      </div>
      <div class="col-sm-3">
        <p v-for="(line,index) in address" :key="index">{{ line }}</p>
      </div>
    </div>

    <br>
    <div class="row">
      <div v-for="(url,index) in photos" :key="index" class="col-lg-4 col-6" style="width: 50%; margin: 0 auto;">
        <img :src="url" :title="'Merchant photo #' + (index + 1)" class="img-thumbnail">
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'MerchantInfo',
  data: function () {
    return {
      /*
      id: null,
      name: null,
      url: null,
      phone: null,
      rating: null,
      photos: null
      */
      id: 'fakeid',
      name: 'Fake name of a merchant',
      url: 'https://google.com',
      phone: '(415) 749-2060',
      address: [
        '800 N Point St',
        'San Francisco, CA 94109'
      ],
      rating: '4.5/5', // TODO have yelp's picture scale here?
      photos: [
        'https://s3-media2.fl.yelpcdn.com/bphoto/CPc91bGzKBe95aM5edjhhQ/o.jpg', // TODO limit the number of photos to 3 (?)
        'https://s3-media4.fl.yelpcdn.com/bphoto/FmXn6cYO1Mm03UNO5cbOqw/o.jpg',
        'https://s3-media4.fl.yelpcdn.com/bphoto/HZVDyYaghwPl2kVbvHuHjA/o.jpg'
      ]
    }
  },
  async mounted () {

  },
  methods: {

  }
}

</script>

<style scoped>
</style>
