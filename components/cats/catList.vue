<template>
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
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">
              Nuevo Gato
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Nombre" />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.age" label="Edad" type="number" />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <!--CANCEL-->
              <v-btn color="blue darken-1" text>
                Cancelar
              </v-btn>
              <!--SAVE-->
              <v-btn color="blue darken-1" text @click="save">
                Guardar
              </v-btn>
            </v-card-actions>
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
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { CatInterface } from '~/utils/interfaces/cat.interface'
import { HeadersInterface } from '~/utils/interfaces/headers.interface'

@Component
export default class CatList extends Vue {
  @Prop({ type: Array, required: true })
  readonly cats!: CatInterface[];

  formTitle: string = 'gatos';
  dialog: boolean = false;
  editedIndex: number= -1;
  editedItem!: CatInterface;
  headers: HeadersInterface[];

  constructor () {
    super()
    this.formTitle = 'gatos'
    this.dialog = false
    this.editedIndex = -1
    this.editedItem = { name: '' }
    this.headers = [
      { text: 'Nombre', value: 'name' },
      { text: 'Edad', value: 'age' },
      { text: 'Actions', value: 'action', sortable: false }
    ]
  }

  editItem (item: CatInterface) {
    this.editedIndex = this.cats.indexOf(item)
    this.editedItem = Object.assign({}, item)
    this.dialog = true
  }

  deleteItem (item: CatInterface) {
    const index = this.cats.indexOf(item)
    confirm('Estas seguro de borrar este gato?') && this.cats.splice(index, 1)
  }

  close () {
    this.dialog = false
  }

  save () {
    console.log('entro aca')
    if (this.editedIndex > -1) {
      Object.assign(this.cats[this.editedIndex], this.editedItem)
    } else {
      this.cats.push(this.editedItem)
    }
    this.close()
  }
}
</script>
