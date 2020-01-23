<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="colors"
      sort-by="id"
      class="elevation-1"
      light
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Colores</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          />
          <v-spacer />
          <v-btn color="primary" dark class="mb-2" @click.stop="addItem()">
            Nuevo Color
          </v-btn>
        </v-toolbar>
      </template>

      <template v-slot:item.action="{ item }">
        <v-icon
          @click="openDeleteModal(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="colorForm" persistent max-width="500px">
      <v-card>
        <v-card-text>
          <color-form />
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="deleteModal" persistent max-width="500px">
      <v-card>
        <v-card-title class="headline">
          ¿Estas seguro de borrar este color?
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
import { HeadersInterface } from '~/interfaces/headers.interface'
import ColorForm from '~/components/properties/color/colorForm.vue'
import { Mutation, State } from '~/node_modules/nuxt-property-decorator'
import { ColorInterface } from '~/interfaces/color.interface'

const namespace: string = 'cats'

@Component({
  components: {
    ColorForm
  }
})
export default class ColorList extends Vue {
    @Prop({ type: Array, required: true })
    readonly colors!: ColorInterface[];

    @State('colorForm', { namespace })
    colorForm!: boolean

    @Action('deleteColor', { namespace })
    deleteColor!: Function

    @Mutation('COLOR_FORM', { namespace })
    controlForm!: Function;

    headers: HeadersInterface[];

    deleteModal!: boolean;

    colorForDelete!: ColorInterface

    constructor () {
      super()
      this.headers = [
        { text: 'Nombre', value: 'name' },
        { text: 'Acciones', value: 'action', sortable: false }
      ]
      this.deleteModal = false
    }

    addItem () {
      this.controlForm(true)
    }

    deleteItem () {
      this.deleteModal = false
      this.deleteColor(this.colorForDelete)
    }

    openDeleteModal (item: ColorInterface) {
      this.colorForDelete = item
      this.deleteModal = true
    }
}
</script>
