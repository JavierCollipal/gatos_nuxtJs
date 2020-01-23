<template>
  <div>
    <v-row>
      <v-col>
        <v-card light>
          <v-card-title> Hosting</v-card-title>
          <v-card-text> Aqui va info del Hosting</v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card light>
          <v-card-title> FrontEnd</v-card-title>
          <v-card-text> Aqui va info del Hosting</v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card light>
          <v-card-title> FrontEnd</v-card-title>
          <v-card-text> Aqui va info del Hosting</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

  @Component
export default class InfoDisplay extends Vue {
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
