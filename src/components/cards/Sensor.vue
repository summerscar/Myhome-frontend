<template>
  <card
    :width="width"
    :height="height"
    :borderColor="borderColor"
    :backgroundColor="backgroundColor"
  >
    <v-chart class="echarts" :options="option"/>
  </card>
</template>
<script lang="ts">
import { HassEntity } from 'home-assistant-js-websocket'
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import Card from '@/components/Card.vue'
import dayjs from 'dayjs'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'

@Component({
  components: {
    Card,
    'v-chart': ECharts
  }
})
export default class Sensor extends Vue {
  @Prop({ default: '3' }) readonly width?:string | number
  @Prop({ default: '2' }) readonly height?:string | number
  @Prop() readonly entity!: HassEntity
  @Prop() readonly borderColor?:string
  @Prop() readonly backgroundColor?:string
  private data: Array<object> = []
  private option = {
    xAxis: {
      type: 'time',
      splitLine: {
        show: false
      },
      nameTextStyle: {
        color: 'white'
      },
      axisLine: {
        lineStyle: {
          color: 'white'
        }
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: 'white'
        }
      }
    },
    series: [{
      data: this.data,
      type: 'line',
      smooth: true
    }]
  }

  mounted () {
    setInterval(() => {
      // this.data.push(Number(this.entity.state))
      this.data.push({
        name: dayjs(),
        value: Math.random() * 100
      })
    }, 3000)
  }
}
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
