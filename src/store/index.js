import Vue from 'vue'
import Vuex from 'vuex'
// import mutations from './mutations'
// import actions from './actions'
import login from './modules/login'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    token: null
  },
  // mutations, // 实现事件
  // actions, // 派发事件
  modules: {
    login
  },
  strict: debug, // 开发环境下使用严格模式
  plugins: debug ? [createLogger()] : [] // 开发环境输出log
})
