<template>
  <div>
    <breed-list :breeds="breeds" />
  </div>
</template>

<script lang="ts">
import { Component, Getter, Vue } from 'nuxt-property-decorator'
import BreedList from '~/components/properties/breed/breedList.vue'
import { BreedInterface } from '~/interfaces/breed.interface'
const namespace: string = 'cats'

@Component({
  components: { BreedList }
})
export default class Index extends Vue {
    @Getter('getBreeds', { namespace })
    breeds!: BreedInterface[]
}
</script>
