import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { CatInterface } from '~/interfaces/cat.interface'
import { BreedInterface } from '~/interfaces/breed.interface'
import { ColorInterface } from '~/interfaces/color.interface'

const catRoute = '/cats/'
const breedRoute = '/breeds/'
const colorRoute = '/colors/'

export const state = () => ({
  cats: [] as CatInterface[],
  cat: {} as CatInterface,
  breeds: [] as BreedInterface[],
  colors: [] as ColorInterface[],
  catForm: false,
  breedForm: false,
  colorForm: false
})

export type RootState = ReturnType<typeof state>

export const actions: ActionTree<RootState, RootState> = {

  async fetchCats ({ commit }) {
    const result = await this.$axios.$get(catRoute)
    commit('SET_CATS', result)
  },

  async addCat ({ dispatch }, cat: CatInterface) {
    try {
      delete cat.color
      delete cat.breed
      await this.$axios.$post(catRoute, cat)
      this.app.$toast.success('Gato creado con exito')
      dispatch('fetchCats')
    } catch (e) {
      this.app.$toast.error('Este nombre ya existe ;(')
    }
  },

  async updateCat ({ dispatch }, cat: CatInterface) {
    try {
      const { id } = cat
      delete cat.id
      await this.$axios.$put(catRoute + id, cat)
      this.app.$toast.success('Gato actualizado con exito')
      dispatch('fetchCats')
    } catch (e) {
      this.app.$toast.error('Este nombre ya existe ;(')
    }
  },

  async deleteCat ({ dispatch }, cat: CatInterface) {
    const { id } = cat
    await this.$axios.$delete(catRoute + id).catch(e => e)
    this.app.$toast.success('Gato eliminado con exito')
    dispatch('fetchCats')
  },

  async fetchBreeds ({ commit }) {
    const result = await this.$axios.$get(breedRoute)
    commit('SET_BREEDS', result)
  },

  async fetchColors ({ commit }) {
    const result = await this.$axios.$get(colorRoute)
    commit('SET_COLORS', result)
  },

  async addBreed ({ dispatch }, breed: BreedInterface) {
    try {
      await this.$axios.$post(breedRoute, breed)
      this.app.$toast.success('Raza creada con exito')
      dispatch('fetchBreeds')
    } catch (e) {
      this.app.$toast.error('Este nombre ya existe ;(')
    }
  },

  async deleteBreed ({ dispatch }, breed: BreedInterface) {
    try {
      const { id } = breed
      await this.$axios.$delete(breedRoute + id)
      this.app.$toast.success('Raza eliminado con exito')
      dispatch('fetchBreeds')
    } catch (e) {
      this.app.$toast.error('Esta raza esta en uso :(')
    }
  },

  async addColor ({ dispatch }, color: ColorInterface) {
    try {
      await this.$axios.$post(colorRoute, color)
      this.app.$toast.success('Color creado con exito')
      dispatch('fetchColors')
    } catch (e) {
      this.app.$toast.error('Este nombre ya existe ;(')
    }
  },

  async deleteColor ({ dispatch }, color: ColorInterface) {
    const { id } = color
    try {
      await this.$axios.$delete(colorRoute + id)
      this.app.$toast.success('Color eliminado con exito')
      dispatch('fetchColors')
    } catch (e) {
      this.app.$toast.error('Este color esta en uso :(')
    }
  }
}

export const mutations: MutationTree<RootState> = {
  SET_CATS: (state, cats: CatInterface[]) => (state.cats = cats),
  SET_CAT: (state, cat: CatInterface) => (state.cat = cat),
  SET_COLOR: (state, id: number) => (state.cat.color_id = id),
  SET_BREED: (state, id: number) => (state.cat.breed_id = id),
  CONTROL_FORM: (state, activate: boolean) => (state.catForm = activate),
  SET_BREEDS: (state, breed: BreedInterface[]) => (state.breeds = breed),
  SET_COLORS: (state, colors: ColorInterface[]) => (state.colors = colors),
  BREED_FORM: (state, activate: boolean) => (state.breedForm = activate),
  COLOR_FORM: (state, activate: boolean) => (state.colorForm = activate)
}

export const getters: GetterTree<RootState, RootState> = {
  getCats: state => state.cats,
  getCat: state => state.cat,
  getColors: state => state.colors,
  getBreeds: state => state.breeds,
  getBreedNames: state => state.breeds.map(breed => breed.name),
  getColorNames: state => state.colors.map(color => color.name),
  filterBreed: state => (name:string) => state.breeds.find(breed => breed.name === name),
  filterColor: state => (name:string) => state.colors.find(color => color.name === name),
  getColorName: state => (id:number) => {
    const color = state.colors.find(color => color.id === id)
    // @ts-ignore
    return color.name
  },
  getBreedName: state => (id:number) => {
    const breed = state.breeds.find(breed => breed.id === id)
    // @ts-ignore
    return breed.name
  }
}
