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
          <v-dialog v-model="insertForm" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on" @click="controlForm(true)">
                Nuevo Gato
              </v-btn>
            </template>
            <v-card>
              <v-card-text>
                <v-container>
                  <CatForm />
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.action="{ item }">
        <v-icon
          small
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="updateModal" max-width="500px">
      <v-card>
        <v-card-text>
          <CatModal :item="modalItem" />
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
import CatModal from '~/components/cats/catModal.vue'
import { Mutation, State } from '~/node_modules/nuxt-property-decorator'

const namespace: string = 'cats'

@Component({
  components: {
    ValidationProvider,
    ValidationObserver,
    CatForm,
    CatModal
  }
})
export default class CatList extends Vue {
  @Prop({ type: Array, required: true })
  readonly cats!: CatInterface[];

  @State('insertForm', { namespace })
  insertForm!: boolean

  @State('updateModal', { namespace })
  updateModal!: boolean

  @Action('deleteCat', { namespace })
  deleteCat!: Function

  @Mutation('CONTROL_FORM', { namespace })
  controlForm!: Function;

  @Mutation('CONTROL_MODAL', { namespace })
  controlModal!: Function;

  editedIndex: number;
  modalItem!: CatInterface;
  headers: HeadersInterface[];
  $refs!: {
    observer: InstanceType<typeof ValidationObserver>;
  };

  constructor () {
    super()
    this.editedIndex = -1
    this.headers = [
      { text: 'Nombre', value: 'name' },
      { text: 'Edad', value: 'age' },
      { text: 'Acciones', value: 'action', sortable: false }
    ]
    this.modalItem = { name: '' }
  }

  editItem (item: CatInterface) {
    this.modalItem = Object.assign({}, item)
    this.controlModal(true)
  }

  deleteItem (item: CatInterface) {
    confirm('Estas seguro de borrar este gato?') && this.deleteCat(item)
  }
}
</script>
