<template>
  <div class="bg">
    <div class="pic" :style="styles"></div>
    <div class="mask"></div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { bgConfig } from '@/utils/types'

@Component
export default class Background extends Vue {
  @Prop({ default: () => ({ url: 'http://i2.tiimg.com/669018/3172c0a8c9afdf7b.jpg' }) }) private config!: bgConfig

  styles = {
    backgroundImage: 'url(' + this.config.url + ')'
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
    background: rgba(0, 0, 0, 0.3);
  }
}
</style>
