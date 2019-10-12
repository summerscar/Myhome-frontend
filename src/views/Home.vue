<template>
  <div class="home">
    <background :config="config.theme.background"></background>
    <home-header ref="header" :config="config.theme.header" :hassUser="hassUser" @exit="logout"></home-header>
    <mu-container :style="containerStyle">
      <mu-row wrap="wrap">
        <entity-card
          v-for="(item, index) in config.rooms[roomIndex].cards"
          :key="index"
          :entity="hassEntities[item.entity_id]"
          :cardType="item.card_type"
          :optional="item.optional"/>
      </mu-row>
    </mu-container>
    <navigation :config="config.theme.navigation" :list="config.rooms" :value="0" @change="roomChange"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Background from '@/components/Background.vue' // @ is an alias to /src
import HomeHeader from '@/components/Header.vue'
import Navigation from '@/components/Navigation.vue'
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
    Navigation,
    EntityCard
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
  }
}
</script>
<style lang="scss" scoped>
div.home {
  color: #fafafa;
}
</style>
