<template>
  <div class="map"> <!-- gets filled by javascript below -->
    <div id="map-area">
    </div>
  </div>
</template>

<script>

// import { MapsApiKey } from '../credentials'
// import GoogleMapsLoader from 'google-maps'
// import { Loader } from 'google-maps' // , LoaderOptions

export default {
  name: 'MyMap',
  data: function () {
    return {
      google: null,
      map: null,

      markers: [],
      selectedId: null
    }
  },
  async mounted () { // TODO the map gets loaded every time the page changes
    // https://www.npmjs.com/package/google-maps
    // const loader = new Loader(MapsApiKey)
    // this.google = await loader.load() // TODO I could move the google object to the parent class. That would allow proper click handle and maybe smarter loading?
    // this.map = new this.google.maps.Map(document.getElementById('map-area'), { // eslint-disable-line no-unused-vars
    //   center: { lat: 38.035, lng: -78.503 },
    //   zoom: 12
    // })
    // loader.load().then(function (google) {
    //   const map = new google.maps.Map(document.getElementById('map-area'), { // eslint-disable-line no-unused-vars
    //     center: { lat: -34.397, lng: 150.644 },
    //     zoom: 8
    //   })
    // })
  },
  methods: {
    init: function (g) {
      this.google = g

      this.map = new this.google.maps.Map(document.getElementById('map-area'), {
        center: { lat: 38.035, lng: -78.503 },
        zoom: 12
      })
    },
    // setClicked: function (id) { // problem
    //   this.selectedId = id
    //   console.log('selected the marker for ' + this.selectedId)
    // },
    addMarker: function (markerData) {
      var m = new this.google.maps.Marker({
        position: markerData.location,
        map: this.map,
        // title: markerData.name,
        label: markerData.name
      })
      this.markers.push(m)
      // console.log('returning m, l=' + m.label)
      return m // return marker to parent class to allow onclick binding
    },
    refocus: function (x, y, zoom) {
      // this.map.setCenter(this.markers[0].location)
      this.map.setCenter({ lat: x, lng: y })
      this.map.setZoom(zoom)
    },
    clearAllMarkers: function () {
      // console.log('clearing ' + this.markers.length + ' markers')
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null)
      }
      this.markers = []
    }
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
