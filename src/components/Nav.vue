<template>
  <div id="nav">
    <ul>
      <li>
        <router-link to="/">博客</router-link>
      </li>
      <li>
        <router-link to="/add">写博客</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Nav',
    data() {
      return {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ul {
    height: 60px;
    background-color: crimson;
    text-align: center;
    line-height: 60px;
    margin-bottom: 20px;
  }

  li {
    height: 20px;
    line-height: 20px;
    list-style: none;
    display: inline-block;
    padding: 6px 15px;
    margin: 0px 10px;
    font-size: 20px;
    color: #fff;
    background-color: #eee;
    border-radius: 4px;
  }

  a {
    text-decoration: none;
  }


</style>
