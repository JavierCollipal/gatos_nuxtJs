<template>
  <ValidationObserver v-slot="{ invalid }">
    <form @submit.prevent="save">
      <v-row>
        <ValidationProvider v-slot="{ errors }" rules="required">
          <v-text-field
            v-model="breed.name"
            :counter="50"
            label="Nombre"
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

import { Action, Component, Mutation, Vue } from 'nuxt-property-decorator'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { BreedInterface } from '~/interfaces/breed.interface'

const namespace: string = 'catProperties'

@Component({
  components: {
    ValidationProvider,
    ValidationObserver
  }
})
export default class BreedForm extends Vue {
    breed!: BreedInterface;

    @Action('addBreed', { namespace })
    addBreed!: Function;

    @Mutation('BREED_FORM', { namespace })
    controlForm!: Function;

    formTitle: string;

    constructor () {
      super()
      this.formTitle = 'Razas'
    }

    close () {
      this.controlForm(false)
    }

    save () {
      this.addBreed(this.breed).then(() => {})
      this.close()
    }
}
</script>
