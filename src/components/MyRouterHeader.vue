<template>
  <!-- MyRouterHeader holds the navigation links that appear at the top of each page in the website, except the MerchantInfo page because that page has a back button instead. -->
  <div id="nav">
    <router-link to="/search">Search</router-link> |
    <router-link to="/recommendation">Recommendations</router-link> |
    <router-link to="/specials">Specials</router-link> |
    <router-link to="/about">About</router-link>
  </div>
</template>

<script>
export default {
  name: 'MyRouterHeader'
}
</script>
