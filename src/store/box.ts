import { defineStore } from "pinia";
import { get } from "../utils/axios"
import { ElMessage as $message, ElStep } from 'element-plus'

export const useBox = defineStore({
  id: 'box',
  state: () => {
    return {
      zIndex: 1,
      boxItem: JSON.parse(window.localStorage.getItem('boxItemData') || ''),
      globalPicture: '',
      boxContainer: { width: 0, height: 0 },
      GlobalConfiguration: JSON.parse(window.localStorage.getItem('GlobalConfiguration') || ''),

    }
  },
  actions: {
    getzIndex() {
      this.zIndex += 1
      return this.zIndex
    },
    setBoxItemXY(i, X, Y) {

      this.boxItem[i].X = X
      this.boxItem[i].Y = Y

    },
    // async updatedGlobalPicture() {
    //   let result: any = await get("/api.php?category={dongman,fengjing,biying,meinv}&type=json")
    //   if (result.result == 200) {
    //     this.globalPicture = result.img
    //   } else {
    //     $message.error('更新背景失败！')
    //   }
    // },
    // 获取背景图片
    async updatedGlobalPicture() {
      let result: any = await get("https://api.codelife.cc/wallpaper/random")
      if (result.code == 200) {
        this.globalPicture = result.data
      } else {
        $message.error('更新背景失败！')
      }
    },
    // 根据index删除item
    deleteBoxItemByIndex(i) {
      this.boxItem.splice(i, 1)
    },
    // 根据index更新item
    updateBoxItemIndex(i, data) {
      for (const key in data) {
        this.boxItem[i][key] = data[key]
      }
    },
    isGridding() {
      this.GlobalConfiguration.isGridding = !this.GlobalConfiguration.isGridding
    },
    // 修改itemData
    setBoxItem(data) {
      this.boxItem = data
    }
  },


})