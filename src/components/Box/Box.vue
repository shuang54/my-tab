<script lang="ts" setup>
import BoxItem from '../BoxItem/BoxItem.vue';
import { useBox } from '../../store/box';
const boxStore = useBox()
let boxItem = boxStore.boxItem
</script>

<template>
  <div class="box-grid">
    <BoxItem v-for="item, i in boxItem" :key="item.id" :w="item.w" :h="item.h" :title="item.title"
      :bgImage="item.bgImage" :target="item.target" :i="i">
    </BoxItem>
</div>
</template>
<style lang="less">
.box-grid {
  height: 100%;
  position: relative;
}
</style>