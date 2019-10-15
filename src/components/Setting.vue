<template>
  <mu-dialog class="dialog" width="360" transition="slide-bottom" fullscreen :open.sync="isOpen">
    <mu-appbar color="primary" title="设置">
      <mu-button slot="right" flat  @click="closeSetting">
        完成
      </mu-button>
    </mu-appbar>
    <mu-container class="setting">
      <mu-expansion-panel>
        <div slot="header">主题</div>
        <div class="themeGroup" v-for="(settingGroup, groupName) in configed.theme" :key="groupName">
          <div class="themeGroupName">{{ groupName }}</div>
          <div v-for="(value, key) in settingGroup" :key="key">
            <mu-text-field v-model="configed.theme[groupName][key]" :label="key" :placeholder="key"></mu-text-field>
          </div>
        </div>
        <mu-button slot="action" flat>Cancel</mu-button>
        <mu-button slot="action" flat color="primary" @click="update">Save</mu-button>
      </mu-expansion-panel>
      <mu-expansion-panel v-for="(room, index) in configed.rooms" :key="index">
        <div slot="header">房间 {{ room.name }}</div>
        <div v-for="(card, cardIndex) in room.cards" :key="cardIndex">
          {{ card }}
        </div>
      </mu-expansion-panel>
    </mu-container>
  </mu-dialog>
</template>
<script lang="ts">
import { Component, Prop, Vue, Emit, PropSync } from 'vue-property-decorator'

@Component({})
export default class Setting extends Vue {
  @PropSync('isOpen', { type: Boolean }) isOpenSetting!: boolean
  @Prop({ default: () => ({}) }) readonly config!: object

  private configed: object = this.$_.cloneDeep(this.config)
  openSetting () {
    this.isOpenSetting = true
  }
  closeSetting () {
    this.isOpenSetting = false
  }
  @Emit('change')
  update () {
    return this.configed
  }
}
</script>
<style lang="scss" scoped>
.setting {
  margin-top: 5px;
  height: calc(100vh - 64px - 5px);
  padding: 1.5rem;
  overflow: auto;
  .themeGroup {
    .themeGroupName {
      font-size: 20px;
    }
  }
}
</style>
