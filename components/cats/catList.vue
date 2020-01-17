<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="cats"
      sort-by="id"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Mis Gatos</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          />
          <v-spacer />
          <v-btn color="primary" dark class="mb-2" @click.stop="addItem()">
            Nuevo Gato
          </v-btn>
        </v-toolbar>
      </template>

      <template v-slot:item.action="{ item }">
        <v-icon
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="catForm" persistent max-width="500px">
      <v-card>
        <v-card-text>
          <v-container>
            <CatForm :cat="cat" :is-update="isUpdate" />
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">

import { Action, Component, Prop, Vue } from 'nuxt-property-decorator'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { CatInterface } from '~/utils/interfaces/cat.interface'
import { HeadersInterface } from '~/utils/interfaces/headers.interface'
import CatForm from '~/components/cats/catForm.vue'
import { Mutation, State } from '~/node_modules/nuxt-property-decorator'

const namespace: string = 'cats'

@Component({
  components: {
    ValidationProvider,
    ValidationObserver,
    CatForm
  }
})
export default class CatList extends Vue {
  @Prop({ type: Array, required: true })
  readonly cats!: CatInterface[];

  @State('catForm', { namespace })
  catForm!: boolean

  @State('cat', { namespace })
  cat!: CatInterface

  @Action('deleteCat', { namespace })
  deleteCat!: Function

  @Mutation('CONTROL_FORM', { namespace })
  controlForm!: Function;

  @Mutation('SET_CAT', { namespace })
  setCat!: Function;

  editedIndex: number;
  headers: HeadersInterface[];
  $refs!: {
    observer: InstanceType<typeof ValidationObserver>;
  };

  isUpdate!: boolean

  constructor () {
    super()
    this.editedIndex = -1
    this.headers = [
      { text: 'Nombre', value: 'name' },
      { text: 'Edad', value: 'age' },
      { text: 'Acciones', value: 'action', sortable: false }
    ]
    this.isUpdate = false
  }

  addItem () {
    this.setCat({})
    this.isUpdate = false
    this.controlForm(true)
  }

  editItem (item: CatInterface) {
    this.setCat(item)
    this.isUpdate = true
    this.controlForm(true)
  }

  deleteItem (item: CatInterface) {
    confirm('Estas seguro de borrar este gato?') && this.deleteCat(item)
  }
}
</script>
