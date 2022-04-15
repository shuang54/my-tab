<script lang="ts" setup>
import { computed, onMounted, ref, toRaw } from 'vue';
import { processExpression } from '_@vue_compiler-core@3.2.31@@vue/compiler-core';
import { useBox } from '../../store/box';
import { debounce, throttle } from '../../utils/func.js'
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
  i: { default: 0, type: Number },
  x: { default: 0, type: Number },
  y: { default: 0, type: Number },
  id: { default: '', type: String }
})
// 对于标题超过13个字符的进行过滤
let ititle = computed(() => {
  if (props.title.length > 13) {
    return props.title.slice(0, 16) + '...'
  }
  return props.title
})

let boxStore = useBox()
let boxItemData = boxStore.boxItem

let item: any = ref(null)
let zIndex: any = 1;
// 存储item document对象
let el

let option = { 'top': props.y + 'px', 'left': props.x + 'px' }
// 点击的位置
let x = 0
let y = 0
//定时器
let timerOurEvent: any = 0
onMounted(() => {
  // 通过ref获取document对象
  el = item.value
  init()
})
//初始化
function init() {
  // 设置样式
  setEleStyle(option || {});

  // 给元素添加 鼠标按下 事件
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
  // 给当前按下的item设置zIndex
  zIndex = boxStore.getzIndex()
  setEleStyle({ "zIndex": zIndex, position: 'fixed', 'cursor': 'move' })
  // 通过点击的坐标  减去  item与界面的坐标
  // 获取鼠标点击位置与item的距离
  x = e.clientX - el.offsetLeft;
  y = e.clientY - el.offsetTop;
  window.document.onmousemove = (e) => { onMouseMove(e); }
  window.document.onmouseup = (e) => onMouseUp(e)
}
let left, top
//移动item
// let moveItem = throttle(() => {
//   el.style.left = left + 'px'
//   el.style.top = top + 'px'
// }, 16)
//移动move
function onMouseMove(e) {
  let X = e.clientX - x
  let Y = e.clientY - y;

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
  //移动item
  // moveItem()
  el.style.left = left + 'px'
  el.style.top = top + 'px'
}
//释放
function onMouseUp(e) {
  let flag = true
  // 网格化界面
  left = Math.round(left / 100) * 100
  top = Math.round(top / 100) * 100

  // 让item不叠加在一起
  doNotStask()

  document.onmousemove = null
  document.onmouseup = null
  setEleStyle({ 'cursor': 'pointer' })
  el.setCapture && el.setCapture() //释放全局捕获
}
// 让item不叠加在一起
function doNotStask() {
  let flag = true
  for (let i = 0; i < boxItemData.length; i++) {

    if (boxItemData[i].id == props.id) {
      continue
    }


    if (boxItemData[i].X == left && boxItemData[i].Y == top) {
      flag = false
      break;
    } else {
      flag = true
    }
  }
  console.log(props.i);

  // 当flag为true表示可以在当前位置存放坐标
  if (flag) {
    el.style.left = left + 'px'
    el.style.top = top + 'px'
    // 存储坐标
    boxStore.setBoxItemXY(props.i, left, top)
  } else {
    // 回到原来存储的位置
    el.style.left = boxItemData[props.i].X + 'px'
    el.style.top = boxItemData[props.i].Y + 'px'

  }
}

// 双击item跳转到对应网站
const dblClickItem = () => {
  window.location.href = props.target
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