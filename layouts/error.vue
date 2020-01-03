<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <NuxtLink to="/">
      Inicio
    </NuxtLink>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class Error extends Vue {
  layout!: string;
  @Prop({ type: Object, default: null })
  error!: any;

  pageNotFound!: string;
  otherError!: string;

  constructor () {
    super()
    this.layout = 'empty'
    this.pageNotFound = 'No se encontro la pagina :('
    this.otherError = 'La lanita se va enojar si este error no esta especificado'
  }

  head () {
    const title = this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}

</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
