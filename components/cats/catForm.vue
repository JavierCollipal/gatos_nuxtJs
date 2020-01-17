<template>
  <ValidationObserver v-slot="{ invalid }">
    <form @submit.prevent="save">
      <v-row>
        <ValidationProvider v-slot="{ errors }" rules="required">
          <v-text-field
            v-model="cat.name"
            :counter="50"
            label="Nombre"
          />
          <span>{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" rules="required|age_between:0,20">
          <v-text-field
            v-model.number="cat.age"
            label="Edad"
          />
          <span>{{ errors[0] }}</span>
        </ValidationProvider>
      </v-row>

      <v-row>
        <v-btn class="mr-4" @click="controlForm(false)">
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

import { Action, Component, Mutation, Prop, Vue } from 'nuxt-property-decorator'
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

  @Mutation('SET_CAT', { namespace })
  setCat!: Function;

  formTitle: string;

  constructor () {
    super()
    this.formTitle = 'gatos'
  }

  close () {
    this.controlForm(false)
  }

  save () {
    if (this.isUpdate) {
      this.updateCat(this.cat).then(() => {})
    } else {
      this.addCat(this.cat).then(() => {})
    }
    this.close()
  }
}
</script>
