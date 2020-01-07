import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import cats from '~/store/cat'

let catStore: cats

function initialiseStores (store: Store<any>): void {
  catStore = getModule(cats, store)
}

export {
  initialiseStores,
  catStore
}
