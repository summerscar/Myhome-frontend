<template>
  <card
    v-if="entity"
    class="attributes"
    :width="width"
    :height="height"
    :borderColor="borderColor"
    :backgroundColor="backgroundColor"
  >
    <mu-flex class="name" justify-content="center" align-items="center">
      {{ entity.attributes.friendly_name }}
    </mu-flex>
    <mu-flex class="icon" justify-content="center" @click="toggle">
      <mu-icon :value="`:mdi mdi-${icon}`"></mu-icon>
    </mu-flex>
    <mu-flex class="state" justify-content="center" align-items="center">
      <div>
        {{ entity.state }} {{ unit || entity.attributes.unit_of_measurement }}
      </div>
    </mu-flex>
    <mu-flex v-if="attributes.length" class="attributes" wrap="wrap" justify-content="center" align-items="center">
      <mu-flex
        class="attribute"
        v-for="(attribute, index) in attributes"
        :key="index"
        justify-content="center"
        align-items="center"
      >
        <div class="label">{{ attribute }}</div>
        <div class="value">{{ entity.attributes[attribute] }}</div>
      </mu-flex>
    </mu-flex>
  </card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import { HassEntity } from 'home-assistant-js-websocket'
import Card from '@/components/Card.vue'

@Component({
  components: {
    Card
  }
})
export default class Attributes extends Vue {
  @Prop({ default: '1' }) readonly width?:string | number
  @Prop({ default: '1' }) readonly height?:string | number
  @Prop({ default: 'access-point' }) readonly icon?: string
  @Prop() readonly borderColor?: string
  @Prop() readonly backgroundColor?: string
  @Prop({ default: true }) readonly showState?: boolean
  @Prop({ default: '' }) readonly unit?: string
  @Prop({ default: () => [] }) readonly attributes?: Array<object>
  @Prop() readonly entity!: HassEntity
}
</script>

<style lang="scss" scoped>
.attributes {
  user-select: none;
  .icon {
    font-size: 3rem;
  }
}
.name, .state, .attributes, .attribute{
  width: 100%;
}
</style>
