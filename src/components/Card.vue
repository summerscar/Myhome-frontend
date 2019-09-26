<template>
  <div
    :style="styles"
    class="card"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'

@Component
export default class Card extends Vue {
  @Prop({ default: 1 }) readonly width?: number | string
  @Prop({ default: 1 }) readonly height?: number | string
  @Prop({ default: 'rgba(255, 255, 255, 0.3)' }) readonly borderColor?: string
  @Prop({ default: 'rgba(0,0,0,0.25)' }) readonly backgroundColor?: string

  get styles (): object {
    return {
      border: this.borderColor === 'none' ? 'none' : `1px solid ${this.borderColor}`,
      backgroundColor: this.backgroundColor,
      width: (8 * Number(this.width)) + 'rem',
      height: (8 * Number(this.height)) + 'rem'
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  margin: 10px;
  transition: .3s box-shadow;
  &:hover {
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.45);
  }
}
</style>
