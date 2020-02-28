<template>
  <div class="list">

    <!-- <h3>This is merchant list:</h3> -->

    <div>
      <div v-for="(m,index) in merchants" :key="index">
        <!-- <button v-on:click="redirectToInfo(m)">{{ m.name }}</button> -->
        <a v-on:click="redirectToInfo(m)" class="link">{{ m.name }}</a>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'MerchantList',
  data: function () {
    return {
      merchants: null
    }
  },
  async mounted () {

  },
  methods: {
    init: function (merchants) {
      this.merchants = merchants
      // this.$forceUpdate()
    },
    redirectToInfo: function (merchant) {
      // console.log('redirecting to name=' + merchant.name)
      this.$router.push({ name: 'MerchantInfo', params: { merchant: merchant } })
    }
  }
}

</script>

<style scoped>
</style>
