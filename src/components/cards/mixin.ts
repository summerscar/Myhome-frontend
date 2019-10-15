import { Component, Prop, Vue, Emit } from 'vue-property-decorator'

@Component
export default class CardMixin extends Vue {
  @Emit('edit')
  edit () {}

  @Emit('remove')
  remove () {}

  @Emit('prev')
  prev () {}

  @Emit('next')
  next () {}
}
