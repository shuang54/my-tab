<script lang="ts" setup>

const url =
  'http://niu.foogeoo.ltd/public/A-SOUL%E5%A3%81%E7%BA%B8_%E4%B9%83%E7%90%B3.png'
const srcList = [
  'http://niu.foogeoo.ltd/public/A-SOUL%E5%A3%81%E7%BA%B8_%E4%B9%83%E7%90%B3.png',
  'http://niu.foogeoo.ltd/public/A-SOUL%E5%A3%81%E7%BA%B8_%E4%B9%83%E7%90%B3_%E6%89%8B%E6%9C%BA.png',
]
const url2 =
  'http://niu.foogeoo.ltd/public/A-SOUL%E5%A3%81%E7%BA%B8_%E5%90%91%E6%99%9A.png'
const srcList2 = [
  'http://niu.foogeoo.ltd/public/A-SOUL%E5%A3%81%E7%BA%B8_%E5%90%91%E6%99%9A.png',
  'http://niu.foogeoo.ltd/public/A-SOUL%E5%A3%81%E7%BA%B8_%E5%90%91%E6%99%9A_%E6%89%8B%E6%9C%BA.png',
]
const url3 =
  'http://niu.foogeoo.ltd/public/A-SOUL%E5%A3%81%E7%BA%B8_%E5%98%89%E7%84%B6.png'
const srcList3 = [
  'http://niu.foogeoo.ltd/public/A-SOUL%E5%A3%81%E7%BA%B8_%E5%98%89%E7%84%B6.png',
  'http://niu.foogeoo.ltd/public/A-SOUL%E5%A3%81%E7%BA%B8_%E5%98%89%E7%84%B6_%E6%89%8B%E6%9C%BA.png',
]
const url4 =
  'http://niu.foogeoo.ltd/public/A-SOUL%E5%A3%81%E7%BA%B8_%E7%8F%88%E4%B9%90.png'
const srcList4 = [
  'http://niu.foogeoo.ltd/public/A-SOUL%E5%A3%81%E7%BA%B8_%E7%8F%88%E4%B9%90.png',
  'http://niu.foogeoo.ltd/public/A-SOUL%E5%A3%81%E7%BA%B8_%E7%8F%88%E4%B9%90_%E6%89%8B%E6%9C%BA.png',
]
const url5 =
  'http://niu.foogeoo.ltd/public/A-SOUL%E5%A3%81%E7%BA%B8_%E8%B4%9D%E6%8B%89.png'
const srcList5 = [
  'http://niu.foogeoo.ltd/public/A-SOUL%E5%A3%81%E7%BA%B8_%E8%B4%9D%E6%8B%89.png',
  'http://niu.foogeoo.ltd/public/A-SOUL%E5%A3%81%E7%BA%B8_%E8%B4%9D%E6%8B%89_%E6%89%8B%E6%9C%BA.png',
]
</script>
<template>
  <div class="theme-container infinite-list" style="overflow: auto">
    <div class="theme-item">
      <el-image style="width: 300px; height: 200px" :src="url" :preview-src-list="srcList" fit="contain" />
      <div>
        <el-button type="primary">使用主题</el-button>
      </div>
    </div>
    <div class="theme-item">
      <el-image style="width: 300px; height: 200px" :src="url2" :preview-src-list="srcList2" fit="contain" />
      <div>
        <el-button type="primary">使用主题</el-button>
      </div>
    </div>
    <div class="theme-item">
      <el-image style="width: 300px; height: 200px" :src="url3" :preview-src-list="srcList3" fit="contain" />
      <div>
        <el-button type="primary">使用主题</el-button>
      </div>
    </div>
    <div class="theme-item">
      <el-image style="width: 300px; height: 200px" :src="url4" :preview-src-list="srcList4" fit="contain" />
      <div>
        <el-button type="primary">使用主题</el-button>
      </div>
    </div>
    <div class="theme-item">
      <el-image style="width: 300px; height: 200px" :src="url5" :preview-src-list="srcList5" fit="contain" />
      <div>
        <el-button type="primary">使用主题</el-button>
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
  height: 800px;
  padding: 0;
  margin: 0;
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