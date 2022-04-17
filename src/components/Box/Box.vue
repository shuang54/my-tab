<script lang="ts" setup>
import { reactive, watch, ref, onMounted } from 'vue'
import BoxItem from '../BoxItem/BoxItem.vue';
import { useBox } from '../../store/box';
import { storeToRefs } from 'pinia';
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
const boxStore = useBox()
let boxItemData = reactive(boxStore.boxItem)

// 监听boxItemData
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
  BoxOffsetHeight = box.value.offsetHeight
  BoxOffsetWidth = box.value.offsetWidth
  // 调用默认排序方法
  // defaultSorting()
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
// 右击菜单
let visible = ref(false)
let top = ref(0)
let left = ref(0)
watch(visible, (value) => {
  if (value) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})
function openMenu(e) {
  let x = e.pageX;
  let y = e.pageY;
  top.value = y;
  left.value = x;
  visible.value = true;
}
function closeMenu() {
  visible.value = false;
}
function handlePaste(event) {
  // 禁用鼠标右键
  event.preventDefault()
  return false
}
// 设置
const drawer = ref(false)

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
// 更新壁纸
onMounted(() => {
  boxStore.updatedGlobalPicture().then(() => {

    // box.value.style.backgroundImage = `url(${globalPicture.value})`
  })
})

let { globalPicture } = storeToRefs(boxStore)
const updateWallpaper = () => {
  boxStore.updatedGlobalPicture().then(() => {
    // box.value.style.backgroundImage = `url(${globalPicture.value})`
  })
}
</script>

<template>
  <div class="bg">
    <img :src="globalPicture" alt="背景图片" class="bgImage">
  </div>
  <div ref="box" class="box-grid " @contextmenu.prevent="openMenu($event)">
    <BoxItem v-for="(item, i) in boxItemData" :key="item.id" :w="item.w" :h="item.h" :i="i">
    </BoxItem>
  </div>
  <!-- 右击菜单 -->
  <el-card @contextmenu.native="handlePaste($event)" class="box-card contextmenu" v-show="visible"
    :style="{ left: left + 'px', top: top + 'px' }">
    <ul>
      <li @click="defaultSorting()">默认排序</li>
      <li @click="updateWallpaper()">更新壁纸</li>
      <li @click="drawer = true">设置</li>
    </ul>
  </el-card>
  <!-- 设置 -->
  <el-drawer v-model="drawer" title="I am the title" :with-header="false">
    <el-container>
      <el-aside width="120px">
        <el-row class="tac">
          <el-col :span="12">
            <h5 class="mb-2">Default colors</h5>
            <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
              <el-menu-item index="1">
                <el-icon>
                  <location />
                </el-icon>
                <span>设置</span>
              </el-menu-item>
              <el-menu-item index="2">
                <el-icon>
                  <icon-menu />
                </el-icon>
                <span>Navigator Two</span>
              </el-menu-item>
              <el-menu-item index="3" disabled>
                <el-icon>
                  <document />
                </el-icon>
                <span>Navigator Three</span>
              </el-menu-item>
              <el-menu-item index="4">
                <el-icon>
                  <setting />
                </el-icon>
                <span>Navigator Four</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-drawer>
</template>
<style lang="less">
.box-grid {
  overflow-x: hidden;
  overflow-y: hidden;
  height: 100%;
  position: relative;
  background-repeat: repeat;
  background-attachment: fixed;
  background-position: center;
  transition: .4s ease
}

.bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-repeat: repeat;
  background-attachment: fixed;
  background-position: center;
  // transition: .4s ease;
  opacity: 1;

  .bgImage {
    position: relative;
    transition: .2s;
    opacity: 1;
    height: 100%;
    width: 100%;
    object-fit: cover;
    transition: .3s;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
}

//右击菜单
.contextmenu {
  width: 150px;
  height: 200px;
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

  .el-card__body {
    padding: 0px;
    line-height: 30px;

    ul>li {
      width: 100%;
      height: 30px;
      padding: 0 10px 0 10px;

      &:hover {
        background-color: #ccc;
        color: white;
        cursor: pointer;
      }
    }
  }
}

// 设置
.el-drawer__body {
  padding: 20px 0 10px 0;

  .el-col-12 {
    max-width: 100%;

    .el-menu-vertical-demo {
      width: 100%;

      .el-menu-item {
        padding: 0 !important;
      }
    }




  }
}
</style>