<template>
  <div class="list">

    <!-- <h3>This is merchant list:</h3> -->

    <div v-if="merchants != null">
      <table class="table">
        <thead>
          <tr>
            <th>Merchant Name</th>
            <th>{{ sortParam }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(m,index) in merchants" :key="index" :id="'row ' + m.id">
            <td> <a v-bind:style="getRowStyle(m)">{{ index+1 }}. <router-link :to="{ name: 'MerchantInfo', params: { id: m.id }}">{{ m.name }}</router-link></a> </td>
            <!-- <td> <a style="font-weight: bold;">{{ index+1 }}. <router-link :to="{ name: 'MerchantInfo', params: { id: m.id }}">{{ m.name }}</router-link></a> </td> -->
            <td>{{ getTableProperty(m, sortParam) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- TODO add the if/else null section -->

  </div>
</template>

<script>

export default {
  name: 'MerchantList',
  data: function () {
    return {
      merchants: null,
      selectedId: null
    }
  },
  async mounted () {

  },
  methods: {
    init: function (merchants, sortParam) {
      this.merchants = merchants
      this.sortParam = sortParam
      // this.$forceUpdate()
    },
    getTableProperty: function (m, param) {
      // ['best_match', 'rating', 'review_count', 'distance']
      if (param === 'best_match') {
        return m.price // this isn't an obvious display choice
      } else if (param === 'rating') {
        return m.rating
      } else if (param === 'review_count') {
        return m.review_count
      } else if (param === 'distance') {
        return m.distance * 0.00062137 // convert meters to miles
      } else {
        return 'Incorrect sort argument' // this should never happen
      }
    },
    highlightRow: function (mid) {
      this.selectedId = mid
      // console.log('highlight set, id=' + this.selectedId)
      // this.$forceUpdate()
    },
    getRowStyle: function (m) {
      return ((m.id === this.selectedId) ? 'font-weight: bold; text-decoration: underline;' : 'font-weight: normal;')
    }
    // redirectToInfo: function (merchant) {
    //   console.log('redirecting to id=' + merchant.id)
    //   this.$router.push({ name: 'MerchantInfo', params: { id: merchant.id } })
    // }
  }
}

/*
<div v-for="(m,index) in merchants" :key="index">
        <!-- <button v-on:click="redirectToInfo(m)">{{ m.name }}</button> -->
        <!-- <a v-on:click="redirectToInfo(m)" class="link">{{ m.name }}</a> -->
        <router-link :to="{ name: 'MerchantInfo', params: { id: m.id }}">
          {{ m.name }}
        </router-link>
        <!--  target="_blank" -->
      </div>
*/
</script>
