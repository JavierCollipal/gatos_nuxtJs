import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { CatInterface } from '~/interfaces/cat.interface'
import { BreedInterface } from '~/interfaces/breed.interface'
import { ColorInterface } from '~/interfaces/color.interface'

const breedRoute = '/breeds/'
const colorRoute = '/colors/'

export const state = () => ({
  breeds: [] as BreedInterface[],
  colors: [] as ColorInterface[],
  breedForm: false,
  colorForm: false
})

export type RootState = ReturnType<typeof state>

export const actions: ActionTree<RootState, RootState> = {

  async fetchBreeds ({ commit }) {
    const result = await this.$axios.$get(breedRoute)
    commit('SET_BREEDS', result)
  },

  async fetchColors ({ commit }) {
    const result = await this.$axios.$get(colorRoute)
    commit('SET_COLORS', result)
  },

  async addBreed ({ dispatch }, cat: BreedInterface) {
    try {
      await this.$axios.$post(breedRoute, cat)
      this.app.$toast.success('Gato creado con exito')
      dispatch('fetchCats')
    } catch (e) {
      this.app.$toast.error('Este nombre ya existe ;(')
    }
  },

  async deleteBreed ({ dispatch }, cat: BreedInterface) {
    const { id } = cat
    await this.$axios.$delete(breedRoute + id).catch(e => e)
    this.app.$toast.success('Gato eliminado con exito')
    dispatch('fetchCats')
  },

  async addColor ({ dispatch }, cat: ColorInterface) {
    try {
      await this.$axios.$post(breedRoute, cat)
      this.app.$toast.success('Gato creado con exito')
      dispatch('fetchCats')
    } catch (e) {
      this.app.$toast.error('Este nombre ya existe ;(')
    }
  },

  async deleteColor ({ dispatch }, cat: ColorInterface) {
    const { id } = cat
    await this.$axios.$delete(breedRoute + id).catch(e => e)
    this.app.$toast.success('Gato eliminado con exito')
    dispatch('fetchCats')
  }
}

export const mutations: MutationTree<RootState> = {
  SET_BREEDS: (state, cats: CatInterface[]) => (state.breeds = cats),
  SET_COLORS: (state, cats: CatInterface[]) => (state.colors = cats),
  BREED_FORM: (state, activate: boolean) => (state.breedForm = activate),
  COLOR_FORM: (state, activate: boolean) => (state.colorForm = activate)
}

export const getters: GetterTree<RootState, RootState> = {
  getColors: state => state.colors,
  getBreed: state => state.breeds
}
