<template>
  <ValidationObserver v-slot="{ invalid }">
    <form @submit.prevent="update">
      <v-row>
        <ValidationProvider v-slot="{ errors }" rules="required">
          <v-text-field
            v-model="item.name"
            :counter="50"
            label="Nombre"
          />
          <span>{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors }" rules="required|age_between:0,20">
          <v-text-field
            v-model.number="item.age"
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

import { Action, Component, Mutation, Prop, Vue } from 'nuxt-property-decorator'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { CatInterface } from '~/utils/interfaces/cat.interface'

const namespace: string = 'cats'

  @Component({
    components: {
      ValidationProvider,
      ValidationObserver
    }
  })
export default class CatModal extends Vue {
    @Prop({ type: Object, required: true })
    readonly item!: CatInterface;

    @Action('updateCat', { namespace })
    updateCat!: Function;

    @Mutation('CONTROL_MODAL', { namespace })
    controlModal!: Function;

    formTitle: string;

    constructor () {
      super()
      this.formTitle = 'Editar gato'
    }

    close () {
      this.controlModal(false)
    }

    update () {
      this.updateCat(this.item).then(() => this.close())
    }
}
</script>
