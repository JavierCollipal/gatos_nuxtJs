<template>
  <ValidationObserver v-slot="{ invalid }">
    <form @submit.prevent="save">
      <v-row>
        <v-col cols="6">
          <ValidationProvider v-slot="{ errors }" rules="required">
            <v-text-field
              v-model="cat.name"
              :counter="50"
              label="Nombre"
            />
            <span>{{ errors[0] }}</span>
          </ValidationProvider>
        </v-col>
        <v-col cols="6">
          <ValidationProvider v-slot="{ errors }" rules="required|age_between:0,20">
            <v-text-field
              v-model.number="cat.age"
              label="Edad"
            />
            <span>{{ errors[0] }}</span>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <ValidationProvider v-slot="{ errors }" rules="required">
            <v-select
              v-model="cat.breed.name"
              :items="breedNames"
              label="Razas"
              @input="onBreedSelect"
            />
            <span>{{ errors[0] }}</span>
          </ValidationProvider>
        </v-col>
        <v-col cols="6">
          <ValidationProvider v-slot="{ errors }" rules="required">
            <v-select
              v-model="cat.color.name"
              :items="colorNames"
              label="Colores"
              @change="onColorSelect"
            />
            <span>{{ errors[0] }}</span>
          </ValidationProvider>
        </v-col>
      </v-row>

      <v-row>
        <v-btn class="mr-4" @click="close">
          Cancelar
        </v-btn>
        <v-btn class="mr-4" type="submit" :disabled="invalid">
          Guardar
        </v-btn>
      </v-row>
    </form>
  </ValidationObserver>
</template>

<script lang="ts">

import { Action, Component, Getter, Mutation, Prop, Vue } from 'nuxt-property-decorator'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { CatInterface } from '~/interfaces/cat.interface'

const namespace: string = 'cats'

@Component({
  components: {
    ValidationProvider,
    ValidationObserver
  }
})
export default class CatForm extends Vue {
  @Prop({ type: Object, required: true })
  cat!: CatInterface;

  @Prop({ type: Boolean, required: true })
  isUpdate!: boolean

  @Action('addCat', { namespace })
  addCat!: Function;

  @Action('updateCat', { namespace })
  updateCat!: Function;

  @Mutation('CONTROL_FORM', { namespace })
  controlForm!: Function;

  @Getter('getCat', { namespace })
  getCat!: Function;

  @Getter('getColorName', { namespace })
  getColorName!: Function;

  @Getter('getBreedName', { namespace })
  getBreedName!: Function;

  @Action('fetchBreeds', { namespace })
  fetchBreeds!: Function

  @Action('fetchColors', { namespace })
  fetchColors!: Function

  @Getter('filterColor', { namespace })
  filterColor!: Function

  @Getter('filterBreed', { namespace })
  filterBreed!: Function

  @Mutation('SET_COLOR', { namespace })
  setColor!: Function

  @Mutation('SET_BREED', { namespace })
  setBreed!: Function

  breedName: string;

  colorName: string;

  formTitle: string;

  @Getter('getBreedNames', { namespace })
  breedNames!: string[]

  @Getter('getColorNames', { namespace })
  colorNames!: string[]

  constructor () {
    super()
    this.formTitle = 'gatos'
    this.breedName = ''
    this.colorName = ''
  }

  resetSelectValues () {
    this.breedName = ''
    this.colorName = ''
  }

  close () {
    this.controlForm(false)
    this.resetSelectValues()
  }

  save () {
    // breed and color select use the cat state for id insert/update
    const cat = Object.assign(this.getCat, this.cat)
    if (this.isUpdate) {
      this.updateCat(cat).then(() => {})
    } else {
      this.addCat(cat).then(() => {})
    }
    this.close()
  }

  onColorSelect () {
    const { id } = this.filterColor(this.cat.color.name)
    this.setColor(id)
  }

  onBreedSelect () {
    const { id } = this.filterBreed(this.cat.breed.name)
    this.setBreed(id)
  }
}
</script>
