<template>
  <div id="app">
    <Nav></Nav>
    <router-view></router-view>
    <!--<SingleBlog></SingleBlog>-->
  </div>
</template>

<script>
  import AddBlog from './components/AddBlog.vue'
  import ShowBlog from './components/ShowBlog.vue'
  import Nav from './components/Nav.vue'
  import SingleBlog from './components/SingleBlog.vue'


  export default {
    name: 'App',
    components: {
      AddBlog,
      ShowBlog,
      Nav,
      SingleBlog
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

</style>
