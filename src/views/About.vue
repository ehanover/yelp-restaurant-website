<template>
  <!-- The About page shows some background information for the website and me! -->
  <div class="about">
    <my-router-header></my-router-header>

    <div class="container-fluid">
      <div class="row content">

        <div class="col-sm-2 sidenav"></div>
        <div class="col-sm-8 text-left">

          <h4>About This Website</h4>
          <p>I made this website with the Vue.js framework, Bootstrap for the front-end design, Highcharts and Google Maps for displaying data, and the Yelp and Zomato APIs for gathering data.</p>

          <br>
          <h4>Future Extensions </h4>
          <ul>
            <li>Use a backend (maybe with Node.js) to allow more data processing and advanced API functionality</li>
            <li>Implement Twitter API to see tweets about a location and restaurant</li>
            <li>Use Yelp's menu data to display the restaurant menu</li>
            <li>Add a word frequency chart to show popular words in restaurant reviews</li>
            <li>Try replacing Vue another web framework like Angular or React</li>
          </ul>

          <br>
          <h4>About Me</h4>
          <p>I'm an engineering student at the Universitiy of Virginia studying computer science. I love casually making personal projects on my own - I think they're a great way to learn new technologies while having fun. Check out my <a target="_blank" rel="noopener noreferrer" href="https://github.com/ehanover">GitHub</a> for some of my favorite projects.</p>

        </div>
        <div class="col-sm-2 sidenav"></div>

      </div>
    </div>
  </div>
</template>

<script>
import MyRouterHeader from '../components/MyRouterHeader'

export default {
  components: {
    'my-router-header': MyRouterHeader
  }
}
</script>
