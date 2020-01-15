<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline">
          Gatos
        </v-card-title>
        <v-card-text>
          <p>Version actual: CRUD de gatos con rails, </p>
          <p>
            V2: Devise en el backend para manejo de la entidad users y uso de JWT entre el
            frontend y backend
          </p>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

@Component({
  components: {
    Logo, VuetifyLogo
  }
})
export default class Index extends Vue {

}

</script>
