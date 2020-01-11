import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { CatInterface } from '~/utils/interfaces/cat.interface'

export const state = () => ({
  cats: [] as CatInterface[]
})

export type RootState = ReturnType<typeof state>

export const actions: ActionTree<RootState, RootState> = {

  async fetchCats ({ commit }) {
    const result = await this.$axios.$get('/cats')
    commit('SET_CATS', result)
  },
  async addCat ({ dispatch }, cat: CatInterface) {
    const result = await this.$axios.$post('/cats', cat).catch(() => false)
    if (result) { dispatch('fetchCats') }
  }
}

export const mutations: MutationTree<RootState> = {
  SET_CATS: (state, cats: CatInterface[]) => (state.cats = cats)
}

export const getters: GetterTree<RootState, RootState> = {
  getCats: state => state.cats
}
