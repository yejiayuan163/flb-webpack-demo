import * as types from '../types'

const state = {
  buttonState:{investResultBtnLoading: false}
}
const actions = {
  buttonState({commit},data){
    commit(types.BUTTON_STATE,data)
  }
}

const getters = {
  // account: state => state.account
}

const mutations = {
  [types.BUTTON_STATE] (state,data) {
    state.buttonState = {...state.buttonState,...data}
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
