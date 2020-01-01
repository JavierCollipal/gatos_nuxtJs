<template>
  <div>
    <p>Gracias lanita</p>
    {{ thanks }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Index extends Vue {
    thanks: string = 'por mearte en la lavadora';
}

</script>
