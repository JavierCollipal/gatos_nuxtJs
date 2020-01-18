<template>
  <v-select
    v-model="selected"
    :items="names"
    label="Colores"
    @change="onSelect"
  />
</template>

<script lang="ts">

import { Action, Component, Getter, Mutation, Vue } from 'nuxt-property-decorator'

const namespace: string = 'cats'

@Component
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
