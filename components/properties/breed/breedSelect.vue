<template>
  <v-select
    v-model="selected"
    :items="names"
    label="Razas"
    @change="onSelect"
  />
</template>

<script lang="ts">

import { Action, Component, Getter, Mutation, Vue } from 'nuxt-property-decorator'

const namespace: string = 'cats'

@Component
export default class BreedSelect extends Vue {
    @Getter('getBreedNames', { namespace })
    names!: string[]

    @Action('fetchBreeds', { namespace })
    fetchBreeds!: Function

    @Mutation('SET_BREED', { namespace })
    setBreed!: Function

    @Getter('filterBreed', { namespace })
    filterBreed!: Function

    selected!: string

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
}
</script>
