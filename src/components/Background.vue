<template>
  <div class="bg">
    <div class="pic" :style="styles"></div>
    <div class="mask" :style="maskStyle"></div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { bgConfig } from '@/utils/types'

@Component
export default class Background extends Vue {
  @Prop({ default: () => ({}) }) readonly config!: bgConfig

  get styles () {
    return {
      backgroundImage: 'url(' + this.config.image + ')',
      filter: `blur(${this.config.blur || 0}px)`
    }
  }

  get maskStyle () {
    return {
      opacity: this.config.opacity
    }
  }
}
</script>
<style lang="scss" scoped>
div.bg {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -100;

  div.pic {
    position: absolute;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
  }
  div.mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background: black;
  }
}
</style>
