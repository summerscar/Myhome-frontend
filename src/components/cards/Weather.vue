<template>
  <card
    v-if="entity['entity_id']"
    class="weather"
    :width="width"
    :height="height"
  >
    <mu-flex class="name" justify-content="center">
      {{ entity.attributes.friendly_name }}
    </mu-flex>
    <mu-flex class="today" justify-content="center" align-items="center">
      <mu-flex class="weather-state">
        <mu-icon :value="`:mdi mdi-${weatherIcon[entity.state]}`"></mu-icon>
      </mu-flex>
      <mu-flex class="temperature">{{ entity.attributes.temperature }}°</mu-flex>
      <mu-flex class="other" direction="column">
        <div><mu-icon value=":mdi mdi-water"></mu-icon>  {{ entity.attributes.humidity }}%</div>
        <div><mu-icon value=":mdi mdi-weather-windy"></mu-icon>  {{ entity.attributes.wind_speed }}km</div>
      </mu-flex>
    </mu-flex>
    <mu-flex class="forecast" wrap="wrap">
      <mu-flex class="day" justify-content="around" v-for="(day, index) in entity.attributes.forecast" :key="index">
        <div class="date">{{ dayjs(day.datetime).format('MM-DD') }}</div>
        <div class="day">{{ days[dayjs(day.datetime).day()] }}</div>
        <div>
          <mu-icon :value="`:mdi mdi-${weatherIcon[day.condition]}`"></mu-icon>
        </div>
        <div class="temperature">{{ day.temperature }}°</div>
      </mu-flex>
    </mu-flex>
    <mu-flex class="update" direction="row-reverse">
      <div>{{ formatUpdate(entity['last_updated']) }}</div>
    </mu-flex>
  </card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import { HassEntity } from 'home-assistant-js-websocket'
import Card from '@/components/Card.vue'
import dayjs from 'dayjs'

@Component({
  components: {
    Card
  }
})
export default class Weather extends Vue {
  @Prop({ default: '2' }) readonly width?:string | number
  @Prop({ default: '2' }) readonly height?:string | number
  @Prop() readonly entity!: HassEntity
  private dayjs:Function = dayjs
  private days:Array<string> = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  private weatherIcon = {
    'clear-night': 'weather-night',
    cloudy: 'weather-cloudy',
    exceptional: 'alert-circle-outline',
    fog: 'weather-fog',
    hail: 'weather-hail',
    lightning: 'weather-lightning',
    'lightning-rainy': 'weather-lightning-rainy',
    partlycloudy: 'weather-partly-cloudy',
    pouring: 'weather-pouring',
    rainy: 'weather-rainy',
    snowy: 'weather-snowy',
    'snowy-rainy': 'weather-snowy-rainy',
    sunny: 'weather-sunny',
    windy: 'weather-windy',
    'windy-variant': 'weather-windy-variant'
  }

  formatUpdate (time: string):string {
    let updateTime = new Date(time).valueOf()
    let now = new Date().valueOf()
    const minute = 1000 * 60
    const hour = minute * 60
    const day = hour * 24

    let diffValue = now - updateTime

    let dayC = diffValue / day
    let hourC = diffValue / hour
    let minC = diffValue / minute

    let updateStr
    if (dayC > 1) {
      updateStr = Math.floor(dayC) + ' day ago'
    } else if (hourC > 1) {
      updateStr = Math.floor(hourC) + ' hour ago'
    } else if (minC > 1) {
      updateStr = Math.floor(minC) + ' min ago'
    } else {
      updateStr = 'recently'
    }
    return updateStr
  }
}
</script>

<style lang="scss" scoped>
.weather {
  padding: 0.8rem;
  user-select: none;
  .name {
    font-size: 1.5rem;
    width: 100%;
  }
  .today {
    .weather-state {
      padding: 0 8px;
      font-size: 1.8rem;
    }
    .temperature {
      font-size: 2rem;
      padding: 0 10px;
    }
    .other {
      font-size: 12px;
    }
  }
  .forecast{
    width: 100%;
    &>.day {
      width: 100%;
    }
  }
  .update {
    width: 100%;
    padding: 0 1rem;
  }
}
</style>
