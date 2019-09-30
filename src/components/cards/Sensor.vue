<template>
  <card
    v-if="entity"
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
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'
import Card from '@/components/Card.vue'
import dayjs from 'dayjs'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/title'

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
    title: {
      text: this.entity.attributes.friendly_name,
      left: 'center',
      textStyle: {
        width: '100%',
        color: '#ffffff'
      }
    },
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
      name: this.entity.attributes.unit_of_measurement,
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
      smooth: false
    }]
  }
  @Watch('entity.state')
  function (value: number, oldvalue:number) {
    this.data.push({
      name: dayjs(),
      value: [new Date(), Number(value)]
    })
  }
  mounted () {
    this.data.push({
      name: dayjs(),
      value: [new Date(), Number(this.entity.state)]
    })
  }
}
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
