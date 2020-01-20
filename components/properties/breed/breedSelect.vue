<template>
  <ValidationProvider v-slot="{ errors }" rules="required">
    <v-select
      v-model="display"
      :items="names"
      label="Razas"
      @change="onSelect"
    />
    <span>{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script lang="ts">

import { Action, Component, Getter, Mutation, Vue } from 'nuxt-property-decorator'
import { ValidationObserver, ValidationProvider } from '~/node_modules/vee-validate'

const namespace: string = 'cats'

@Component({
  components: { ValidationObserver, ValidationProvider }
})
export default class BreedSelect extends Vue {
    @Getter('getBreedNames', { namespace })
    names!: string[]

    @Action('fetchBreeds', { namespace })
    fetchBreeds!: Function

    @Mutation('SET_BREED', { namespace })
    setBreed!: Function

    @Getter('filterBreed', { namespace })
    filterBreed!: Function

    display!: string
    selected!: string

    constructor () {
      super()
      this.selected = ''
      this.display = ''
    }

    created () {
      this.fetchBreeds()
    }

    onSelect () {
      this.selected = this.display
      const { id } = this.filterBreed(this.selected)
      this.setBreed(id)
      this.selected = ''
    }
}
</script>
