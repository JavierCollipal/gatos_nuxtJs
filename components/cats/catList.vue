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
                <ValidationObserver v-slot="{ invalid }">
                  <form @submit.prevent="save">
                    <v-row>
                      <ValidationProvider v-slot="{ errors }" rules="required|alpha">
                        <v-text-field
                          v-model="editedItem.name"
                          :counter="50"
                          label="Nombre"
                        />
                        <span>{{ errors[0] }}</span>
                      </ValidationProvider>

                      <ValidationProvider v-slot="{ errors }" rules="required|age_between:0,20">
                        <v-text-field
                          v-model.number="editedItem.age"
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
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { CatInterface } from '~/utils/interfaces/cat.interface'
import { HeadersInterface } from '~/utils/interfaces/headers.interface'

@Component({
  components: {
    ValidationProvider,
    ValidationObserver
  }
})
export default class CatList extends Vue {
  @Prop({ type: Array, required: true })
  readonly cats!: CatInterface[];

  formTitle: string;
  dialog: boolean;
  editedIndex: number;
  editedItem!: CatInterface;
  headers: HeadersInterface[];
  $refs!: {
    observer: InstanceType<typeof ValidationObserver>;
  };

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
    console.log(this.$refs)
    if (this.editedIndex > -1) {
      Object.assign(this.cats[this.editedIndex], this.editedItem)
    } else {
      this.$store.dispatch('cats/addCat', this.editedItem)
      this.cats.push(this.editedItem)
    }
    this.close()
  }
}
</script>
