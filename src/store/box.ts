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
      GlobalConfiguration: {
        isGridding: true,
      }
      // boxItem: [
      //   {
      //     "title": "npm仓库",
      //     "uuid": "5fcfb221d915e4341c1e069f14a1b945",
      //     "bgType": "image",
      //     "bgImage": "https://static.npmjs.com/b0f1a8318363185cc2ea6a40ac23eeb2.png",
      //     "id": "siteId-1fjg5riks7kwo6q5z2rvwrdblv0",
      //     "target": "https://www.npmjs.com/",
      //     "bgColor": "rgba(255,207,12,1)",
      //     "bgFont": 30,
      //     "bgText": "npm",
      //     "bgColorImage": null,
      //     "w": 1,
      //     "h": 1
      //   },
      //   {
      //     "title": "GitHub",
      //     "uuid": "3290568f329ecd28a1601b98351d2040",
      //     "bgType": "image",
      //     "bgImage": "https://files.codelife.cc/website/codepen.svg",
      //     "updatetime": 1635851916974,
      //     "id": "siteId-1fjg5ullepy4cfzy6za4wf0h1kf",
      //     "target": "https://github.com/",
      //     "type": "web",
      //     "w": 1,
      //     "h": 1
      //   },
      //   {
      //     "title": "Vue.js",
      //     "uuid": "61bee01d513b4e844394b85b38b01a3e",
      //     "bgType": "image",
      //     "bgImage": "https://cn.vuejs.org/images/logo.svg",
      //     "updatetime": 1636034500242,
      //     "id": "siteId-1fjlk2lki7nu2o2x1i5ytii9o6z",
      //     "target": "https://cn.vuejs.org/",
      //     "type": "web"
      //     , "w": 1,
      //     "h": 1
      //   },
      //   {
      //     "title": "Stack Overflow - Where Developers Learn, Share, & Build Careers",
      //     "uuid": "43e54a82b30dbf7d3e2ee8cfe537c849",
      //     "bgType": "image",
      //     "bgImage": "https://infinityicon.infinitynewtab.com/user-share-icon/43e54a82b30dbf7d3e2ee8cfe537c849.png",
      //     "updatetime": 1636183457101,
      //     "id": "siteId-1fjq24faedg649wxgk0qtg1wfvo",
      //     "target": "https://stackoverflow.com/",
      //     "type": "web",
      //     "w": 1,
      //     "h": 1
      //   },
      // ]
    }
  },
  actions: {
    getzIndex() {
      this.zIndex += 1
      return this.zIndex
    },
    setBoxItemXY(i, X, Y) {
      this.boxItem[i].X = X, this.boxItem[i].Y = Y
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
    }
  },


})