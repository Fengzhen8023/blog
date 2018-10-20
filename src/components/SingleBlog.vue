<template>
  <div id="single-blog">
    <h2>{{blog.title}}</h2>
    <p>{{blog.body}}</p>
  </div>
</template>

<script>
  export default {
    name: 'single-blog',
    data() {
      return {
        blogId: this.$route.params.id,
        blog: {
          title: "",
          body: ""
        }
      }
    },
    created: function () {
      var searchBlog = this.blog;
      var blogId = this.blogId;

      // 从数据库中查询数据
      var AV = require('leancloud-storage')
      var query = new AV.Query('blogList');
      query.find().then(function (datas) {
        for (var index in datas) {
          if (datas[index].attributes.index == blogId) {
            searchBlog.title = datas[index].attributes.title;
            searchBlog.body = datas[index].attributes.body;
          }
        }
      })
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  #single-blog {
    width: 90%;
    max-width: 960px;
    margin: 10px auto;
    background-color: #eee;
    border: 1px dotted #ccc;
    padding: 20px;
  }

  h2 {
    margin: 10px 0px;
  }

</style>
