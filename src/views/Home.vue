<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <mu-container>
      <div>当前用户: {{ hassUser && hassUser.name }}</div>
       <mu-list>
        <mu-list-item v-for="(entity, name) in hassEntities" :key="name" button :ripple="false">
          <mu-list-item-action>
            <mu-icon value="inbox"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>{{ name }}</mu-list-item-title>
        </mu-list-item>
       </mu-list>
      <mu-button color="primary" @click="logout">exit</mu-button>
    </mu-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
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
    HelloWorld
  }
})
export default class Home extends Vue {
  @Getter('connected') connected!:boolean;
  @Getter('hassEntities') hassEntities!:HassEntities;
  @Getter('hassConfig') hassConfig!:HassConfig;
  @Getter('hassAuth') hassAuth!:Auth;
  @Getter('hassUser') hassUser!:HassUser;

  logout ():void {

  }
}
</script>
