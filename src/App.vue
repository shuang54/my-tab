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
      <el-footer>
        <div class="mission-board">aaa</div>
      </el-footer>
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
          background-color: violet;
        }
      }
    }

    .el-footer {
      padding: 0;
      height: 60px;
      background-color: white;
      display: flex;
      justify-content: center;
      perspective: 800px;

      .mission-board {
        width: 50%;
        min-height: 10%;
        max-width: 100%;
        height: 100%;
        background: hsla(0, 0%, 0%, 0.05) border-box;
        border-radius: 5px 5px 0 0;
        box-shadow: 0 0 0 1px hsl(0deg 0% 100% / 30%) inset,
          0 0.5em 1em rgb(0 0 0 / 60%);
        text-shadow: 0 1px 1px hsla(0, 0%, 100%, 0.3);
        transform-origin: bottom;
        transform: rotateX(30deg);
      }
    }
  }
}
</style>
