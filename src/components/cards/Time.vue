<template>
  <card>
    <div>
      {{ formatted }}
    </div>
  </card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import Card from '@/components/Card.vue'
import dayjs from 'dayjs'

@Component({
  components: {
    Card
  }
})
export default class Time extends Vue {
  @Prop({ default: 'HH:mm:ss' }) readonly format?:string
  private date: Date = new Date()
  private timer: ReturnType<typeof setInterval> = 0

  get formatted (): string {
    return dayjs(this.date).format(this.format)
  }
  get hour (): number {
    return dayjs(this.date).hour()
  }
  get minute (): number {
    return dayjs(this.date).minute()
  }
  get second (): number {
    return dayjs(this.date).second()
  }
  created () {
    this.timer = setInterval(() => {
      this.date = new Date()
    }, 1000)
  }
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="scss" scoped>

</style>
