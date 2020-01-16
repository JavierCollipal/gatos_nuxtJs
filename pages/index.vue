<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline">
          Versiones
        </v-card-title>
        <v-card-text>
          <p>Version actual: CRUD publico de gatos con rails. </p>
          <p>
            V1: CRUD de gatos con rails.
          </p>
          <p>
            V2: Color y Raza para gatos y un mantenedor de estas tablas.
            Su fin es exponer que la api trabaja con relaciones one-to-one.
          </p>
          <p>
            V3: Devise de rails para manejar la entidad usuario y JWT
            para limitar acciones entre frontend/backend.
          </p>
          <p>
            V4: Registrate y crea TUS gatos!!.
            Su fin es exponer que la api trabaja con relaciones one-to-many.
          </p>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Index extends Vue {

}

</script>
