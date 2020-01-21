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
import { Prop, Watch } from '~/node_modules/nuxt-property-decorator'
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

    @Prop({ type: Boolean, required: true })
    reset!: boolean

    selected!: string

    constructor () {
      super()
      this.selected = ''
    }

    created () {
      this.fetchColors()
    }

    @Watch('reset')
    onReset () {
      this.selected = ''
    }

    onSelect () {
      const { id } = this.filterColor(this.selected)
      this.setColor(id)
    }
}
</script>
