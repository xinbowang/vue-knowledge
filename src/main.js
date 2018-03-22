// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from './api/http'

// 引入bootstrap4.0 -> 依赖popper.js
import 'popper.js/dist/popper'
import 'bootstrap/dist/js/bootstrap'
import 'bootstrap/dist/css/bootstrap'
// 重置全局样式
import './assets/css/base'

// 将axios挂载到prototype上，在组件中可以直接使用this.axios访问
Vue.prototype.axios = axios;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
