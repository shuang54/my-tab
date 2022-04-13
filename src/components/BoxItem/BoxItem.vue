<script lang="ts" setup>
import { computed, onMounted, ref, } from 'vue';
import { useBox } from '../../store/box';
import { useRouter } from 'vue-router';
const props = defineProps({
  w: {
    default: 1,
    type: Number,

  },
  h: {
    default: 1,
    type: Number
  },
  title: {
    default: '',
    type: String
  },
  bgImage: {
    default: '',
    type: String
  },
  target: {
    default: '',
    type: String
  },
  i: { type: Number },
  x: { default: 0, type: Number },
  y: { default: 0, type: Number },
})
let ititle = computed(() => {
  if (props.title.length > 13) {
    return props.title.slice(0, 16) + '...'
  }
  return props.title
})

let boxStore = useBox()

let item: any = ref(null)
let zIndex: any = 1;
let el
console.log(props.x);

let option = { 'top': props.x + 'px', 'left': props.y + 'px' }
// 点击的位置
let x = 0
let y = 0
//定时器
let timerOurEvent: any = 0
onMounted(() => {
  el = item.value
  init()
})
//初始化
function init() {
  setEleStyle(option || {});
  el.onmousedown = (e) => {
    onMouseDown(e)
    el.setCapture && el.setCapture() //全局捕获
    return false
  }
}
//样式设置
function setEleStyle(option) {
  for (const key in option) {
    el.style[key] = option[key]
  }
}
//按下item
function onMouseDown(e) {
  zIndex = boxStore.getzIndex()
  setEleStyle({ "zIndex": zIndex, position: 'fixed', 'cursor': 'move' })
  x = e.clientX - el.offsetLeft;
  y = e.clientY - el.offsetTop;
  window.document.onmousemove = (e) => { onMouseMove(e); }
  window.document.onmouseup = (e) => onMouseUp(e)
}
//移动move
function onMouseMove(e) {
  let X = e.clientX - x
  let Y = e.clientY - y;
  let left, top
  left = X
  top = Y
  if (X < 0) {
    left = 0
  }
  if (Y < 0) {
    top = 0
  }
  if (X > document.documentElement.clientWidth - el.clientWidth) {
    left = document.documentElement.clientWidth - el.clientWidth
  }
  if (Y > document.documentElement.clientHeight - el.clientHeight - 60) {
    top = document.documentElement.clientHeight - el.clientHeight - 60
  }
  el.style.left = left + 'px'
  el.style.top = top + 'px'
  // 存储坐标

  boxStore.setBoxItemX(props.i, top)
  boxStore.setBoxItemY(props.i, left)

}
//释放
function onMouseUp(e) {
  document.onmousemove = null
  document.onmouseup = null
  setEleStyle({ 'cursor': 'pointer' })
  el.setCapture && el.setCapture() //释放全局捕获


}

const dblClickItem = () => {
  window.location.href = props.target
}
// fn是我们需要包装的事件回调, delay是每次推迟执行的等待时间
const debounce = function debounce(fn, delay) {

  let timeoutID;
  return function () {
    console.log(arguments);
    clearTimeout(timeoutID);
    let args = arguments;
    let that = this;
    timeoutID = setTimeout(function () {
      fn.apply(that, args);
    }, delay);
  };
};

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
  <div class="item" ref="item" :style="{
    'width': w * 100 + 'px', 'height': h * 100 + 'px',
  }">
    <div class=" item-icon">
      <a @dblclick="dblClickItem()"><img :src="bgImage" :alt="title"></a>
    </div>
    <p class="title">{{ ititle }}</p>
  </div>
</template>
<style lang="less" scoped>
.item {
  cursor: not-allowed;
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  .item-icon {
    width: 80%;
    height: 80%;

    img {
      width: 100%;
      height: 100%;
      border-radius: 25%;
    }
  }

  .title {
    font-size: 12px;
    color: white;
  }
}
</style>