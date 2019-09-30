<template>
    <card
      :width="width"
      :height="height"
      :borderColor="borderColor"
      :backgroundColor="backgroundColor"
      :opacity="opacity"
    >
      <iframe
        class="iframe"
        :src="url"
      >
      </iframe>
    </card>
</template>

<script lang="ts">
import { HassEntity } from 'home-assistant-js-websocket'
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import Card from '@/components/Card.vue'

@Component({
  components: {
    Card
  }
})
export default class Iframe extends Vue {
  @Prop({ default: '2' }) readonly width?:string | number
  @Prop({ default: '2' }) readonly height?:string | number
  @Prop({ default: 'http://www.example.com/' }) readonly url?:string
  @Prop() readonly borderColor?:string
  @Prop() readonly backgroundColor?:string
  @Prop() readonly opacity?:string | number
}
</script>

<style lang="scss" scoped>
.iframe {
  width: 100%;
  height: 100%;
}
</style>
