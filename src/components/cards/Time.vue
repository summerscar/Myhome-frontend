<template>
  <card>
    <div>
      {{ hour }} : {{ minute }}
    </div>
  </card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import Card from '@/components/Card.vue'
import dayjs from 'dayjs'

@Component({
  components: {
    Card
  }
})
export default class Time extends Vue {
  private date: Date = new Date()

  get hour (): Number {
    return dayjs(this.date).hour()
  }
  get minute (): Number {
    return dayjs(this.date).minute()
  }
  get second (): Number {
    return dayjs(this.date).second()
  }
  created () {
    setTimeout(() => {
      this.date = new Date()
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>

</style>
