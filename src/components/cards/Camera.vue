<template>
    <card
      :width="width"
      :height="height"
      v-if="entity"
      :borderColor="borderColor"
      :backgroundColor="backgroundColor"
    >
      <mu-flex class="camera">
        <img
          class="img"
          :src="src"
        >
        <div class="state">{{ entity.state }}</div>
      </mu-flex>
    </card>
</template>

<script lang="ts">
import { HassEntity, Auth } from 'home-assistant-js-websocket'
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import Card from '@/components/Card.vue'
import {
  Getter
} from 'vuex-class'

@Component({
  components: {
    Card
  }
})
export default class Camera extends Vue {
  @Prop({ default: '3' }) readonly width?:string | number
  @Prop({ default: '2' }) readonly height?:string | number
  @Prop() readonly entity!: HassEntity
  @Prop() readonly borderColor?:string
  @Prop() readonly backgroundColor?:string

  @Getter('hassAuth') hassAuth!:Auth;

  get src ():string {
    return `${this.hassAuth.data.hassUrl}${this.entity.attributes.entity_picture}&${new Date().toISOString().slice(-13, -5)}`
  }
}
</script>

<style lang="scss" scoped>
.camera {
  user-select: none;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
  .state {
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 0;
  }
}
</style>
