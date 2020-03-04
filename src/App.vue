<template>
  <div id="app">

    <br>
    <router-view/>
    <br><br><br><br>

    <footer class="footer" id="footer">
      <p><a href="https://github.com/ehanover">By Ethan Hanover</a> | Powered by <a href="https://www.yelp.com/fusion">Yelp Fusion</a></p>
    </footer>

  </div>
</template>

<style>
/* TODO change defaults */

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
}

#nav {
  padding: 30px;
}

#footer {
  position: fixed;
  /* top: 50%; */
  left: 50%;
  bottom: 0;
  margin-bottom: -10px;
  margin-left: -150px;
}

/* #nav a {
  font-weight: bold;
  color: #2c3e50;
} */

/* #nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
