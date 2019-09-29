import Component from './Message.vue'
import Vue from 'vue'

type messageOpt = {
  message: string,
  type: string,
  timeout?: number
}

let MessageConstructor = Vue.extend(Component)
let instance: any

const Message = function (opt: messageOpt) {
  if (!instance) {
    instance = new MessageConstructor({ data: opt }).$mount()
    document.body.appendChild(instance['$el'])
  }
  instance.show()
  return instance
}

Message.close = function () {
  instance.close()
}
export default Message
