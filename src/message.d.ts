import Vue from 'vue'

type opt = {
  message: string,
  type: string,
  timeout?: number
}

type messageOpt = (opt: opt) => any

declare module 'vue/types/vue' {
  interface Vue {
    $message: messageOpt
  }
}
