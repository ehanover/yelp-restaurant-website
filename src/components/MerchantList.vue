<template>
  <div class="list">

    <!-- <h3>This is merchant list:</h3> -->

    <div v-if="merchants != null">
      <table class="table">
        <thead>
          <tr>
            <th>Merchant Name</th>
            <th>{{ prettyHeader(sortParam) }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(m,index) in merchants" :key="index" :id="'row ' + m.id">
            <td> <a v-bind:style="getRowStyle(m)">{{ index+1 }}. <router-link :to="{ name: 'MerchantInfo', params: { id: m.id }}">{{ m.name }}</router-link></a> </td>
            <td>{{ getTableProperty(m, sortParam) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

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
    },
    getTableProperty: function (m, param) {
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
    },
    getRowStyle: function (m) {
      return ((m.id === this.selectedId) ? 'font-weight: bold; text-decoration: underline;' : 'font-weight: normal;')
    },
    prettyHeader: function (oldHeader) {
      return oldHeader
      // var s = oldHeader.replace('best_match', 'Price').replace('_', ' ') // replaces underscores with spaces
      // return s.replace(/\b\w/g, function (l) { return l.toUpperCase() }) // capitalizes first letter of words
    }

  }
}

</script>
