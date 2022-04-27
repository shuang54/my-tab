<script lang="ts" setup>
import ItemForm from '@/components/ItemForm.vue'
import ItemLayout from '@/components/ItemLayout.vue'
import ConfigFile from '@/components/ConfigFile.vue'
import Theme from '../Theme.vue';
</script>
<template>
  <el-container>
    <el-header></el-header>
    <el-main>
      <el-tabs tab-position="left" style="height: 100%">
        <el-tab-pane label="用户">用户</el-tab-pane>
        <el-tab-pane label="布局">
          <ItemLayout></ItemLayout>
        </el-tab-pane>
        <el-tab-pane label="主题">
          <Theme></Theme>
        </el-tab-pane>
        <el-tab-pane label="添加图标">
          <ItemForm></ItemForm>
        </el-tab-pane>
        <el-tab-pane label="配置文件">
          <ConfigFile></ConfigFile>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>
<style lang="less">
.el-header {
  background: url(http://niu.foogeoo.ltd/public/735b1fc26de010c376738dbddfbcb841.jpg);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
}

.el-drawer__body {
  padding: 0 0 10px 0 !important;
}

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