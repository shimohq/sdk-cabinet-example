import Vue from 'vue'
import Vuex from 'vuex'

import User from './modules/user'
import File from './modules/file'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    User,
    File
  }
})
