<template>
  <ValidationObserver v-slot="{ invalid }">
    <form @submit.prevent="save">
      <v-row>
        <ValidationProvider v-slot="{ errors }" rules="required|alpha">
          <v-text-field
            v-model="formItem.name"
            :counter="50"
            label="Nombre"
          />
          <span>{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" rules="required|age_between:0,20">
          <v-text-field
            v-model.number="formItem.age"
            label="Edad"
          />
          <span>{{ errors[0] }}</span>
        </ValidationProvider>
      </v-row>

      <v-row>
        <v-btn class="mr-4">
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

import { Action, Component, Vue } from 'nuxt-property-decorator'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { CatInterface } from '~/utils/interfaces/cat.interface'
const namespace: string = 'cats'

  @Component({
    components: {
      ValidationProvider,
      ValidationObserver
    }
  })
export default class CatForm extends Vue {
  @Action('addCat', { namespace })
  addCat!: Function;

  formTitle: string;

  formItem!: CatInterface;

  constructor () {
    super()
    this.formTitle = 'gatos'
    this.formItem = { name: '' }
  }

  close () {
    /* ACA ESTUDIAR COMO PASARLE EL FORM ITEM AL COMPONENTE PADRE */
  }

  save () {
    this.addCat(this.formItem).then(() => {})
  }
}
</script>
