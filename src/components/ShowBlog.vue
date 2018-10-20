<template>
  <div id="show-blog" v-changeWidth="'normal'">
    <h2>博客总览</h2>
    <input type="text" v-model="searchText" placeholder="search blog">
    <div class="single-blog" v-for="blog in searchedBlogs">
      <router-link v-bind:to="'/single/' + blog.index">
        <h2 v-rainbow>{{blog.title | to-uppercase }}</h2>
      </router-link>
      <p>{{blog.body | showProfile}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ShowBlog',
    data() {
      return {
        blogs: [],
        searchText: ""
      }
    },
    computed: {
      // 实现搜索博客
      searchedBlogs: function () {
        var search = this.searchText;   // 下面使用ES5语法，会形成闭包，所以这里需要接收一下searchText参数
        return this.blogs.filter(function (blog) {
          return blog.title.match(search);
        })
      }
    },
    created: function () {
      var blogs_copy = this.blogs;

      // 从数据库中查询数据
      var AV = require('leancloud-storage')
      var query = new AV.Query('blogList');
      query.find().then(function(datas){
        for (var index in datas){
          blogs_copy.push(datas[index].attributes);
        }
      })
    },
    // 自定义局部过滤器
    filters: {
      showProfile: function (value) {
        return value.slice(0, 100);
      }
    },
    // 局部自定义指令,用来自送生成彩色的博客标题
    directives: {
      "rainbow": {
        bind(el, binding, vnode) {
          el.style.color = "#" + Math.random().toString(16).slice(2, 8);
        }
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #show-blog {
    /*text-align: center;*/
    max-width: 800px;
    min-width: 300px;
    text-align: left;
    margin: 0 auto;
  }

  #show-blog .single-blog {
    width: 100%;
    margin: 20px auto;
    padding: 4px 10px;
    border-radius: 4px;
    background-color: #eee;
    box-sizing: border-box;
  }

  .single-blog h2 {
    cursor: pointer;
  }

  input {
    width: 100%;
    height: 35px;
    margin: 10px auto;
    border-radius: 4px;
    border: 1px solid #aaa;
    min-width: 300px;
    text-align: left;
    box-sizing: border-box;
    text-indent: 10px;
  }

  a {
    text-decoration: none;
  }

</style>
