<template>
  <div class="home">
    <background></background>
    <home-header ref="header" :hassUser="hassUser" @exit="logout"></home-header>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <mu-container :style="containerStyle">
      <mu-row wrap="wrap">
        <time-card></time-card>
        <light-card :entity="hassEntities['light.yeelight_test']"></light-card>
        <weather-card :entity="hassEntities['weather.jia']"></weather-card>
        <iframe-card url="//music.163.com/outchain/player?type=2&id=31134835&auto=0&height=66"></iframe-card>
      </mu-row>
      <mu-list>
        <mu-list-item v-for="(entity, name) in hassEntities" :key="name" button :ripple="false">
          <mu-list-item-action>
            <mu-icon value="home"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>{{ name }}</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Background from '@/components/Background.vue' // @ is an alias to /src
import HomeHeader from '@/components/Header.vue'
import TimeCard from '@/components/cards/Time.vue'
import LightCard from '@/components/cards/Light.vue'
import WeatherCard from '@/components/cards/Weather.vue'
import IframeCard from '@/components/cards/Iframe.vue'

import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'
import {
  Auth,
  HassConfig,
  HassEntities,
  HassUser
} from 'home-assistant-js-websocket'

@Component({
  components: {
    Background,
    HomeHeader,
    TimeCard,
    LightCard,
    WeatherCard,
    IframeCard
  }
})
export default class Home extends Vue {
  @Getter('connected') connected!:boolean;
  @Getter('hassEntities') hassEntities!:HassEntities;
  @Getter('hassConfig') hassConfig!:HassConfig;
  @Getter('hassAuth') hassAuth!:Auth;
  @Getter('hassUser') hassUser!:HassUser;
  @Mutation('setConnected') setConnected!:Function

  private headerHeight: number = 0

  get containerStyle () {
    return {
      height: `calc(100vh - ${this.headerHeight}px)`,
      overflow: 'auto'
    }
  }

  mounted () {
    this.$nextTick(() => {
      let header:HTMLElement = (this.$refs.header as Vue).$el as HTMLElement
      this.headerHeight = header.offsetHeight
    })
  }
  logout ():void {
    this.setConnected(false)
    this.$router.push({ path: '/login' })
  }
}
</script>
<style lang="scss" scoped>
div.home {
  color: #fafafa;
}
</style>
