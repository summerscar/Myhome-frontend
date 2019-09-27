<template>
  <card
    :width="width"
    :height="height"
  >
    <div color="red" :opacity="0.5" class="light" :style="styles" v-rippuru:styles.colorv @click="toggle">
      <div class="name">{{ entity.attributes.friendly_name }}</div>
      <div class="icon">
        <mu-icon value=":fa fa-lightbulb-o"></mu-icon>
      </div>
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
export default class Light extends Vue {
  @Prop({ default: '1' }) readonly width?:string | number
  @Prop({ default: '1' }) readonly height?:string | number
  @Prop() readonly entity!: HassEntity

  get state ():boolean {
    return this.entity.state === 'on'
  }
  get styles () {
    return {
      color: this.state ? `rgb(${this.entity.attributes.rgb_color.join(',')})` : 'grey',
      opacity: this.state ? '1' : '0.5'
    }
  }
  toggle () {
    hassHandleChange('light', !this.state, {
      entity_id: this.entity.entity_id
    })
  }
}
</script>

<style lang="scss" scoped>
div.light {
  cursor: pointer;
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
    font-size: 3rem;
  }
}
</style>
