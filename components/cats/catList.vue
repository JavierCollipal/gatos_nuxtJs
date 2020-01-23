<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="cats"
      sort-by="id"
      class="elevation-1"
      light
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
          @click="openDeleteModal(item)"
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
    <v-dialog v-model="deleteModal" persistent max-width="500px">
      <v-card>
        <v-card-title class="headline">
          ¿Estas seguro de borrar este gato?
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="deleteModal = false">
            Cancelar
          </v-btn>
          <v-btn text @click="deleteItem">
            Borrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">

import { Action, Component, Prop, Vue } from 'nuxt-property-decorator'
import { CatInterface } from '~/interfaces/cat.interface'
import { HeadersInterface } from '~/interfaces/headers.interface'
import CatForm from '~/components/cats/catForm.vue'
import { Mutation, State } from '~/node_modules/nuxt-property-decorator'

const namespace: string = 'cats'

@Component({
  components: {
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

  isUpdate!: boolean;

  deleteModal!: boolean;

  catForDelete!: CatInterface

  constructor () {
    super()
    this.editedIndex = -1
    this.headers = [
      { text: 'Nombre', value: 'name' },
      { text: 'Edad', value: 'age' },
      { text: 'Color', value: 'color.name' },
      { text: 'Raza', value: 'breed.name' },
      { text: 'Acciones', value: 'action', sortable: false }
    ]
    this.isUpdate = false
    this.deleteModal = false
  }

  addItem () {
    this.setCat({ color: { name: '' }, breed: { name: '' } })
    this.isUpdate = false
    this.controlForm(true)
  }

  editItem (item: CatInterface) {
    console.log(item)
    this.setCat(item)
    this.isUpdate = true
    this.controlForm(true)
  }

  deleteItem () {
    this.deleteModal = false
    this.deleteCat(this.catForDelete)
  }

  openDeleteModal (item: CatInterface) {
    this.catForDelete = item
    this.deleteModal = true
  }
}
</script>
