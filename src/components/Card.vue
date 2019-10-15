<template>
  <mu-flex
    :justify-content="justifyContent"
    :align-items="alignItems"
    wrap="wrap"
    :style="styles"
    class="card"
  >
    <slot></slot>
    <mu-flex v-if="isEditing" class="edit" justify-content="center" align-items="center" wrap="wrap">
      <div class="item" @click="edit">
        <mu-icon size="24" value=":fa fa-pencil"></mu-icon>
      </div>
       <div class="item" @click="remove">
        <mu-icon size="24" value=":fa fa-trash"></mu-icon>
      </div>
      <div class="item" @click="prev">
        <mu-icon size="24" value=":fa fa-arrow-left"></mu-icon>
      </div>
      <div class="item" @click="next">
        <mu-icon size="24" value=":fa fa-arrow-right"></mu-icon>
      </div>
    </mu-flex>
  </mu-flex>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import mixin from '@/components/cards/mixin'

@Component({
  mixins: [mixin]
})
export default class Card extends Vue {
  @Prop({ default: false }) readonly isEditing?: boolean
  @Prop({ default: 1 }) readonly width?: number | string
  @Prop({ default: 1 }) readonly height?: number | string
  @Prop({ default: 1 }) readonly opacity?: number | string
  @Prop({ default: 'rgba(255, 255, 255, 0.3)' }) readonly borderColor?: string
  @Prop({ default: 'rgba(0,0,0,0.25)' }) readonly backgroundColor?: string
  @Prop({ default: 'around' }) readonly justifyContent?: string
  @Prop({ default: 'center' }) readonly alignItems?: string

  get styles (): object {
    return {
      border: this.borderColor === 'none' ? 'none' : `1px solid ${this.borderColor}`,
      backgroundColor: this.backgroundColor,
      width: (8 * Number(this.width)) + 'rem',
      height: (8 * Number(this.height)) + 'rem',
      opacity: this.opacity
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  padding: 0.2rem;
  margin: 0.4rem;
  transition: .3s box-shadow;
  position: relative;
  &:hover {
    box-shadow: 0 0 2px 3px rgba(0, 0, 0, 0.45);
  }
  .edit {
    position: absolute;
    width: 100%;
    height: 100%;
    .item {
      background-color: rgba(0, 0, 0, 0.7);
      width: 50%;
      height: 50%;
      justify-content: center;
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: background .4s;
      &:hover {
        background-color: rgba(0, 0, 0, 0.5);
      }
      &:nth-child(1) {
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        border-right: 1px solid rgba(255, 255, 255, 0.2);
      }
      &:nth-child(2) {
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      }
      &:nth-child(3) {
        border-right: 1px solid rgba(255, 255, 255, 0.2);
      }
    }
  }
}
</style>
