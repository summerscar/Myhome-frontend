<template>
  <div class="navigation" :style="styles">
    <mu-bottom-nav :value.sync="listIndex" shift :color="config.color" @change="change">
      <mu-bottom-nav-item
        v-for="(item, index) in list"
        :key="index"
        class="item"
        :value="index"
        :title="item.name"
        :icon="`:fa fa-${item.icon}`">
      </mu-bottom-nav-item>
    </mu-bottom-nav>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import {
  HassConfig,
  HassEntities,
  HassUser
} from 'home-assistant-js-websocket'
import { headerConfig, room } from '@/utils/types'

@Component
export default class Navigation extends Vue {
  @Prop({ default: () => ({}) }) readonly config!: headerConfig
  @Prop({ default: () => [] }) readonly list!: Array<room>
  @Prop({ default: 0 }) readonly value?:number

  private listIndex:number | undefined = this.value || 0

  private get styles () {
    return {
    }
  }
  @Emit()
  change (index:number) {
    return index
  }
}
</script>
<style lang="scss" scoped>
.navigation {
  position: fixed;
  bottom: 0;
  width:100%;
}
</style>
