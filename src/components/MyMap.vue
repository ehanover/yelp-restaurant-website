<template>
  <div class="map"> <!-- gets filled by javascript below -->
    <div id="map-area">
    </div>
    <!-- <p>Component, below map</p> -->
  </div>
</template>

<script>

// import { gmapsInit } from './MyMapInit'
import { MapsApiKey } from '../credentials'
// import GoogleMapsLoader from 'google-maps'
import { Loader } from 'google-maps' // , LoaderOptions
// const {Loader} = require('google-maps'); // without typescript

export default {
  name: 'MyMap',
  data: function () {
    return {
      locations: [
        { lat: -31.563910, lng: 147.154312 },
        { lat: -33.718234, lng: 150.363181 }
      ]

    }
  },
  async mounted () { // TODO the library gets loaded every time the page changes
    /*
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' // eslint-disable-line no-unused-vars
    var markers = this.locations.map(function (location, i) { // eslint-disable-line no-unused-vars
      return new google.maps.Marker({
        position: location,
        label: labels[i % labels.length]
      })
    })
    */

    /*
    const google = await gmapsInit()
    const geocoder = new google.maps.Geocoder()
    const map = new google.maps.Map(this.$el)

    geocoder.geocode({ address: 'Austria' }, (results, status) => {
      if (status !== 'OK' || !results[0]) {
        throw new Error(status)
      }

      map.setCenter(results[0].geometry.location)
      map.fitBounds(results[0].geometry.viewport)
    })
    */

    /*
    var myOptions = {
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP, // eslint-disable-line no-undef
      center: new google.maps.LatLng(25.761680, -80.19179) // eslint-disable-line no-undef
    }
    */

    // https://www.npmjs.com/package/google-maps
    const loader = new Loader(MapsApiKey)
    // const google = await loader.load()
    // const map = new google.maps.Map(document.getElementById('map-area'), { // eslint-disable-line no-unused-vars
    //   center: { lat: -34.397, lng: 150.644 },
    //   zoom: 8
    // })
    loader.load().then(function (google) {
      const map = new google.maps.Map(document.getElementById('map-area'), { // eslint-disable-line no-unused-vars
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
      })
    })
  }
}

</script>

<style scoped>
/* #map {
  height: 100%;
  background-color: pink;
} */
#map-area {
  height: 600px;
  /* background-color: purple; */
}

</style>
