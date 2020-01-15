<template>
  <div>
    <p>Tanto el backend como frontend se encuentran corriendo bajo google app engine</p>
    <p>El frontend está usando Nuxt.js, funciona con SSR,Typescript y Vuex para operaciones CRUD</p>
    <p>El backend está usando Rails </p>
    <p>La base de datos funciona con Cloud SQL y postgres 11</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Info extends Vue {
}
</script>
