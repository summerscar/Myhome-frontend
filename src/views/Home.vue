<template>
  <div class="home">
    <background :config="config.theme.background"></background>
    <home-header ref="header" :config="config.theme.header" :hassUser="hassUser" @exit="logout"></home-header>
    <mu-container :style="containerStyle">
      <room :room="config.rooms[roomIndex]" :hassEntities="hassEntities"/>
    </mu-container>
    <navigation :config="config.theme.navigation" :list="config.rooms" :value="roomIndex" @change="roomChange"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Background from '@/components/Background.vue' // @ is an alias to /src
import HomeHeader from '@/components/Header.vue'
import Navigation from '@/components/Navigation.vue'
import Room from '@/components/Room.vue'
import Route from 'vue-router'
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

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteUpdate',
  'beforeRouteLeave'
])

@Component({
  components: {
    Background,
    HomeHeader,
    Navigation,
    Room
  }
})
export default class Home extends Vue {
  @Getter('connected') connected!: boolean
  @Getter('hassEntities') hassEntities!: HassEntities
  @Getter('hassConfig') hassConfig!: HassConfig
  @Getter('hassAuth') hassAuth!: Auth
  @Getter('hassUser') hassUser!: HassUser
  @Getter('hassConnection') hassConnection!: Connection
  @Getter('config') config!: object
  @Mutation('setConnected') setConnected!: Function

  private headerHeight: number = 0
  private roomIndex: number = 0
  get containerStyle () {
    return {
      height: `calc(100vh - ${this.headerHeight + 56}px)`,
      overflow: 'auto'
    }
  }

  beforeRouteEnter (to: Route, from: Route, next: Function) {
    console.log('beforeRouteEnter')
    next()
  }

  beforeRouteLeave (to: Route, from: Route, next: Function) {
    console.log('beforeRouteLeave')
    next()
  }
  created () {
    this.roomIndex = Number(this.$route.params.roomid)
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
  roomChange (roomIndex: number) {
    this.roomIndex = roomIndex
    this.$router.push({
      name: 'home',
      params: {
        roomid: String(roomIndex)
      }
    })
  }
}
</script>
<style lang="scss" scoped>
div.home {
  color: #fafafa;
}
</style>
