import Vuex from 'vuex'
import CatModule from '~/store/cat'

export function createStore () {
  return new Vuex.Store({
    modules: {
      CatModule
    }
  })
}
