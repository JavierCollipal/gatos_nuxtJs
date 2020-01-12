import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { CatInterface } from '~/utils/interfaces/cat.interface'

export const state = () => ({
  cats: [] as CatInterface[],
  insertForm: false,
  updateModal: false
})

export type RootState = ReturnType<typeof state>

export const actions: ActionTree<RootState, RootState> = {

  async fetchCats ({ commit }) {
    const result = await this.$axios.$get('/cats')
    commit('SET_CATS', result)
  },

  async addCat ({ dispatch }, cat: CatInterface) {
    try {
      await this.$axios.$post('/cats', cat)
      this.app.$toast.success('Gato creado con exito')
      dispatch('fetchCats')
    } catch (e) {
      this.app.$toast.error('Este nombre ya existe ;(')
    }
  },

  async updateCat ({ dispatch }, cat: CatInterface) {
    try {
      await this.$axios.$put('/cats', cat)
      this.app.$toast.success('Gato actualizado con exito')
      dispatch('fetchCats')
    } catch (e) {
      this.app.$toast.error('Este nombre ya existe ;(')
    }
  }
}

export const mutations: MutationTree<RootState> = {
  SET_CATS: (state, cats: CatInterface[]) => (state.cats = cats),
  CONTROL_FORM: (state, activate: boolean) => (state.insertForm = activate),
  CONTROL_MODAL: (state, activate: boolean) => (state.updateModal = activate)
}

export const getters: GetterTree<RootState, RootState> = {
  getCats: state => state.cats
}
