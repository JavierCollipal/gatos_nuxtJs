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

      <validation-observer>
        <v-row>
          <v-col cols="6">
            <BreedSelect :reset="resetSelects" />
          </v-col>
          <v-col cols="6">
            <ColorSelect :reset="resetSelects" />
          </v-col>
        </v-row>
      </validation-observer>

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
import BreedSelect from '~/components/properties/breed/breedSelect.vue'
import ColorSelect from '~/components/properties/color/colorSelect.vue'

const namespace: string = 'cats'

@Component({
  components: {
    ValidationProvider,
    ValidationObserver,
    BreedSelect,
    ColorSelect
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

  formTitle: string;
  resetSelects!: boolean;

  constructor () {
    super()
    this.formTitle = 'gatos'
    this.resetSelects = false
  }

  resetSelectValues () : Promise<any> {
    return new Promise((resolve) => {
      this.resetSelects = true
      this.controlForm(false)
      resolve()
    })
  }

  close () {
    this.resetSelectValues().then(() => {
      this.resetSelects = false
    })
  }

  test () {
    this.resetSelects = false
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
}
</script>
