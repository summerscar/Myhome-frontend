<template>
    <mu-row wrap="wrap">
      <entity-card
        v-for="(item, index) in room.cards"
        :key="index"
        :entity="hassEntities[item.entity_id]"
        :cardType="item.card_type"
        :optional="item.optional"
        @edit="edit('edit', item, index)"
        @remove="edit('remove', item, index)"
        @prev="edit('prev', item, index)"
        @next="edit('next', item, index)"/>
    </mu-row>
</template>
<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import EntityCard from '@/components/Entity.vue'
import {
  HassConfig,
  HassEntities,
  HassUser
} from 'home-assistant-js-websocket'
import { headerConfig, room } from '@/utils/types'

@Component({
  components: {
    EntityCard
  }
})
export default class Room extends Vue {
  @Prop() readonly room!: Array<object>
  @Prop() readonly hassEntities!: HassEntities

  @Emit('edit')
  edit (type: string, item: object, index: number) {
    return {
      type,
      room: this.room,
      card: item,
      card_index: index
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
