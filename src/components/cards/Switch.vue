<template>
  <card
    :width="width"
    :height="height"
    v-if="entity"
    :borderColor="borderColor"
    :backgroundColor="backgroundColor"
  >
    <div class="switch" :style="styles" v-rippuru>
      <div class="name">{{ entity.attributes.friendly_name }}</div>
      <mu-flex class="icon" justify-content="center" @click="toggle">
        <mu-icon value=":mdi mdi-toggle-switch" v-if="state"></mu-icon>
        <mu-icon value=":mdi mdi-toggle-switch-off" v-else></mu-icon>
      </mu-flex>
    </div>
  </card>
</template>

<script lang="ts">
import { HassEntity } from 'home-assistant-js-websocket'
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import Card from '@/components/Card.vue'
import { handleChange as hassHandleChange } from '@/utils/homeassistant'

@Component({
  components: {
    Card
  }
})
export default class HASwitch extends Vue {
  @Prop({ default: '1' }) readonly width?:string | number
  @Prop({ default: '1' }) readonly height?:string | number
  @Prop() readonly entity!: HassEntity
  @Prop() readonly borderColor?: string
  @Prop() readonly backgroundColor?: string

  get state ():boolean {
    return this.entity.state === 'on'
  }
  get styles () {
    return {
      opacity: this.state ? '1' : '0.75'
    }
  }

  toggle () {
    hassHandleChange(this.entity.entity_id.split('.')[0], !this.state, {
      entity_id: this.entity.entity_id
    })
  }
}
</script>

<style lang="scss" scoped>
div.switch {
  user-select: none;
  height: 100%;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  .name {
    width: 100%;
    padding: 0.5rem 0;
  }
  .icon {
    width: 100%;
    cursor: pointer;
    font-size: 3rem;
  }
}
</style>
