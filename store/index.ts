
export const strict = false

export const actions = {
  // @ts-ignore
  async nuxtServerInit ({ dispatch }) {
    await dispatch('cats/fetchCats')
    await dispatch('properties/fetchBreeds')
    await dispatch('properties/fetchColors')
  }
}
