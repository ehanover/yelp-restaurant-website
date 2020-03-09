<template>
  <div id="app">

    <br>
    <router-view/>
    <br><br><br><br>

    <footer class="footer" id="footer">
      <p>Created by <a target="_blank" rel="noopener noreferrer" href="https://github.com/ehanover">Ethan Hanover</a> | Powered by <a target="_blank" rel="noopener noreferrer" href="https://www.yelp.com/fusion">Yelp Fusion</a></p>
    </footer>

  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 30px;
}

#footer {
  position: fixed;
  left: 50%;
  bottom: 0;
  margin-bottom: -15px;
  margin-left: -190px;
  padding-left: 5px;
  padding-right: 5px;
  background-color: white;
}
</style>
