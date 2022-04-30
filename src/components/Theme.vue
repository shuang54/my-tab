<script lang="ts" setup>
import { useBox } from '../store/box';
const boxStore = useBox()

const srcList = [
  [
    'http://niu.foogeoo.ltd/public/A-SOUL%E5%A3%81%E7%BA%B8_%E4%B9%83%E7%90%B3.png',
    'http://niu.foogeoo.ltd/public/A-SOUL%E5%A3%81%E7%BA%B8_%E4%B9%83%E7%90%B3_%E6%89%8B%E6%9C%BA.png',
  ],
  [
    'http://niu.foogeoo.ltd/public/A-SOUL%E5%A3%81%E7%BA%B8_%E5%90%91%E6%99%9A.png',
    'http://niu.foogeoo.ltd/public/A-SOUL%E5%A3%81%E7%BA%B8_%E5%90%91%E6%99%9A_%E6%89%8B%E6%9C%BA.png',
  ],
  [
    'http://niu.foogeoo.ltd/public/A-SOUL%E5%A3%81%E7%BA%B8_%E5%98%89%E7%84%B6.png',
    'http://niu.foogeoo.ltd/public/A-SOUL%E5%A3%81%E7%BA%B8_%E5%98%89%E7%84%B6_%E6%89%8B%E6%9C%BA.png',
  ],
  [
    'http://niu.foogeoo.ltd/public/A-SOUL%E5%A3%81%E7%BA%B8_%E7%8F%88%E4%B9%90.png',
    'http://niu.foogeoo.ltd/public/A-SOUL%E5%A3%81%E7%BA%B8_%E7%8F%88%E4%B9%90_%E6%89%8B%E6%9C%BA.png',
  ],
  [
    'http://niu.foogeoo.ltd/public/A-SOUL%E5%A3%81%E7%BA%B8_%E8%B4%9D%E6%8B%89.png',
    'http://niu.foogeoo.ltd/public/A-SOUL%E5%A3%81%E7%BA%B8_%E8%B4%9D%E6%8B%89_%E6%89%8B%E6%9C%BA.png',
  ]
]
const changeTheme = (item) => {
  boxStore.changeTheme(item)
}
</script>
<template>
  <div class="theme-container infinite-list" style="overflow: auto">
    <div class="theme-item" v-for="(item, i) in srcList" :key="i">
      <el-image style="width: 300px; height: 200px" :src="item[0]" :preview-src-list="item" fit="contain" />
      <div>
        <el-button type="primary" @click="changeTheme(item)">使用主题</el-button>
      </div>
    </div>
  </div>
</template>
<style lang="less">
.theme-container {
  display: flex;
  flex-direction: column;
  width: 78%;
  // height: 100%;
  overflow: scroll;

  .theme-item {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

  }
}

.demo-image__error .image-slot {
  font-size: 30px;
}

.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}

.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}

.infinite-list {
  width: 100%;
  height: 800px;
  padding: 0;
  margin: 0 auto;
  list-style: none;
}

.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}

.infinite-list .infinite-list-item+.list-item {
  margin-top: 10px;
}
</style>