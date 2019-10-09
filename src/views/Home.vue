<template>
  <div class="home">
    <background></background>
    <home-header ref="header" :hassUser="hassUser" @exit="logout"></home-header>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <mu-container :style="containerStyle">
      <mu-row wrap="wrap">
        <time-card width="2" borderColor="none" backgroundColor="transparent"></time-card>
        <weather-card :entity="hassEntities['weather.jia']"></weather-card>
        <entity-card :entity="hassEntities['weather.jia']"></entity-card>
        <iframe-card borderColor="none" url="//player.bilibili.com/player.html?aid=67792202&cid=117509299&page=1" width="4" height="3" opacity="0.8"></iframe-card>
        <iframe-card borderColor="none" url="//music.163.com/outchain/player?type=2&id=31134835&auto=0&height=66" width="1.5" height="0.8" opacity="0.8"></iframe-card>
        <sensor-card :entity="hassEntities['sensor.asuswrt_upload_speed']"></sensor-card>
        <sensor-card :entity="hassEntities['sensor.asuswrt_download_speed']"></sensor-card>
        <light-card :entity="hassEntities['light.yeelight_test']"></light-card>
        <switch-card :entity="hassEntities['light.yeelight_test']"></switch-card>
        <cover-card :entity="hassEntities['light.yeelight_test']"></cover-card>
        <attributes-card :entity="hassEntities['sensor.asuswrt_download']"></attributes-card>
        <attributes-card :entity="hassEntities['sensor.asuswrt_upload']"></attributes-card>
        <attributes-card :entity="hassEntities['device_tracker.shenyudembp']"></attributes-card>
        <camera-card :entity="hassEntities['camera.uvc_g3_flex']"></camera-card>
      </mu-row>
      <!-- <mu-list>
        <mu-list-item v-for="(entity, name) in hassEntities" :key="name" button :ripple="false">
          <mu-list-item-action>
            <mu-icon value="home"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>{{ name }}</mu-list-item-title>
        </mu-list-item>
      </mu-list> -->
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
import AttributesCard from '@/components/cards/Attributes.vue'
import CameraCard from '@/components/cards/Camera.vue'
import SensorCard from '@/components/cards/Sensor.vue'
import SwitchCard from '@/components/cards/Switch.vue'
import CoverCard from '@/components/cards/Cover.vue'
import EntityCard from '@/components/Entity.vue'
import Message from '@/components/message/index'
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
  HassUser,
  Connection
} from 'home-assistant-js-websocket'

@Component({
  components: {
    Background,
    HomeHeader,
    TimeCard,
    LightCard,
    WeatherCard,
    IframeCard,
    AttributesCard,
    CameraCard,
    SensorCard,
    SwitchCard,
    CoverCard,
    EntityCard
  }
})
export default class Home extends Vue {
  @Getter('connected') connected!:boolean;
  @Getter('hassEntities') hassEntities!:HassEntities;
  @Getter('hassConfig') hassConfig!:HassConfig;
  @Getter('hassAuth') hassAuth!:Auth;
  @Getter('hassUser') hassUser!:HassUser;
  @Getter('hassConnection') hassConnection!:Connection;
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

    this.hassConnection.addEventListener('disconnected', () => {
      this.$message({
        message: '连接中断',
        type: 'warning',
        timeout: 4000
      })
    })

    // this.hassConnection.addEventListener('ready', () => {
    //   this.$message({
    //     message: '连接成功',
    //     type: 'success',
    //     timeout: 4000
    //   })
    // })
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
