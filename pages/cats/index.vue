<template>
  <div>
    <cat-list :cats="cats" />
  </div>
</template>

<script lang="ts">
import { Component, Getter, Vue } from 'nuxt-property-decorator'
import CatList from '~/components/cats/catList.vue'
import { CatInterface } from '~/utils/interfaces/cat.interface'
const namespace: string = 'cats'

@Component({
  components: { CatList }
})
export default class Index extends Vue {
  @Getter('getCats', { namespace })
  cats!: CatInterface[]
}
</script>
