<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="breeds"
      sort-by="id"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Razas</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          />
          <v-spacer />
          <v-btn color="primary" dark class="mb-2" @click.stop="addItem()">
            Nueva Raza
          </v-btn>
        </v-toolbar>
      </template>

      <template v-slot:item.action="{ item }">
        <v-icon
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="breedForm" persistent max-width="500px">
      <v-card>
        <v-card-text>
          <v-container>
            <BreedForm />
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">

import { Action, Component, Prop, Vue } from 'nuxt-property-decorator'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { HeadersInterface } from '~/interfaces/headers.interface'
import BreedForm from '~/components/properties/breed/breedForm.vue'
import { Mutation, State } from '~/node_modules/nuxt-property-decorator'
import { BreedInterface } from '~/interfaces/breed.interface'

const namespace: string = 'cats'

@Component({
  components: {
    ValidationProvider,
    ValidationObserver,
    BreedForm
  }
})
export default class BreedList extends Vue {
    @Prop({ type: Array, required: true })
    readonly breeds!: BreedInterface[];

    @State('breedForm', { namespace })
    breedForm!: boolean

    @Action('deleteBreed', { namespace })
    deleteBreed!: Function

    @Mutation('BREED_FORM', { namespace })
    controlForm!: Function;

    headers: HeadersInterface[];

    $refs!: {
      observer: InstanceType<typeof ValidationObserver>;
    };

    constructor () {
      super()
      this.headers = [
        { text: 'Nombre', value: 'name' },
        { text: 'Acciones', value: 'action', sortable: false }
      ]
    }

    addItem () {
      this.controlForm(true)
    }

    deleteItem (item: BreedInterface) {
      confirm('Estas seguro de borrar esta raza?') && this.deleteBreed(item)
    }
}
</script>
