<template>
  <ValidationObserver v-slot="{ invalid }">
    <form @submit.prevent="save">
      <v-row>
        <ValidationProvider v-slot="{ errors }" rules="required">
          <v-text-field
            v-model="color.name"
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
import { ColorInterface } from '~/interfaces/color.interface'

const namespace: string = 'cats'

@Component({
  components: {
    ValidationProvider,
    ValidationObserver
  }
})
export default class ColorForm extends Vue {
    color!: ColorInterface;

    @Action('addColor', { namespace })
    addColor!: Function;

    @Mutation('COLOR_FORM', { namespace })
    controlForm!: Function;

    formTitle: string;

    constructor () {
      super()
      this.formTitle = 'Colores'
      this.color = { name: '' }
    }

    close () {
      this.controlForm(false)
    }

    save () {
      this.addColor(this.color).then(() => {})
      this.close()
    }
}
</script>
