<template>
  <card
    v-if="entity"
    :width="width"
    :height="height"
    :borderColor="borderColor"
    :backgroundColor="backgroundColor"
  >
    <v-chart class="echarts" :options="type === 'line' ? lineOpt : gaugeOpt"/>
  </card>
</template>
<script lang="ts">
import { HassEntity } from 'home-assistant-js-websocket'
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'
import Card from '@/components/Card.vue'
import dayjs from 'dayjs'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/gauge'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'

type dataItem = {
  name: string | Date,
  value: Array<any>
}

type guageData = {
  name: string | Date,
  value: string | number
}

@Component({
  components: {
    Card,
    'v-chart': ECharts
  }
})
export default class Sensor extends Vue {
  @Prop({ default: '3' }) readonly width?: string | number
  @Prop({ default: '2' }) readonly height?: string | number
  @Prop({ default: 'line' }) readonly type?: string
  @Prop({ default: 0 }) readonly min?:number | string
  @Prop({ default: 10 }) readonly max?:number | string
  @Prop() readonly entity!: HassEntity
  @Prop() readonly borderColor?: string
  @Prop() readonly backgroundColor?: string

  private data: Array<dataItem> = []
  private lineOpt = {
    title: {
      text: this.entity.attributes.friendly_name,
      left: 'center',
      textStyle: {
        width: '100%',
        color: '#ffffff'
      }
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params: Array<any>) => {
        let data = params[0]
        return dayjs(data.name).format('HH:mm') + '<br/>' + data.value[1] + this.entity.attributes.unit_of_measurement
      },
      axisPointer: {
        animation: false
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
      name: new Date(),
      value: [new Date(), Number(value)]
    })
  }

  get gaugeOpt (): object {
    let guageData: guageData
    let data
    if (this.data.length) {
      data = this.data[this.data.length - 1]
      guageData = {
        name: this.entity.attributes.unit_of_measurement || '',
        value: data.value[1]
      }
    } else {
      guageData = {
        name: this.entity.attributes.unit_of_measurement || '',
        value: 0
      }
    }

    let opt = {
      title: this.lineOpt.title,
      series: [
        {
          min: this.min,
          max: this.max,
          title: {
            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontSize: 12,
              color: '#fff',
              shadowColor: '#fff', // 默认透明
              shadowBlur: 0
            }
          },
          axisLine: { // 坐标轴线
            lineStyle: { // 属性lineStyle控制线条样式
              color: [[0.09, 'white'], [0.82, 'white'], [1, 'white']],
              width: 5,
              shadowColor: '#fff', // 默认透明
              shadowBlur: 0
            }
          },
          splitLine: { // 分隔线
            length: 10, // 属性length控制线长
            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
              width: 3,
              color: '#fff',
              shadowColor: '#fff', // 默认透明
              shadowBlur: 0
            }
          },
          pointer: {
            width: 3,
            shadowColor: '#fff', // 默认透明
            shadowBlur: 0
          },
          axisLabel: { // 坐标轴小标记
            textStyle: { // 属性lineStyle控制线条样式
              fontWeight: 'normal',
              color: '#fff',
              shadowColor: '#fff', // 默认透明
              shadowBlur: 10
            }
          },
          name: this.entity.attributes.friendly_name,
          type: 'gauge',
          detail: {
            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'normal',
              color: '#fff',
              fontSize: 20
            }
          },
          data: [guageData]
        }
      ]
    }
    return opt
  }

  mounted () {
    this.data.push({
      name: new Date(),
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
