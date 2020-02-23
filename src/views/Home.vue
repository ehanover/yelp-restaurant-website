<template>
  <div class="home">
    <h1>Yelp Merchant Search</h1>

    <div class="container-fluid text-center">
      <div class="row content"> <!-- TODO needed> -->
        <div class="col-sm-2 sidenav">
          <p><a href="#">Link</a></p>
          <p><a href="#">Link</a></p>
          <p><a href="#">Link</a></p>
        </div>
        <div class="col-sm-8 text-left">
          <!-- <h1>Welcome</h1> -->
          <p>To get started, search for merchants below.</p>
          <hr>

          <form>
            <div class="form-group row">
              <label for="inputSub" class="col-sm-1 col-form-label">Subreddit:</label>
              <div class="col-sm-7">
                <input type="text" class="form-control" id="inputSub" placeholder="Starbucks">
              </div>
              <div class="col-sm-2">
                <select class="form-control">
                  <option>Name</option>
                  <option>Category</option>
                  <option>City</option>
                </select>
              </div>
              <!-- <div class="col-sm-3"> -->
                <button type="submit" class="btn btn-primary col-sm-1">Enter</button>
              <!-- </div> -->
            </div>
          </form>

          <h3>About Merchants</h3>
          <p>Click on a pin on the map above to see details</p>
        </div>
        <div class="col-sm-2 sidenav">
          <p><a href="#">Link</a></p>
          <p><a href="#">Link</a></p>
          <p><a href="#">Link</a></p>
          <div class="well">
            <p>ADS</p>
          </div>
          <div class="well">
            <p>ADS</p>
          </div>
        </div>
      </div>
    </div>

    <h4>Chart is above this text</h4>

  </div>
</template>

<style scoped>
</style>

<script>

export default {
  components: {

  },
  data () {
    return {
      chartData: {
        labels: ['Post1', 'Post2', 'Post3'],
        datasets: [
          {
            label: 'Sentiment',
            backgroundColor: '#007979',
            data: [40, 10, 20]
          },
          {
            label: 'Upvotes', // why not shaded?
            backgroundColor: '#f87900',
            data: [1, 3, 2] // how get different scales?
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  }
}

</script>
