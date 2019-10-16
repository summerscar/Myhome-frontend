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
      <mu-flex v-if="isEditing" class="add" justify-content="center" align-items="center" @click="edit('add')">
        <mu-icon size="24" value=":fa fa-plus"></mu-icon>
      </mu-flex>
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
import { Getter } from 'vuex-class'
@Component({
  components: {
    EntityCard
  }
})
export default class Room extends Vue {
  @Prop() readonly room!: any
  @Prop() readonly hassEntities!: HassEntities

  @Getter('isEditing') isEditing!: boolean

  get filteredCard () {
    return this.room.cards.filter((card: any) => {
      if (card.entity_id) {
        return this.hassEntities[card.entity_id]
      } else {
        return true
      }
    })
  }

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
  .add {
    cursor: pointer;
    width: 8rem;
    height: 8rem;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 0.2rem;
    margin: 0.4rem;
  }
</style>
