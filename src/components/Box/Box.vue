<script lang="ts" setup>
import { reactive, watch, ref, onMounted } from 'vue'
import BoxItem from '../BoxItem/BoxItem.vue';
import { useBox } from '../../store/box';
import { storeToRefs } from 'pinia';
import SetupVue from '../Setup/Setup.vue';
import ItemForm from '@/components/ItemForm.vue'
import { useUserStore } from '../../store/user';
let userStore = useUserStore()
const boxStore = useBox()
// 从配置中获取背景地址
boxStore.globalPicture = boxStore.GlobalConfiguration.globalPicture
boxStore.cardPicture = boxStore.GlobalConfiguration.cardPicture
let { globalPicture } = storeToRefs(boxStore)
let { cardPicture } = storeToRefs(boxStore)

// let boxItemData = reactive(boxStore.boxItem)
let { boxItem: boxItemData } = storeToRefs(useBox())
let { GlobalConfiguration: config } = storeToRefs(boxStore)
// 监听boxItemData
watch(boxItemData.value, (nVal, oVal) => {
  localStorage.setItem('boxItemData', JSON.stringify(boxItemData.value))
})
// GlobalConfiguration
watch(config.value, (val) => {
  localStorage.setItem('GlobalConfiguration', JSON.stringify(config.value))

})
// 判断token是否存在
const ss = async () => {
  if (window.localStorage.getItem('token')) {
    const result = await userStore.getUserInfo()

    if (result == 'ok') {
      const result = await userStore.getBackup()

      if (boxItemData.value.length <= 0) {
        if (result == 'ok') {
          //如果没有从本地获取数据，那么从发送请求获取数据
          if (userStore.backup['backup1'] !== "") {
            const data = JSON.parse(userStore.backup['backup1'])
            saveData(data)

          } else {

            defaultData()
          }
        } else {

          defaultData()
        }
      }


    } else {
      localStorage.removeItem('token')
      defaultData()
    }
  } else {
    //本地没有数据，使用默认数据
    if (boxItemData.value == '') {
      defaultData()
    }
  }
}
ss()
// 保存数据
function saveData(data) {
  boxStore.GlobalConfiguration = data[0]
  boxStore.boxItem = data[1]
  localStorage.setItem('boxItemData', JSON.stringify(data[1]))
  localStorage.setItem('GlobalConfiguration', JSON.stringify(data[0]))
  globalPicture.value = boxStore.GlobalConfiguration.globalPicture
  cardPicture.value = boxStore.GlobalConfiguration.cardPicture
}
// watch(() => { boxStore.GlobalConfiguration})
//  //本地没有数据，使用默认数据
function defaultData() {
  //本地没有数据，使用默认数据

  const boxItem = [
    {
      "title": "哔哩哔哩",
      "bgType": "image",
      "bgImage": "www.bilibili.com",
      "id": "f031148a-1e4e-4e66-ad9f-58faf4557d28",
      "target": "www.bilibili.com",
      "bgColor": "#409EFF",
      "bgFont": 120,
      "bgText": "",
      "bgColorImage": null,
      "w": 1,
      "h": 1,
      "X": 0,
      "Y": 0
    },

  ]
  const GlobalConfiguration = { "describe": "默认备份", "isShow": true, "sort": "asc", "isGridding": false, "layout": "right", "globalPicture": "http://niu.foogeoo.ltd/public/A-SOUL%E5%A3%81%E7%BA%B8_%E4%B9%83%E7%90%B3.png", "cardPicture": "http://niu.foogeoo.ltd/public/A-SOUL%E5%A3%81%E7%BA%B8_%E4%B9%83%E7%90%B3_%E6%89%8B%E6%9C%BA.png" }
  const data = [GlobalConfiguration, boxItem]
  saveData(data)

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
  boxStore.boxContainer.width = BoxOffsetWidth
  boxStore.boxContainer.height = BoxOffsetHeight

})
// 默认排序
function defaultSorting() {
  const interval = 100
  let page = 0
  let num = 0
  boxItemData.value.forEach(element => {
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
  BoxOffsetHeight = box.value.offsetHeight
  BoxOffsetWidth = box.value.offsetWidth
  boxStore.boxContainer.width = BoxOffsetWidth
  boxStore.boxContainer.height = BoxOffsetHeight
  closeMenu2()
  let x = e.pageX;
  let y = e.pageY;

  if (x + 150 > boxStore.boxContainer.width) {
    x = boxStore.boxContainer.width - 152
  }
  if (y + 240 > boxStore.boxContainer.height) {
    y = boxStore.boxContainer.height - 252
  }
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
}
const handleClose = (key: string, keyPath: string[]) => {
}
// 更新壁纸
// onMounted(() => {
//   })



// 更新背景
const updateWallpaper = () => {
  boxStore.updatedGlobalPicture()
}
// 网格化
let gridding = () => {
  boxStore.isGridding()
}
// item右击事件
let visible2 = ref(false)
// 
let rightClickItemIndex = ref(null)
watch(visible2, (value) => {
  if (value) {
    document.body.addEventListener('click', closeMenu2)
  } else {
    document.body.removeEventListener('click', closeMenu2)
  }
})

// item上的右击事件
const show = ($event, i) => {
  BoxOffsetHeight = box.value.offsetHeight
  BoxOffsetWidth = box.value.offsetWidth
  boxStore.boxContainer.width = BoxOffsetWidth
  boxStore.boxContainer.height = BoxOffsetHeight
  closeMenu()
  let x = $event.pageX;
  let y = $event.pageY;
  if (x + 100 > boxStore.boxContainer.width) {
    x = boxStore.boxContainer.width - 102
  }
  if (y + 80 > boxStore.boxContainer.height) {
    y = boxStore.boxContainer.height - 150
  }
  top.value = y;
  left.value = x;
  visible2.value = true
  rightClickItemIndex.value = i
}
// 是否显示item
const isShow = () => {
  config.value.isShow = !config.value.isShow
}
// 刷新
const refresh = () => {
  // boxStore.setBoxItem(JSON.parse(window.localStorage.getItem('boxItemData') || ''))
}
function closeMenu2() {
  visible2.value = false;
}
function editItem() {
  dialogFormVisible.value = true

}
// 删除Item
function deleteItem() {
  boxStore.deleteBoxItemByIndex(rightClickItemIndex.value)
}
// 编辑Item
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

// 提交编辑 按钮

// const dialog: any = ref(null)
const ruleFormRef: any = ref(null)
let editBut = () => {
  dialogFormVisible.value = false
  ruleFormRef.value.updateBoxItemByIndex()
  // itemForm.value.updateBoxItemByIndex()
}
// 将当前壁纸设为默认壁纸
const setWallpaper = () => {
  boxStore.GlobalConfiguration.globalPicture = boxStore.globalPicture
}
// 备份配置

const backupSetup = () => {
  let data = { "backup1": JSON.stringify([boxStore.GlobalConfiguration, boxStore.boxItem]) }

  userStore.updatedBackup(data, 0)
}
</script>
<template>
  <div class="bg">
    <img :src="globalPicture" alt="背景图片" class="bgImage">
  </div>
  <div ref="box" class="box-grid " @contextmenu.prevent="openMenu($event)">
    <BoxItem @contextmenu.prevent.stop="show($event, i)" v-for="(item, i) in boxItemData" :key="item.id" :w="item.w"
      :h="item.h" :i="i">
    </BoxItem>
  </div>
  <!-- 右击菜单 -->
  <el-card @contextmenu.native="handlePaste($event)" class="box-card contextmenu" v-show="visible"
    :style="{ left: left + 'px', top: top + 'px', 'background-image': `url(${cardPicture})`, }">
    <ul>
      <li @click="updateWallpaper()">更新壁纸</li>
      <li @click="refresh">刷新</li>
      <li @click="defaultSorting()">默认排序</li>
      <li @click="isShow">{{ config.isShow ? '隐藏' : '显示' }}图标</li>
      <li @click="gridding()">网格化对齐</li>
      <li @click="setWallpaper">将当前壁纸设为默认壁纸</li>
      <li @click="backupSetup">备份配置</li>
      <li @click="drawer = true">更多设置</li>
    </ul>
  </el-card>
  <!-- item右击菜单 -->
  <el-card @contextmenu.native="handlePaste($event)" class="box-card contextmenu contextmenu2" v-show="visible2"
    :style="{ left: left + 'px', top: top + 'px', 'background-image': `url(${cardPicture})`, }">
    <ul>
      <li @click="editItem()">编辑 | 添加图标</li>
      <li @click="deleteItem()">删除</li>
    </ul>
  </el-card>
  <!-- 设置 -->
  <el-drawer v-model="drawer" title="I am the title" :with-header="false">
    <SetupVue></SetupVue>
  </el-drawer>
  <!-- 编辑Item -->
  <el-dialog class="Mydialog" ref="dialog" destroy-on-close v-model="dialogFormVisible" title="编辑 | 添加图标">
    <ItemForm ref="ruleFormRef" :index="rightClickItemIndex"></ItemForm>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="large">取消</el-button>
        <el-button type="primary" @click="editBut" size="large">编辑图标</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style lang="less" >
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

.Mydialog {
  width: 40% !important;
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

.el-card {
  transition: none;
}

//右击菜单

.contextmenu {
  width: 150px;
  height: 240px;
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
  object-fit: cover;
  transition: all 0.3s ease 0s;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border: 0px;

  .el-card__body {
    padding: 0px;
    line-height: 30px;

    ul>li {
      width: 100%;
      height: 30px;
      padding: 0 10px 0 10px;

      &:hover {
        // background-color: #ccc;~
        // color: white;
        cursor: pointer;
        backdrop-filter: blur(5px);
        box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.3);
      }
    }
  }
}

.contextmenu2 {
  width: 100px;
  height: 60px;
}

.el-drawer.rtl {
  min-width: 400px;
  width: 30% !important;
}
</style>