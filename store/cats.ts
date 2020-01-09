import { ActionTree, MutationTree, GetterTree } from 'vuex'

export const state = () => ({
  cats: [] as []
})

export type RootState = ReturnType<typeof state>

export const actions: ActionTree<RootState, RootState> = {
  async fetchCats ({ commit }) {
    const result = await this.$axios.$get('/cats')
    commit('SET_CATS', result)
  }
}

export const mutations: MutationTree<RootState> = {
  SET_CATS: (state, cats: any) => {state.cats = cats},
}

export const getters: GetterTree<RootState, RootState> = {
  getCats: state => state.cats
}
