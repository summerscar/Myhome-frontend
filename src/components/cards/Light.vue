<template>
  <card
    :width="width"
    :height="height"
    v-if="entity"
    :borderColor="borderColor"
    :backgroundColor="backgroundColor"
  >
    <div class="light" :style="styles" v-rippuru:styles.color>
      <div class="name">{{ entity.attributes.friendly_name }}</div>
      <mu-flex class="icon" justify-content="center" @click="toggle">
        <mu-icon value=":fa fa-lightbulb-o"></mu-icon>
      </mu-flex>
      <mu-flex class="brightness-control" justify-content="center">
        <mu-slider
          :color="styles.color"
          class="silder"
          :min="1"
          :max="100"
          :step="1"
          v-model="brightness"
          @change="brightnessChange"
        ></mu-slider>
      </mu-flex>
    </div>
  </card>
</template>

<script lang="ts">
import { HassEntity } from 'home-assistant-js-websocket'
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import Card from '@/components/Card.vue'
import { handleChange as hassHandleChange } from '@/utils/homeassistant'
import { debounce } from '@/utils/utils'

@Component({
  components: {
    Card
  }
})
export default class Light extends Vue {
  @Prop({ default: '1' }) readonly width?:string | number
  @Prop({ default: '1' }) readonly height?:string | number
  @Prop() readonly entity!: HassEntity
  @Prop() readonly borderColor?:string
  @Prop() readonly backgroundColor?:string

  private brightness: number = Math.floor((this.entity.attributes.brightness + 245) / 500)

  get state ():boolean {
    return this.entity.state === 'on'
  }
  get styles () {
    return {
      color: this.state ? `rgb(${this.entity.attributes.rgb_color.join(',')})` : 'grey',
      opacity: this.state ? '1' : '0.75'
    }
  }
  toggle () {
    hassHandleChange('light', !this.state, {
      entity_id: this.entity.entity_id
    })
  }

  private brightnessChange = debounce((value: number) => {
    value = Math.floor(value / 100 * 255)
    hassHandleChange('light', 'turn_on', {
      entity_id: this.entity.entity_id,
      brightness: value
    })
    console.log('set ' + this.entity.entity_id + ' brightness:', value)
  }, 1000, this)
}
</script>

<style lang="scss" scoped>
div.light {
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
  .brightness-control {
    width: 100%;
    padding: 0.2rem 0;

    .silder {
      width: 75%;
      margin-bottom: 0;
    }
  }
}
</style>
