<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="4">
          <v-card light>
            <v-card-title> Hosting</v-card-title>
            <v-card-text>
              <p><strong>Backend:</strong> corriendo en heroku</p>
              <p><strong>Frontend:</strong> corriendo en google app engine</p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card light>
            <v-card-title>
              FrontEnd
            </v-card-title>
            <v-card-text>
              <p><strong>Lenguaje:</strong> Javascript con Typescript</p>
              <p><strong>Framework:</strong> Nuxt.js</p>
              <p><strong>Modo:</strong> Server Side rendering</p>
              <p><strong>Libreria UI:</strong> Vuetify/Material Design</p>
              <p><strong>Manejo de estados:</strong> Vuex</p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card light>
            <v-card-title> Backend </v-card-title>
            <v-card-text>
              <p><strong>Lenguaje:</strong> Ruby</p>
              <p><strong>Framework:</strong> rails</p>
              <p><strong>Base de datos:</strong> Postgres</p>
              <p><strong>Modo:</strong> Api</p>
              <p><strong>Auth:</strong> Trabajando en esto</p>
              <p><strong>Caching:</strong> Trabajando en esto</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

  @Component
export default class extends Vue {
    items: string[]
    hostingText: string
    backendText: string
    frontendText: string
    tab!: null

    constructor () {
      super()
      this.tab = null
      this.items = ['Hosting', 'Frontend', 'Backend']
      this.hostingText = 'Aqui va el texto del hosting'
      this.backendText = 'Aqui va el texto del backend'
      this.frontendText = 'Aqui va el texto del frontend'
    }
}
</script>
