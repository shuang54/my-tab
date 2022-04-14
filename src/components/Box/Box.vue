<script lang="ts" setup>
import { reactive, watch } from 'vue'
import BoxItem from '../BoxItem/BoxItem.vue';
import { useBox } from '../../store/box';

const boxStore = useBox()
let boxItem = reactive(boxStore.boxItem)

watch(boxItem, (nVal, oVal) => {

  localStorage.setItem('boxItemData', JSON.stringify(boxItem))

})

//如果没有从本地获取数据，那么从发送请求获取数据
if (boxItem == '') {
}

// fn是我们需要包装的事件回调, delay是每次推迟执行的等待时间
const debounce = (fn, delay) => {
  // 定时器
  let timer: any = null

  // 将debounce处理结果当作函数返回
  return function () {
    // 保留调用时的this上下文
    let context = this
    // 保留调用时传入的参数
    let args = arguments

    // 每次事件被触发时，都去清除之前的旧定时器
    if (timer) {
      clearTimeout(timer)
    }
    // 设立新定时器
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

// fn是我们需要包装的事件回调, interval是时间间隔的阈值
function throttle(fn, interval) {
  // last为上一次触发回调的时间
  let last = 0

  // 将throttle处理结果当作函数返回
  return function () {
    // 保留调用时的this上下文
    let context = this
    // 保留调用时传入的参数
    let args = arguments
    // 记录本次触发回调的时间
    let now = +new Date()

    // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
    if (now - last >= interval) {
      // 如果时间间隔大于我们设定的时间间隔阈值，则执行回调
      last = now;
      fn.apply(context, args);
    }
  }
}
</script>

<template>
  <div class="box-grid">
    <BoxItem v-for="item, i in boxItem" :key="item.id" :w="item.w" :h="item.h" :title="item.title"
      :bgImage="item.bgImage" :target="item.target" :i="i" :x="item.X" :y="item.Y" :id="item.id">
    </BoxItem>
  </div>
</template>
<style lang="less">
.box-grid {
  height: 100%;
  position: relative;
}
</style>