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
  async addCat ({ commit }, cat: CatInterface) {
    console.log('entro el valor en la action, hora de llamar a axios')
    const test = await this.$axios.$post('/cats', cat)
    console.log(test)
    commit('ADD_CAT', cat)
  }
}

export const mutations: MutationTree<RootState> = {
  SET_CATS: (state, cats: CatInterface[]) => (state.cats = cats),
  ADD_CAT: (state, cat: CatInterface) => (state.cats.push(cat))
}

export const getters: GetterTree<RootState, RootState> = {
  getCats: state => state.cats
}
