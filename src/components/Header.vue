<template>
  <mu-appbar class="header" style="width: 100%;" title="My home" :color="config.color">
    <mu-button icon slot="left" @click="edit">
      <mu-icon v-if="!isEditing" size="24" value=":fa fa-sliders"></mu-icon>
      <mu-icon v-else size="24" value=":fa fa-check"></mu-icon>
    </mu-button>
    <mu-menu slot="right">
      <mu-button flat>
        <mu-avatar text-color="deepOrange300" color="purple500">
        {{ hassUser.name && hassUser.name.slice(0,1) }}
        </mu-avatar>
      </mu-button>
      <mu-list slot="content" @click="setting">
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
import { Getter } from 'vuex-class'
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
  @Getter('isEditing') isEditing!: boolean

  @Emit('exit')
  exit () {}

  @Emit('setting')
  setting () {}

  @Emit('edit')
  edit () {
    return !this.isEditing
  }
}
</script>

<style lang="scss" scoped>

</style>
