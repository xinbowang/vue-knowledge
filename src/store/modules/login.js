import * as types from '../mutation-types'
import loginApi from '@/api/login'
import {removeStorage} from '@/api/sessionStorage'
// state
const state = {
}

// getters
const getters = {
}

// actions
const actions = {
  login ({commit}, data) {
    return loginApi(`/api/student/UserLogin`, data);
  },
  backToken({commit, rootState}, tokens) {
    commit(types.TOKEN, {tokens, rootState});
  },
  logout({commit, rootState}, tokens) {
    commit(types.LOGOUT, {tokens, rootState});
  }
}

// mutations
const mutations = {
  [types.LOGOUT](state, tokens) {
    removeStorage('userInfo');
    tokens.rootState.token = null;
  },
  [types.TOKEN](state, tokens) {
    tokens.rootState.token = tokens.tokens;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
