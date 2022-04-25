<script lang="ts" setup>
import { ref } from 'vue';

let layout = ref('')
let sort = ref('')
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