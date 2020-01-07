import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

@Module({
  name: 'cat',
  stateFactory: true,
  namespaced: true
})
export default class CatModule extends VuexModule {
  public cats: string[] = []

  @Mutation
  public addCat (cat: string) {
    this.cats.push(cat)
  }

  @Mutation
  setCats (cats: string[]) {
    this.cats = cats
  }

  get onlyLanita (): string[] {
    return this.cats.filter(cat => cat === 'lanita')
  }

  get getCats () : string[] {
    return this.cats
  }

  @Action
  callCats (): any {
    const apiCall = ['lanita', 'cuchufli']
    this.setCats(apiCall)
  }
}
