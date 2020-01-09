<template>
  <div>
    <cat-list :cats="cats" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getters } from '~/store/cats'
import CatList from '~/components/cats/catList.vue'

@Component({
  components: { CatList }
})
export default class Index extends Vue {
  cats: [] = []

  created () {
    this.cats = this.$store.getters['cats/getCats'] as ReturnType<typeof getters.getCats>
  }
}
</script>
