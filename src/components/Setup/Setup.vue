<script lang="ts" setup>
import ItemForm from '@/components/ItemForm.vue'
</script>
<template>
  <el-container>
    <el-header>设置</el-header>
    <el-main>
      <el-tabs tab-position="left" style="height: 100%">
        <el-tab-pane label="用户">用户</el-tab-pane>
        <el-tab-pane label="添加图标">
          <ItemForm></ItemForm>
        </el-tab-pane>
        <el-tab-pane label="排序">排序</el-tab-pane>
        <el-tab-pane label="壁纸">壁纸</el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>
<style lang="less">
// 设置
.el-drawer__body {
  padding: 20px 0 10px 0;
  min-width: 400px;

  .el-tabs__nav-scroll {
    width: 100px;
    padding: 0 5px;

    .el-tabs__active-bar {
      background-color: #f5f7fa;
    }

    .el-tabs__item {
      text-align: left !important;
      padding-left: 5px;

      &:hover {
        color: none;
      }
    }

    .is-active {
      background-color: #f5f7fa;
      color: #409eff;
      border-right: 0;
    }

  }

  .el-tabs__content {
    position: absolute;
    background-color: #f5f7fa;
    width: 100%;
    z-index: 99;
    height: 100%;
    left: 104px;
  }
}
</style>