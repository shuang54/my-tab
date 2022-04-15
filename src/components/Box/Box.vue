<script lang="ts" setup>
import { reactive, watch, ref, onMounted } from 'vue'
import BoxItem from '../BoxItem/BoxItem.vue';
import { useBox } from '../../store/box';

const boxStore = useBox()
let boxItemData = reactive(boxStore.boxItem)

watch(boxItemData, (nVal, oVal) => {

  localStorage.setItem('boxItemData', JSON.stringify(boxItemData))

})


//如果没有从本地获取数据，那么从发送请求获取数据
if (boxItemData == '') {
}

// 对item进行排序
// 获取box元素
const box: any = ref(null)
// 定义box的宽高
let BoxOffsetHeight
let BoxOffsetWidth
// 获取box的宽高
onMounted(() => {
  console.log(box.value.offsetWidth);

  BoxOffsetHeight = box.value.offsetHeight
  BoxOffsetWidth = box.value.offsetWidth
  // 调用默认排序方法
  defaultSorting()
})
function defaultSorting() {
  const interval = 100
  let page = 0
  let num = 0
  boxItemData.forEach(element => {
    let Y = num * 100
    if (Y > BoxOffsetHeight - 100) {
      page++
      num = 0
      Y = num * 100
    }
    let X = 100 * page
    element.X = X
    element.Y = Y
    num++
  });

}

</script>

<template>
  <div ref="box" class="box-grid">
    <BoxItem v-for="item, i in boxItemData" :key="item.id" :w="item.w" :h="item.h" :title="item.title"
      :bgImage="item.bgImage" :target="item.target" :x="item.X" :y="item.Y" :id="item.id" :i="i">
    </BoxItem>
  </div>
</template>
<style lang="less">
.box-grid {
  height: 100%;
  position: relative;
}
</style>