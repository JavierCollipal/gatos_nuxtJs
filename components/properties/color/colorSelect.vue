<template>
  <ValidationProvider v-slot="{ errors }" rules="required">
    <v-select
      v-model="selected"
      :items="names"
      label="Colores"
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
export default class ColorSelect extends Vue {
    @Getter('getColorNames', { namespace })
    names!: string[]

    @Action('fetchColors', { namespace })
    fetchColors!: Function

    @Mutation('SET_COLOR', { namespace })
    setColor!: Function

    @Getter('filterColor', { namespace })
    filterColor!: Function

    selected!: string

    constructor () {
      super()
      this.selected = ''
    }

    created () {
      this.fetchColors()
    }

    onSelect () {
      const { id } = this.filterColor(this.selected)
      this.setColor(id)
    }
}
</script>
