<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; Lanita 2020</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

interface LeftMenu {
  icon: string,
  title: string,
  to: string
}

@Component
export default class Default extends Vue {
  clipped: boolean;
  drawer: boolean;
  fixed: boolean;
  items: LeftMenu[];
  miniVariant: boolean;
  right: boolean;
  title: string;

  constructor () {
    super()
    this.clipped = false
    this.drawer = false
    this.fixed = false
    this.items = [
      {
        icon: 'mdi-apps',
        title: 'Hola Lanita',
        to: '/'
      },
      {
        icon: 'mdi-chart-bubble',
        title: 'cats',
        to: '/cats'
      },
      {
        icon: 'mdi-chart-bubble',
        title: 'info de la app',
        to: '/info'
      }
    ]
    this.miniVariant = false
    this.right = true
    this.title = 'pulgas.js'
  }
}
</script>
