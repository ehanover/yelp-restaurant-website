<template>
  <div class="info">
    <div class="row justify-content-left">
      <div class="col-6">Merchant Info</div>
      <p>Name: {{merchant.name}}</p>
    </div>
  </div>

</template>

<script>
export default {
  props: ['merchant']
  // data () {
  //   return {

  //   }
  // }
}
</script>
