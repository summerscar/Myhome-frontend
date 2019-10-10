<template>
  <component :is="type"
    :entity="entity"
    :width="optional.width"
    :height="optional.height"
    :icon="optional.icon"
    :borderColor="optional.borderColor"
    :backgroundColor="optional.backgroundColor"
    :showState="optional.showState"
    :unit="optional.unit"
    :attributes="optional.attributes"
    :opacity="optional.opacity"
    :url="optional.url"
    :graphType="optional.graphType"
    :min="optional.min"
    :max="optional.max"
    :format="optional.format"
  >
  </component>
</template>
<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import { HassEntity } from 'home-assistant-js-websocket'
import {
  Attributes,
  Camera,
  Cover,
  Light,
  Sensor,
  Switch,
  Weather
} from '@/components/cards/index'

@Component({
  components: {
    AttributesCard: Attributes,
    CameraCard: Camera,
    CoverCard: Cover,
    LightCard: Light,
    SensorCard: Sensor,
    SwitchCard: Switch,
    WeatherCard: Weather
  }
})
export default class Entity extends Vue {
  @Prop({ default: () => ({}) }) readonly optional?: object
  @Prop() readonly entity!: HassEntity

  get type ():string {
    let domain = this.entity.entity_id.split('.')[0]
    if (
      domain === 'air_quality' ||
      domain === 'binary_sensor' ||
      domain === 'device_tracker' ||
      domain === 'geo_location' ||
      domain === 'sensor' ||
      domain === 'sun'
    ) {
      return 'sensor-card'
    } else if (
      domain === 'input_boolean' ||
      domain === 'lock' ||
      domain === 'remote' ||
      domain === 'scene' ||
      domain === 'script' ||
      domain === 'switch'
    ) {
      return 'switch-card'
    } else {
      if (domain === 'alarm_control_panel') return ''
      if (domain === 'camera') return 'camera-card'
      if (domain === 'climate') return ''
      if (domain === 'cover') return 'cover-card'
      if (domain === 'fan') return ''
      if (domain === 'light') return 'light-card'
      if (domain === 'media_player') return ''
      if (domain === 'weather') return 'weather-card'
    }
    return 'attributes-card'
  }
}
</script>
<style lang="scss" scoped>

</style>
