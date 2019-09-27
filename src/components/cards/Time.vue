<template>
  <card
    :width="width"
    :height="height"
    borderColor="none"
    backgroundColor="transparent"
  >
    <div class="time">
      <span class="hour">{{ timeFormat('HH') }}</span>
      <span class="minute">
        {{ timeFormat('mm') }}
      </span>
    </div>
    <div class="date">
      <span>{{ timeFormat('MM - DD') }} {{ day }}</span>
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
  @Prop({ default: '2' }) readonly width?:string | number
  @Prop({ default: '1' }) readonly height?:string | number
  @Prop({ default: 'HH:mm:ss' }) readonly format?:string

  private date: Date = new Date()
  private timer: ReturnType<typeof setInterval> | undefined

  private days:Array<string> = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

  get formatted (): string {
    return dayjs(this.date).format(this.format)
  }
  get day (): string {
    return this.days[dayjs(this.date).day()]
  }

  timeFormat (type: string): string {
    return dayjs(this.date).format(type)
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
div.time {
  user-select: none;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    padding: 0 5px;
  }
  span.hour {
    font-size: 3.8rem;
  }
  span.minute {
    font-size: 1.5rem;
  }
}
div.date {
  width: 100%;
}
</style>
