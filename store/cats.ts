import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { CatInterface } from '~/utils/interfaces/cat.interface'

export const state = () => ({
  cats: [] as CatInterface[],
  cat: {} as CatInterface,
  catForm: false
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
      const { id } = cat
      console.log(cat)
      delete cat.id
      delete cat.created_at
      delete cat.updated_at
      await this.$axios.$put('/cats/' + id, cat)
      this.app.$toast.success('Gato actualizado con exito')
      dispatch('fetchCats')
    } catch (e) {
      this.app.$toast.error('Este nombre ya existe ;(')
    }
  },

  async deleteCat ({ dispatch }, cat: CatInterface) {
    const { id } = cat
    await this.$axios.$delete('/cats/' + id).catch(e => e)
    this.app.$toast.success('Gato eliminado con exito')
    dispatch('fetchCats')
  }
}

export const mutations: MutationTree<RootState> = {
  SET_CATS: (state, cats: CatInterface[]) => (state.cats = cats),
  SET_CAT: (state, cat: CatInterface) => (state.cat = cat),
  CONTROL_FORM: (state, activate: boolean) => (state.catForm = activate)
}

export const getters: GetterTree<RootState, RootState> = {
  getCats: state => state.cats,
  getCat: state => state.cat
}
