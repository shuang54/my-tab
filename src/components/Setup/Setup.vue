<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'

const ruleFormRef = ref<FormInstance>()


const addressRule = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入网站地址'))
  } else {
    callback()
  }
}
const siteNameRule = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入网址名称'))
  } else {
    callback()
  }
}
const iconNameRule = (rule: any, value: any, callback: any) => {
  console.log(value);

  if (value.length > 5) {
    callback(new Error('图标文字不能超过5位'))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  address: '',
  siteName: '',
  iconName: ''
})

const rules = reactive({
  address: [{ validator: addressRule, trigger: 'blur' }],
  siteName: [{ validator: siteNameRule, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log(ruleForm.address, ruleForm.siteName, ruleForm.iconName, color1.value);
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
// 颜色选择器
const color1 = ref('#409EFF')
// 点击颜色
const changeColor = (color) => {
  color1.value = color

}
</script>
<template>
  <el-container>
    <el-header>设置</el-header>
    <el-main>
      <el-tabs tab-position="left" style="height: 100%">
        <el-tab-pane label="用户">用户</el-tab-pane>
        <el-tab-pane label="添加图标">
          <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px"
            class="demo-ruleForm">
            <el-form-item label="网站地址:" prop="address">
              <el-input v-model="ruleForm.address" type="text" />
            </el-form-item>
            <el-form-item label="网站名称:" prop="siteName">
              <el-input v-model="ruleForm.siteName" type="text" autocomplete="off" />
            </el-form-item>
            <el-form-item class="imageIcon" label="图    片:" prop="age">
              <!-- 图片-->
              <div class="icon" :style="{ 'background-color': color1 }">
                <span :style="{ 'font-size': '20px' }" class="icon-name">{{ ruleForm.iconName }}</span>
              </div>
              <!-- 设置图片背景颜色 -->
              <div class="colorSelectGroup">
                <div class="colorDemo">
                  <span @click="changeColor('#bc8f8f')" style="background-color: rosybrown ;" class=""></span>
                </div>
                <div class="colorDemo">
                  <span @click="changeColor('#eee8aa')" style="background-color: palegoldenrod ;" class=""></span>
                </div>
                <div class="colorDemo">
                  <span @click="changeColor('#98fb98')" style="background-color: palegreen ;" class=""></span>
                </div>
                <div class="colorDemo">
                  <span @click="changeColor('#ffdab9')" style="background-color: peachpuff  ;" class=""></span>
                </div>
                <div class="demo-color-block">
                  <el-color-picker v-model="color1" />
                </div>
              </div>
            </el-form-item>
            <el-form-item label="图标文字:">
              <el-input v-model="ruleForm.iconName" type="text" autocomplete="off" />
            </el-form-item>
            <el-form-item class="sub">
              <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
              <el-button @click="resetForm(ruleFormRef)">重置</el-button>
            </el-form-item>
          </el-form>

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

// 添加图标
.el-form-item__label {
  width: 80px !important;
  text-align: left;
  padding: 10px;
}

.el-input__inner {
  width: 60%;

}

.icon {
  width: 100px;
  height: 100px;

  .icon-name {
    display: block;
    text-align: center;
    line-height: 100px;
  }
}

// 颜色选择器
.imageIcon {
  .el-form-item__content {
    flex-direction: column;
    align-items: start;
  }

  .colorSelectGroup {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 10px;

    .demo-color-block {
      display: flex;
      align-items: center;
    }

    .colorDemo {
      border-radius: 6px;
      box-sizing: border-box;
      width: 32px;
      height: 32px;
      margin-right: 10px;
      padding: 5px;
      border: 1px solid #ccc;
      background-color: white;

      span {
        cursor: pointer;

        width: 20px;
        height: 20px;
        display: block;
      }
    }

  }
}

// 提交
.sub {
  justify-content: start;
}
</style>