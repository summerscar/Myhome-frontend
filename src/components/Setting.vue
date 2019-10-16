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
        <mu-button slot="action" flat @click="reset">重置</mu-button>
        <mu-button slot="action" flat color="primary" @click="update">保存</mu-button>
      </mu-expansion-panel>
      <mu-expansion-panel v-for="(room, index) in configed.rooms" :key="index">
        <div slot="header">房间 {{ room.name }}</div>
        <draggable v-model="room.cards">
          <div class="card" v-for="(card, cardIndex) in room.cards" :key="cardIndex">
            <div>
              <mu-button icon class="dragIcon">
                <mu-icon value=":fa fa-bars"></mu-icon>
              </mu-button>
            </div>
            <div>
              <mu-text-field v-model="card.name" label="name" :placeholder="hassEntities[card.entity_id] && hassEntities[card.entity_id].attributes.friendly_name"></mu-text-field>
              <mu-auto-complete :data="Object.keys(hassEntities)" label="entity_id" v-model="card.entity_id" open-on-focus></mu-auto-complete>
              <mu-text-field v-model="card.card_type" label="card_type" :placeholder="card.card_type"></mu-text-field>
              <mu-text-field v-for="(opt, name) in card.optional" :key="name" v-model="card.optional[name]" :label="name"></mu-text-field>
            </div>
          </div>
        </draggable>
        <mu-button slot="action" flat @click="reset">重置</mu-button>
        <mu-button slot="action" flat color="primary" @click="update">保存</mu-button>
      </mu-expansion-panel>
    </mu-container>
  </mu-dialog>
</template>
<script lang="ts">
import { Component, Prop, Vue, Emit, PropSync } from 'vue-property-decorator'
import draggable from 'vuedraggable'
import { HassEntities } from 'home-assistant-js-websocket'
@Component({
  components: {
    draggable
  }
})
export default class Setting extends Vue {
  @PropSync('isOpen', { type: Boolean }) isOpenSetting!: boolean
  @Prop() readonly hassEntities!: HassEntities
  @Prop({ default: () => ({}) }) readonly config!: object

  private configed: object = this.$_.cloneDeep(this.config)

  openSetting () {
    this.isOpenSetting = true
  }
  closeSetting () {
    this.isOpenSetting = false
  }

  reset () {
    this.configed = this.$_.cloneDeep(this.config)
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
      text-transform: capitalize;
      font-size: 20px;
    }
  }
  .card {
    display: flex;
    .dragIcon {
      cursor: ns-resize;
      color: grey;
      font-size: 14px;
    }
    &::v-deep .mu-input {
      padding-left: 6px;
      padding-right: 6px;
    }
  }
}
</style>
