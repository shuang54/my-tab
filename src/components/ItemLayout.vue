<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { reactive, ref, watch, watchEffect } from 'vue';
import { useBox } from '../store/box'

let { boxItem: boxItemData, GlobalConfiguration: config, boxContainer: boxContainer } = storeToRefs(useBox())

let layout = ref('')
let sort = ref('')
layout.value = config.value.layout
sort.value = config.value.sort
watch(() => layout.value, (val) => {
  config.value.layout = val
  if (val == "top") {
    topSorting()
  } else if (val == "right") {
    rightSorting()
  } else if (val == "bottom") {
    bottomSorting()
  } else {
    defaultSorting()
  }
})
watch(() => sort.value, (val) => {
  config.value.sort = val
  SortingByName(val)
})

function defaultSorting() {
  const interval = 100
  let page = 0
  let num = 0
  boxItemData.value.forEach(element => {
    let Y = num * 100
    if (Y > boxContainer.value.height - 100) {
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
function topSorting() {
  const interval = 100
  let page = 0
  let num = 0
  boxItemData.value.forEach(element => {
    let X = num * 100
    if (X > boxContainer.value.width - 100) {
      page++
      num = 0
      X = num * 100
    }
    let Y = 100 * page
    element.X = X
    element.Y = Y
    num++
  });

}
function rightSorting() {
  const interval = 100
  let page = Math.floor(boxContainer.value.width * 0.01) - 1
  let num = 0
  boxItemData.value.forEach(element => {
    let Y = num * 100
    if (Y > boxContainer.value.height - 100) {
      page--
      num = 0
      Y = num * 100
    }
    let X = 100 * page
    element.X = X
    element.Y = Y
    num++
  });
}
function bottomSorting() {
  const interval = 100
  let page = Math.floor(boxContainer.value.height * 0.01) - 1
  let num = 0
  boxItemData.value.forEach(element => {
    let X = num * 100
    if (X > boxContainer.value.width - 100) {
      page--
      num = 0
      X = num * 100
    }
    let Y = 100 * page
    element.X = X
    element.Y = Y
    num++
  });
}
function SortingByName(val) {
  if (val == "desc") {
    boxItemData.value = boxItemData.value.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return 1
      }
      return -1
    })
  } else {
    boxItemData.value = boxItemData.value.sort((a, b) => {
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1
      }
      return -1
    })
  }

  if (config.value.layout == "top") {
    topSorting()
  } else if (config.value.layout == "right") {
    rightSorting()
  } else if (config.value.layout == "bottom") {
    bottomSorting()
  } else {
    defaultSorting()
  }
}
</script>
<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>图标布局</span>
      </div>
    </template>
    <el-radio-group border v-model="layout" size="large">
      <el-tooltip class="box-item" effect="dark" content="图标上对齐" placement="top-start">
        <el-radio-button label="top" />
      </el-tooltip>
      <el-tooltip class="box-item" effect="dark" content="图标右对齐" placement="top-start">
        <el-radio-button label="right" />
      </el-tooltip>
      <el-tooltip class="box-item" effect="dark" content="图标下对齐" placement="top-start">
        <el-radio-button label="bottom" />
      </el-tooltip>
      <el-tooltip class="box-item" effect="dark" content="图标左对齐" placement="top-start">
        <el-radio-button label="left" />
      </el-tooltip>
    </el-radio-group>
  </el-card>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>图标排序</span>
      </div>
    </template>
    <el-radio-group border v-model="sort" size="large">
      <el-tooltip class="box-item" effect="dark" content="按名称升序" placement="top-start">
        <el-radio-button label="asc" />
      </el-tooltip>
      <el-tooltip class="box-item" effect="dark" content="按名称降序" placement="top-start">
        <el-radio-button label="desc" />
      </el-tooltip>
    </el-radio-group>
  </el-card>
</template>
<style lang="less" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
}

.box-card {
  width: 100%;
  margin-bottom: 20px
}
</style>