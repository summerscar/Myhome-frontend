<template>
  <mu-col
    span="6"
    class="card"
  >
    <slot></slot>
  </mu-col>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'

export default class Card extends Vue {

}
</script>

<style lang="scss" scoped>
.card {
  margin: 1rem;
  background-color: rgba(0,0,0,0.25);
  box-shadow: rgba(255, 255, 255, 0.4) 0px 0px 0px 1px inset;
}
</style>
