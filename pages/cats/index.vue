<template>
  <cat-list :cats="cats" />
</template>

<script lang="ts">
import { Component, Getter, Vue } from 'nuxt-property-decorator'
import CatList from '~/components/cats/catList.vue'
import { CatInterface } from '~/interfaces/cat.interface'
const namespace: string = 'cats'

@Component({
  components: { CatList }
})
export default class extends Vue {
  @Getter('getCats', { namespace })
  cats!: CatInterface[]
}
</script>
