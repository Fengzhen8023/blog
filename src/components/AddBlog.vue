<template>
  <div id="add-blog">
    <h1>{{pageTitle}}</h1>
    <form action="#" v-if="!submited">
      <label for="bolg-title">博客标题:</label>
      <input type="text" id="blog-title" v-model="blog.title">
      <label for="blog-content">博客内容:</label>
      <textarea id="boog-content" cols="30" rows="10" v-model="blog.content"></textarea>

      <label>博客分类：</label>
      <div class="checkbox">
        <label for="sing">歌曲 </label>
        <input type="checkbox" id="sing" value="sing" v-model="blog.categories">
        <label for="movie">影视 </label>
        <input type="checkbox" id="movie" value="movie" v-model="blog.categories">
        <label for="plan">规划 </label>
        <input type="checkbox" id="plan" value="plan" v-model="blog.categories">
        <label for="technology">技术 </label>
        <input type="checkbox" id="technology" value="technology" v-model="blog.categories">
      </div>

      <label for="blog-author">博客作者:</label>
      <select v-model="blog.author">
        <option v-for="author in authors">{{author}}</option>
      </select>

      <button v-on:click.prevent="postBlog">添加博客</button>
    </form>

    <!-- 展示输入的博客信息 -->
    <div class="show-blog">
      <p class="title">博客标题：{{blog.title}}</p>
      <p class="title">博客内容：</p>
      <p>{{blog.content}}</p>
      <p class="title">博客作者：{{blog.author}}</p>
      <div class="title">
        博客分类：
        <ul>
          <li v-for="category in blog.categories">{{category}}</li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        blog: {
          title: "",
          content: "",
          categories: [],
          author: ""
        },
        authors: ["FengZhen", "Tom", "Jack"],
        submited: false,
        pageTitle: "博客总览",
      }
    },
    methods: {
      // 点击【添加博客】，将博客提交到数据库，同时修改相应的数据，显示在页面上
      postBlog: function () {
        var AV = require('leancloud-storage')
        var blogList = AV.Object.extend('blogList');
        var myBlog = new blogList();
        myBlog.save({
          BlogAuthor: this.blog.author,
          BlogCategrogy: this.blog.categories.join(" "),
          body: this.blog.content,
          title: this.blog.title
        });

        // 添加博客成功之后，改变页面中的内容
        this.submited = true;
        this.pageTitle = "博客添加成功"
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #add-blog {
    width: 90%;
    min-width: 800px;
    margin: 10px auto;
    font-family: "微软雅黑";
  }

  h1 {
    margin: 10px 0px;
  }

  label {
    display: block;
    margin: 10px auto;
    font-weight: bolder;
  }

  input[type='text'] {
    width: 40%;
    min-width: 380px;
    height: 30px;
  }

  textarea {
    width: 40%;
    min-width: 380px;
    height: 100px;
    resize: none;
  }

  .checkbox {
    margin-bottom: 20px;
  }

  .checkbox label {
    display: inline-block;
    margin: -2px 0px 0 10px;
  }

  .checkbox input {
    position: relative;
    top: 2px;
    left: -2px;
  }

  select {
    width: 40%;
    min-width: 300px;
    height: 30px;
  }

  button {
    width: 120px;
    height: 45px;
    display: block;
    margin: 10px 0px;
    background-color: crimson;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 18px;
  }

  .show-blog {
    background-color: #cccccc;
    padding: 10px 30px;
  }

  .show-blog .title {
    font-weight: bolder;
    margin: 20px 0px;
    /*color: crimson;*/
  }

  ul {
    display: inline-block;
  }

  li {
    list-style: none;
    display: inline-block;
    margin: 0px 10px 0 0;
  }

</style>
