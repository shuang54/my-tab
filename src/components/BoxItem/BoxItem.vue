<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref, toRaw, reactive, watch, toRefs } from 'vue';
import { useBox } from '../../store/box';
const props = defineProps({
  i: { default: 0, type: Number },
  boxItemData: { default: {}, type: Object }
})

let boxStore = useBox()
const boxItemData = boxStore.boxItem
// const { boxItem: boxItemData } = storeToRefs(boxStore)
const boxItemDataByIndex = boxItemData[props.i]
let { w, h, title, bgImage, target, X, Y, id, bgType, bgColor, bgFont, bgText } = toRefs(boxItemDataByIndex)
let item: any = ref(null)
let zIndex: any = 1;
// 存储item document对象
let el

let option = { 'top': Y.value + 'px', 'left': X.value + 'px' }

let x = 0
let y = 0

// 声明拖动的默认状态是：false
let isDrag = false
let timmerHandle: any = null
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
    // el.setCapture && el.setCapture() //全局捕获
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
  // 如果是右键按下直接返回
  if (e.buttons == 2) return;

  // if (rightClick) return;
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
//移动move
function onMouseMove(e) {
  isDrag = true
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
  if (Y > document.documentElement.clientHeight - el.clientHeight) {
    top = document.documentElement.clientHeight - el.clientHeight
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
  if (boxStore.GlobalConfiguration.isGridding) {
    left = Math.round(left / 100) * 100
    top = Math.round(top / 100) * 100
  }
  if (top > document.documentElement.clientHeight - el.clientHeight) top -= 100
  if (left > document.documentElement.clientWidth - el.clientWidth) left -= 100
  // 让item不叠加在一起
  doNotStask()
  window.document.onmousemove = null
  window.document.onmouseup = null
  setEleStyle({ 'cursor': 'pointer' })
  // el.setCapture && el.setCapture() //释放全局捕获

  if (!isDrag) {
    window.location.href = target.value
  }
  isDrag = false


}
// 让item不叠加在一起
function doNotStask() {
  let flag = true
  for (let i = 0; i < boxItemData.length; i++) {

    if (boxItemData[i].id == id.value) {
      continue
    }
    if (boxItemData[i].X == left && boxItemData[i].Y == top) {
      flag = false
      break;
    } else {
      flag = true
    }
  }

  // 当flag为true表示可以在当前位置存放坐标
  if (flag && isDrag) {
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
//默认排序
watch(boxItemDataByIndex, (nVal, oVal) => {
  el.style.left = nVal.X + 'px'
  el.style.top = nVal.Y + 'px'
  let { w, h, title, bgImage, target, X, Y, id, bgType, bgColor, bgFont, bgText } = toRefs(nVal)
})
// 禁用鼠标右键
let rightClick = ref(false)
function handlePaste(event) {

  rightClick.value = true
  event.preventDefault()
  return false
}
// 图片加载失败
const imgError = () => {
  bgType.value = 'icon'

}
</script>
<template>
  <div @contextmenu.native="handlePaste($event)" class="item" ref="item" :style="{
    'width': w * 100 + 'px', 'height': h * 100 + 'px',
  }">
    <div class="item-icon">
      <a class="icon-a">
        <img v-if="bgType == 'image'" :src="'https://api.iowen.cn/favicon/get.php?url=' + bgImage" :alt="title"
          @error="imgError()">
        <p class="imageIcon" v-else-if="bgType == 'icon'">
          <!-- 图片-->
          <div class="icon" :style="{ 'background-color': bgColor }">
            <span :style="{ 'font-size': bgFont + 'px' }" class="icon-name">{{ bgText }}</span>
          </div>
        </p>
      </a>
    </div>
    <p class="title">{{ title }}</p>
  </div>
</template>
<style lang="less" scoped>
.item {
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  &:hover {
    // margin: 0 0.5rem;
    animation: pulse;
    animation-duration: .5s;

  }

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
    width: 100%;
    font-size: 15px;
    color: white;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.icon-a {


  .icon {
    width: 80px;
    height: 80px;
    border-radius: 18px;

    .icon-name {
      display: block;
      text-align: center;
      line-height: 80px;

      &:hover {
        color: #666;
      }

    }
  }
}
</style>