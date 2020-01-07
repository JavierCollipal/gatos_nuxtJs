<template>
  <div>
    <p>Aqui va ir un crud que funcionara con una store de vuex</p>
    <cat-list />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CatList from '~/components/cats/catList.vue'

@Component({
  components: {
    CatList
  }
})
export default class Index extends Vue {
  public created () {
  }
}
</script>
