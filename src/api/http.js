/**
 * Created by superman on 17/2/16.
 * http配置
 */

import axios from 'axios'
import store from '@/store'
import * as types from '@/store/mutation-types'
import router from '@/router'

// axios 配置
axios.defaults.timeout = 50000;

// http request 拦截器
axios.interceptors.request.use(
  config => {
  if (store.state.token) {
  config.headers.Authorization = `token ${store.state.token}`;
}
return config;
},
err => {
  return Promise.reject(err);
});

// http response 拦截器
axios.interceptors.response.use(
  response => {
  return response;
},
error => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // 401 清除token信息并跳转到登录页面
        store.commit(types.LOGOUT);
        router.replace({
          path: 'login',
          query: {redirect: router.currentRoute.fullPath}
        })
        break;
      default:
        /* 普通401拦截直接返回到登录页面 */
        store.commit(types.LOGOUT);
        router.push('/login');
    }
  }
  // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
  return Promise.reject(error.response.data)
});

export default axios;
