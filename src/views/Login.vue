<template>
  <div class="login">
    <img width="120px" alt="Vue logo" src="../assets/logo.png">
    <h1>登录</h1>
    <mu-container>
        <mu-text-field
          class="hassurl"
          v-model="hassUrl"
          label="HomeAssistant url"
          label-float icon="home"
          :error-text="invalidText"
          @keypress.enter="login"
        >
        </mu-text-field><br/>
        <mu-button color="primary" @click="login">Next</mu-button>
    </mu-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { connectToHASS, loadTokens } from '@/utils/homeassistant'

@Component
export default class Login extends Vue {
    private hassUrl: string = 'http://localhost:8123'
    private invalidText: string = ''

    @Watch('hassUrl')
    function (url: string, oldval: string) {
      if (!url) {
        this.invalidText = 'No Home Assistant URL.'
        return
      }
      if (!url.startsWith('http') || !url.includes('://')) {
        this.invalidText = 'Home Assistant URL invalid!'
        return
      }
      if (window.location.protocol === 'https:') {
        if (url.startsWith('http:')) {
          this.invalidText = 'Your HASS instance must use SSL/https.'
          return
        }
      }
      this.invalidText = ''
    }
    login () {
      connectToHASS(this.hassUrl).then(() => {
        this.$router.push({ path: '/' })
      })
    }
    created () {

    }
}
</script>
<style lang="scss" scoped>
div.hassurl {
    margin: 20px 0 40px;
}
</style>
