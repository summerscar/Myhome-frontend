<template>
  <div class="message">
    <mu-snackbar :color="type" :open="showMessage">
      <mu-icon left :value="icons[type]"></mu-icon>
      {{message}}
      <mu-button flat slot="action" color="#fff" @click="showMessage = false">Close</mu-button>
    </mu-snackbar>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { bgConfig } from '@/utils/types'

@Component
export default class Message extends Vue {
  private showMessage: boolean = false
  private message: string = 'msg'
  private type: string = 'success'
  private timeout: number = 4000
  private icons: object = {
    success: 'check_circle',
    info: 'info',
    warning: 'priority_high',
    error: 'warning'
  }

  show (): void {
    this.showMessage = true

    if (this.timeout) {
      setTimeout(() => {
        this.showMessage = false
      }, this.timeout)
    }
  }

  close (): void {
    this.showMessage = false
  }
}
</script>

<style lang="scss" scoped>

</style>
