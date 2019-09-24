<template>
  <div class="login">
    <img width="120px" alt="Vue logo" src="../assets/logo.png">
    <h1>登录</h1>
    <mu-container>
        <mu-text-field class="hassurl" v-model="hassUrl" label="HomeAssistant url" label-float icon="home"></mu-text-field><br/>
        <mu-button color="primary" @click="login">Next</mu-button>
    </mu-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { connectToHASS, loadTokens } from '@/utils/homeassistant'

@Component
export default class Login extends Vue {
    private hassUrl: string = 'http://localhost:8123'

    login () {
      connectToHASS(this.hassUrl)
    }
    created () {
      if (loadTokens()) {
        connectToHASS(this.hassUrl)
      }
    }
}
</script>
<style lang="scss" scoped>
div.hassurl {
    margin: 20px 0 40px;
}
</style>
