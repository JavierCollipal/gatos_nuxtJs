<template>
  <div>{{ cats }}</div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import CatModule from '~/store/cat'

@Component
export default class CatList extends Vue {
  cats!: string[];

  public created () {
    const catStore = getModule(CatModule, this.$store)
    catStore.callCats()

    this.cats = catStore.getCats
  }
}
</script>
