<template>
  <card
    :width="width"
    :height="height"
    v-if="entity"
    :borderColor="borderColor"
    :backgroundColor="backgroundColor"
  >
    <div class="cover" :style="styles" v-rippuru>
      <div class="name">{{ entity.attributes.friendly_name }}</div>
      <mu-flex class="icons" justify-content="center">
        <mu-icon class="icon" value=":mdi mdi-arrow-up" :style="entity.attributes.current_position > 99 && disabled"></mu-icon>
        <mu-icon class="icon" value=":mdi mdi-stop"></mu-icon>
        <mu-icon class="icon" value=":mdi mdi-arrow-down" :style="entity.attributes.current_position < 1  && disabled"></mu-icon>
      </mu-flex>
      <div> {{ entity.state }} </div>
    </div>
  </card>
</template>

<script lang="ts">
import { HassEntity } from 'home-assistant-js-websocket'
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import Card from '@/components/Card.vue'
import { handleChange as hassHandleChange } from '@/utils/homeassistant'
import { Colors } from 'muse-ui'

@Component({
  components: {
    Card
  }
})
export default class Cover extends Vue {
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
  get disabled () {
    return {
      opacity: '0.4',
      'pointer-events': 'none'
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
div.cover {
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
  .icons {
    width: 100%;
    .icon {
      padding: 3px;
      cursor: pointer;
      font-size: 1.7rem;
    }
  }
}
</style>
