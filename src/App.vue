<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { parseTokens } from '@/utils/auth'
import { loadTokens, loadHassUrl, connectToHASS } from '@/utils/homeassistant'
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'

@Component
export default class App extends Vue {
  @Getter('connected') connected!:boolean;

  created () {
    parseTokens()
  }
  async mounted () {

  }
}
</script>
<style lang="scss">
@import url('./styles/common.scss');
@import '~material-design-icons/iconfont/material-icons.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
