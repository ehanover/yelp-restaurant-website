<template>
  <div class="about">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>

    <div class="container">
      <div class="row content">

        <div class="col-sm-2 sidenav"></div>
        <div class="col-sm-8 text-left">

          <h4>Future Extensions </h4>
          <ul>
            <li>Use a backend to allow more data processing and API usage</li>
            <li>Implement Twitter API to see tweets about a location + restaurant</li>
            <li>Use Yelp's menu data to display the restaurant menu or other data points</li>
            <li>Replace Vue another web framework like Angular</li>
          </ul>

          <h4>About Me</h4>
          <p>I'm an engineering student at the Universtiy of Virginia studying computer science. I love casual making personal projects on my own - I think they're a great way to learn new technologies while having fun. Check out my Github for some of my favorite projects.</p>

        </div>
        <div class="col-sm-2 sidenav"></div>

      </div>
    </div>
  </div>
  <!-- TODO copy github readme -->
</template>

<script>

export default {

  async mounted () {

  }
}

</script>
