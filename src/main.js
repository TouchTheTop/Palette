// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/index'
import Vuex from 'vuex'
import axios from 'axios'
import http from 'http'
import ASK from './store/ask'
import API from '../api'

Vue.prototype.$axios = axios
Vue.prototype.$http = http
Vue.prototype.$ASK = ASK
Vue.prototype.$API = API

// 拼接POST DATA
Vue.prototype.$concatPost = function (obj) {
  var route = '?'
  for (var i in obj) {
    route += (route != '?' ? '&' : '') + i + '=' + obj[i]
  }
  return route
}

Vue.use(Vuex)
Vue.use(ElementUI)
Vue.config.productionTip = false

var UpPost = axios.create({
  baseURL: 'http://localhost:3030',
  timeout: 3000,
  method: 'POST',
  headers: {
    "Content-Type": "multipart/form-data"
  },
  anync: true,
  contentType: false,
  processData: false,
})

Vue.prototype.$UpPost = UpPost

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
