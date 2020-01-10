<template>
  <div>
    <cat-list :cats="cats" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CatList from '~/components/cats/catList.vue'
import { CatInterface } from '~/utils/interfaces/cat.interface'

@Component({
  components: { CatList }
})
export default class Index extends Vue {
  cats!: CatInterface[]

  created () {
    this.cats = this.$store.getters['cats/getCats'] as CatInterface[]
  }
}
</script>
