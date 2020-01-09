import { ActionTree } from 'vuex'
import { RootState } from '~/store/cats'

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({dispatch}) {
    await dispatch('cats/fetchCats')
  },
}

