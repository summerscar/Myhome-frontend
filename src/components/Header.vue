<template>
  <mu-appbar class="header" style="width: 100%;" title="My home" :color="config.color">
    <mu-menu slot="left">
    <mu-button flat>
      <mu-icon size="24" value="home"></mu-icon>
    </mu-button>
    </mu-menu>
    <mu-menu slot="right">
      <mu-button flat>
        <mu-avatar text-color="deepOrange300" color="purple500">
        {{ hassUser.name && hassUser.name.slice(0,1) }}
        </mu-avatar>
      </mu-button>
      <mu-list slot="content">
        <mu-list-item button>
          <mu-list-item-title>
            <mu-icon size="24" value=":fa fa-cog" color="#757575"></mu-icon>
          </mu-list-item-title>
        </mu-list-item>
        <mu-list-item button @click="exit">
          <mu-list-item-title>
            <mu-icon size="24" value=":fa fa-power-off" color="#757575"></mu-icon>
          </mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-menu>
  </mu-appbar>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import {
  HassConfig,
  HassEntities,
  HassUser
} from 'home-assistant-js-websocket'
import { headerConfig } from '@/utils/types'

@Component
export default class Header extends Vue {
  @Prop() readonly hassUser!: HassUser
  @Prop({ default: () => ({}) }) readonly config!: headerConfig

  @Emit('exit')
  exit () {}
}
</script>

<style lang="scss" scoped>

</style>
