import { defineStore } from "pinia";
import { get } from "../utils/axios"
import { ElMessage as $message, ElStep } from 'element-plus'

export const useBox = defineStore({
  id: 'box',
  state: () => {
    return {
      zIndex: 1,
      boxItem: JSON.parse(window.localStorage.getItem('boxItemData') || "[]"),
      boxContainer: { width: 0, height: 0 },
      GlobalConfiguration: JSON.parse(window.localStorage.getItem('GlobalConfiguration') || '[]'),
      globalPicture: '',
      cardPicture: '',
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
    async upImg(url) {
      this.globalPicture = url
    },
    // 获取背景图片
    async updatedGlobalPicture() {
      let result: any = await get("http://www.foogeoo.ltd:9990/")
      // { "code": "200", "imgurl": "https:\/\/tva3.sinaimg.cn\/large\/9bd9b167gy1g4lierq2y8j21hc0xce81.jpg", "width": "1920", "height": "1200" }
      // let result: any = await get("https://api.codelife.cc/wallpaper/random")
      // { "code": 200, "data": "https://p15.qhimg.com/bdr/__85/d/_open360/cy0120/1.jpg", "msg": "加载成功" }
      if (result.code == '200') {
        this.globalPicture = result.imgurl
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
    },
    // 更新主题
    changeTheme(item) {
      this.globalPicture = item[0]
      this.cardPicture = item[1]
      this.GlobalConfiguration.globalPicture = item[0]
      this.GlobalConfiguration.cardPicture = item[1]
      const data = JSON.parse(window.localStorage.getItem('GlobalConfiguration') || '')
      data.globalPicture = item[0]
      data.cardPicture = item[1]
      window.localStorage.setItem('GlobalConfiguration', JSON.stringify(data))
    }
  },


})