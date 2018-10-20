// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import AddBlog from './components/AddBlog.vue'
import ShowBlog from './components/ShowBlog.vue'
import SingleBlog from './components/SingleBlog.vue'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(VueRouter)



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

// 定义路由
const router=new VueRouter({
  routes:[
    {path:'/',component:ShowBlog},
    {path:'/add',component:AddBlog},
    {path:'/single/:id',component:SingleBlog}   // 注意这里是如何给路由传参的
  ],
  mode:'history'
});


// 在全局状态下，初始化数据库，这里我们初始化一次即可
// 在其他组件中，我们直接引入数据库，而不需要重复初始化，否则会报错
var APP_ID = '你申请的APP ID';
var APP_KEY = "你申请的APP KEY";
var AV = require('leancloud-storage')
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
