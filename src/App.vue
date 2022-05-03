<script setup lang="ts">
import Box from '@/components/Box/Box.vue'

</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-main>
        <el-row justify="center" align="middle">
          <el-col :span="24">
            <Box></Box>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>

</template>

<style lang="less">
#app {
  height: 100%;
}

.common-layout {
  height: 100%;
  // 设置桌面背景图片

  .el-container {
    height: 100%;

    .el-main {
      padding: 0;

      .el-row {
        height: 100%;
        background-color: white;

        .el-col {
          height: 100%;

        }
      }
    }

  }
}
</style>
