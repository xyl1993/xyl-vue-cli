import Vue from 'vue';
import App from './app.vue';
import VueRouter from 'vue-router';
import routes from './app-routes';

import "nprogress/nprogress.css";


Vue.use(VueRouter);

const router = new VueRouter({
  routes:routes
})

var app =new Vue({
  router,
  render: h => h(App),
  data:{
    eventHub: new Vue()    //空的vue对象，用来组件间传递事件
  }
}).$mount('#app')