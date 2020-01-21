<template>
  <ValidationProvider v-slot="{ errors }" rules="required">
    <v-select
      v-model="selected"
      :items="names"
      label="Razas"
      @input="onSelect"
    />
    <span>{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script lang="ts">

import { Action, Component, Getter, Mutation, Prop, Vue, Watch } from 'nuxt-property-decorator'
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

    @Prop({ type: Boolean, required: true })
    reset!: boolean

    selected: string

    constructor () {
      super()
      this.selected = ''
    }

    created () {
      this.fetchBreeds()
    }

    onSelect () {
      const { id } = this.filterBreed(this.selected)
      this.setBreed(id)
    }

    @Watch('reset')
    onReset () {
      this.selected = ''
    }
}
</script>
