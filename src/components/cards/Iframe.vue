<template>
    <card
      :width="width"
      :height="height"
      :isEditing="isEditing"
      :borderColor="borderColor"
      :backgroundColor="backgroundColor"
      :opacity="opacity"
      @edit="edit"
      @remove="remove"
      @prev="prev"
      @next="next"
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
import { Getter } from 'vuex-class'
import mixin from '@/components/cards/mixin'

@Component({
  components: {
    Card
  },
  mixins: [mixin]
})
export default class Iframe extends Vue {
  @Prop({ default: '2' }) readonly width?:string | number
  @Prop({ default: '2' }) readonly height?:string | number
  @Prop({ default: 'http://www.example.com/' }) readonly url?:string
  @Prop() readonly borderColor?:string
  @Prop() readonly backgroundColor?:string
  @Prop() readonly opacity?:string | number

  @Getter('isEditing') isEditing!: boolean
}
</script>

<style lang="scss" scoped>
.iframe {
  width: 100%;
  height: 100%;
}
</style>
