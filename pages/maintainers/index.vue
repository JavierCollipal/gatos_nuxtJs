<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <breed-list :breeds="breeds" />
      </v-col>

      <v-col>
        <color-list :colors="colors" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Getter, Vue } from 'nuxt-property-decorator'
import BreedList from '~/components/properties/breed/breedList.vue'
import ColorList from '~/components/properties/color/colorList.vue'
import { BreedInterface } from '~/interfaces/breed.interface'
import { ColorInterface } from '~/interfaces/color.interface'

const namespace: string = 'cats'

@Component({
  components: { BreedList, ColorList }
})
export default class Index extends Vue {
    @Getter('getBreeds', { namespace })
    breeds!: BreedInterface[]

    @Getter('getColors', { namespace })
    colors!: ColorInterface[]
}
</script>
