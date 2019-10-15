<template>
  <div class="home">
    <background :config="config.theme.background"></background>
    <home-header ref="header"
      :config="config.theme.header"
      :hassUser="hassUser"
      @exit="logout"
      @setting="openSetting"
      @edit="setIsEditing"
    />
    <mu-container :style="containerStyle">
      <mu-carousel
        class="carousel"
        hide-controls
        hide-indicators
        :active="roomIndex"
        :cycle="false"
        ref="carousel"
      >
        <mu-carousel-item
          v-for="(room, index) in config.rooms"
          :key="index"
        >
          <room
            :room="room"
            :hassEntities="hassEntities"
            @edit="cardEdit($event, index)"
          />
        </mu-carousel-item>
      </mu-carousel>
    </mu-container>
    <navigation :config="config.theme.navigation" :list="config.rooms" :value="roomIndex" @change="roomChange"/>
    <setting :isOpen.sync="isOpenSetting" :config="config" @change="settingChange"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Background from '@/components/Background.vue' // @ is an alias to /src
import HomeHeader from '@/components/Header.vue'
import Navigation from '@/components/Navigation.vue'
import Setting from '@/components/Setting.vue'
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
    Room,
    Setting
  }
})
export default class Home extends Vue {
  @Getter('connected') connected!: boolean
  @Getter('hassEntities') hassEntities!: HassEntities
  @Getter('hassConfig') hassConfig!: HassConfig
  @Getter('hassAuth') hassAuth!: Auth
  @Getter('hassUser') hassUser!: HassUser
  @Getter('hassConnection') hassConnection!: Connection
  @Getter('isEditing') isEditing!: boolean
  @Getter('config') config!: any
  @Mutation('setConnected') setConnected!: Function
  @Mutation('setConfig') setConfig!: Function
  @Mutation('setIsEditing') setIsEditing!: Function

  private headerHeight: number = 0
  private roomIndex: number = 0
  private isOpenSetting: boolean = false

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

  openSetting () {
    this.isOpenSetting = true
  }
  settingChange (config: object) {
    this.setConfig(config)
  }
  logout ():void {
    this.setConnected(false)
    this.$router.push({ path: '/login' })
  }
  roomChange (roomIndex: number) {
    this.roomIndex = roomIndex
    console.log('room change:', roomIndex)
    this.$router.push({
      name: 'home',
      params: {
        roomid: String(roomIndex)
      }
    })
  }
  cardEdit (changeInfo: any, roomIndex: number) {
    changeInfo = Object.assign(changeInfo, { roomIndex })
    let selectedCard
    switch (changeInfo.type) {
      case 'edit':
        console.log(changeInfo)
        break
      case 'remove':
        this.config.rooms[roomIndex].cards.splice(changeInfo.card_index, 1)
        break
      case 'prev':
        selectedCard = this.config.rooms[roomIndex].cards.splice(changeInfo.card_index, 1)[0]
        this.config.rooms[roomIndex].cards.splice(changeInfo.card_index - 1, 0, selectedCard)
        break
      case 'next':
        selectedCard = this.config.rooms[roomIndex].cards.splice(changeInfo.card_index, 1)[0]
        this.config.rooms[roomIndex].cards.splice(changeInfo.card_index + 1, 0, selectedCard)
        break
      default:
        break
    }
  }
}
</script>
<style lang="scss" scoped>
div.home {
  color: #fafafa;
}
.carousel {
  height: 100%;
}
</style>
