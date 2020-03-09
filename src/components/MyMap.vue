<template>
  <!-- MyMap is a container component for the Google Maps map element. It holds some marker information and controls the zoom of the map. -->
  <div class="map">
    <div id="map-area">  <!-- gets filled by javascript below -->
    </div>
  </div>
</template>

<script>

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
  async mounted () {

  },
  methods: {
    init: function (g) {
      this.google = g
      this.map = new this.google.maps.Map(document.getElementById('map-area'), {
        center: { lat: 38.035, lng: -78.503 }, // defaults to rotunda
        zoom: 12
      })
    },
    addMarker: function (markerData) {
      var m = new this.google.maps.Marker({
        position: markerData.location,
        map: this.map,
        label: markerData.name,
        myid: markerData.id
      })
      this.markers.push(m)
      // console.log('returning m, l=' + m.label)
      return m // return marker to parent class to allow onclick binding from by the parent
    },
    refocus: function (x, y, zoom) {
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
#map-area {
  height: 700px;
}
</style>
