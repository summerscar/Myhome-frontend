import Vue from 'vue'

export function debounce (callback: Function, time: number, self: Vue) {
  let recent = +new Date()
  let timer:number

  return function () {
    let args = arguments
    let now = +new Date()
    function exec () {
      recent = now
      callback.apply(self, args)
    }
    if (!timer) {
      timer = setTimeout(exec, time)
    } else {
      if (now - recent < time) {
        clearTimeout(timer)
        timer = setTimeout(exec, time)
      } else {
        exec()
      }
    }
  }
}
