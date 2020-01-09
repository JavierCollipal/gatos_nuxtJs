<template>
  <v-data-table
    :headers="headers"
    :items="cats"
    sort-by="id"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
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
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <!--AQUI VA EL UPDATE-->
            <!--<v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Nombre" />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.calories" label="Edad" />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>-->

            <v-card-actions>
              <v-spacer />
              <v-btn color="blue darken-1" text>
                Cancelar
              </v-btn>
              <v-btn color="blue darken-1" text>
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
        class="mr-2"
      >
        edit
      </v-icon>
      <v-icon
        small
      >
        delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class CatList extends Vue {
  @Prop({ type: Array, required: true })
  readonly cats!: [];

  formTitle: string = 'gatos';
  dialog: boolean = false;
  editedIndex: number= -1;
  editedItem: any;
  headers = [
    { text: 'Nombre', value: 'name' },
    { text: 'Edad', value: 'age' }
  ];

  /* editItem (item) {
    this.editedIndex = this.cats.indexOf(item)
    this.editedItem = Object.assign({}, item)
    this.dialog = true
  }

  deleteItem (item) {
    /!* solucionar esto del never type *!/
    /!* const index = this.cats.indexOf(item) *!/
    /!* confirm('Estas seguro de borrar este gato?') && this.cats.splice(index, 1) *!/
  } */

  close () {
    this.dialog = false
  }

  save () {
    if (this.editedIndex > -1) {
      Object.assign(this.cats[this.editedIndex], this.editedItem)
    } else {
      /* aqui va el push */
    }
    this.close()
  }
}
</script>
