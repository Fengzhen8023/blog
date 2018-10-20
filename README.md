### 一、实例demo简介

这是使用Vue实现的一个简易博客系统，功能包括：写博客，博客总览以及点击查看博客。项目虽然不大，但是包括的知识点确实不少，主要的知识点有：Vue路由的设置以及路由传参、Vue自定义指令、Vue自定义过滤器、使用Vue连接数据库等。

我在项目中使用的是第三方云数据库—— **[leancloud](https://leancloud.cn/)** 。所以如果你对项目中使用Vue操作数据库的代码不熟悉的话，可以到官网进行详细的了解。而且，如果你想做一些小demo的话，推荐使用这个云数据库，它的免费业务肯定是足够你用的了。

最后展示一下这个实例demo——简易博客系统：

这是写博客的页面，点击【添加博客】之后，我们写好的博客就会被写入到云数据库中

![](https://upload-images.jianshu.io/upload_images/3879603-fd4b1221c35617b4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这是博客总览页面，我们写过的博客，可以在这里全部展现出来，而且有一个搜索框，可以显示实时的搜索结果

![](https://upload-images.jianshu.io/upload_images/3879603-ab3ab97e893b723a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这是博客详情界面，点击你要查看的博客，就可来到每条博客的详情页面信息

![](https://upload-images.jianshu.io/upload_images/3879603-fa37adf27a98de19.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

最后还想说的是，虽然我这边是做的是简易博客系统，不过我们将博客改成留言板，这个就是一个非常常见的留言板系统了，需要的同学可以考虑修改一下。



### 二、实例demo使用详解

如果你想直接使用这个实例demo的代码，那么首先需要到  **[leancloud官网](https://leancloud.cn/)** 注册一个账号，并创建一个数据库，数据库中至少要包括含 **index、title、body、BlogAuthor、BlogCategrogy** 字段，并且 **index** 字段要设置成自增，因为这是我们数据库的主键，使用它来唯一标识我们的数据。

![](https://upload-images.jianshu.io/upload_images/3879603-cf823f43daf37c0a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

然后获得你的 **App ID** 和 **App Key** ，我们在Vue中需要使用到这两个参数连接数据库。 

![](https://upload-images.jianshu.io/upload_images/3879603-6d9d328a060f59b6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

然后在我们项目中的 **main.js** 中，将你的 **APP ID** 和 **APP KEY** 填写到对应的位置，就可以正常使用这个项目代码开始你自己的创作了。

```js
// 在全局状态下，初始化数据库，这里我们初始化一次即可
// 在其他组件中，我们直接引入数据库，而不需要重复初始化，否则会报错
var APP_ID = '你申请的APP ID';
var APP_KEY = '你申请的APP KEY';
var AV = require('leancloud-storage')
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});
```

### 三、实例demo主要功能代码

我们在项目中使用到了自定义指令和自定义过滤器。这两者分别可以定义成全局的和局部的，首先看一下在 **main.js** 中全局定义的自定义指令和过滤器：

```js
// 自定义指令，用来制定博客展示页面的宽度
Vue.directive("changeWidth", {
  bind(el, binding, vnode) {
    if (binding.value == 'wide') {
      el.style.maxWidth = '1260px';
    }
    else if (binding.value == 'narrow') {
      el.style.maxWidth = '560px';
    }
    else if (binding.value == 'normal') {
      el.style.maxWidth = '800px';
    }
  }
});

// 自定义全局过滤器，使博客的标题变为大写
Vue.filter('to-uppercase', function (value) {
  return value.toUpperCase();
});
```

如果在Vue组件中定义局部的自定义指令和自定义过滤器，使用如下的代码。提示一下，此处的 **filters** 和 **directives** 和 **data、conputed** 一样，是组件的属性。

```js
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
```

我们在项目中处理数据的时候，主要是向数据库中存储数据已经从数据库中获取数据，具体的代码如下：

```js
// 从数据库中查询数据
var AV = require('leancloud-storage')
var query = new AV.Query('blogList');
query.find().then(function(datas){
  for (var index in datas){
    blogs_copy.push(datas[index].attributes);
  }
})


// 将博客提交到数据库
var AV = require('leancloud-storage')
var blogList = AV.Object.extend('blogList');
var myBlog = new blogList();
myBlog.save({
  BlogAuthor: this.blog.author,
  BlogCategrogy: this.blog.categories.join(" "),
  body: this.blog.content,
  title: this.blog.title
});
```
