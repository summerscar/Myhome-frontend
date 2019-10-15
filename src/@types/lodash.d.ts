import Vue from 'vue'
import lodash from 'lodash'
declare module 'vue/types/vue' {
  interface Vue {
    $_: typeof lodash
  }
}
