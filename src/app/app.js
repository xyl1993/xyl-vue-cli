import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './app.vue';
// import 'element-ui/lib/theme-chalk/index';
import '../assets/styles/element-variables.scss'
import VueRouter from 'vue-router';
import routes from './app-routes';
import Vuex from 'vuex'
import store from './vuex/index';
import NProgress from 'nprogress';
import 'quill/dist/quill.core.css'
import "./jsplug/SimpleTree/css/SimpleTree.css";
import "nprogress/nprogress.css";
import filters from './filters/index';
import { getToken } from '@/utils/auth';

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);

for (let key in filters) {
  Vue.filter(key, filters[key]);
}

const router = new VueRouter({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return {
        x: 0,
        y: to.meta.savedPosition || 0
      }
    }
  },
  routes: routes
})
NProgress.configure({
  showSpinner: false
});
router.beforeEach((to, from, next) => {
  NProgress.start();
  const meta = to.meta || {};
  if (!getToken()) {
    if (meta.isAuth === false) {
      next()
    } else {
      next('/login')
    }
  }
  document.title = to.meta.title || '和府后台管理系统';
  next()
})
router.afterEach(() => {
  NProgress.done();
});
var app = new Vue({
  router,
  store,
  render: h => h(App),
  data: {
    eventHub: new Vue() //空的vue对象，用来组件间传递事件
  }
}).$mount('#app')