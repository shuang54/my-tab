<script lang="ts" setup>
import { reactive, ref, watch, } from 'vue'
import { ElStep, FormInstance } from 'element-plus'
import { v4 as uuidv4 } from 'uuid';
import { useBox } from '../store/box';
import { storeToRefs } from 'pinia';
const boxStore = useBox()
const ruleFormRef = ref<FormInstance>()
const props = defineProps(['index'])


// 验证表单规则
const addressRule = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入网站地址'))
  } else {
    callback()
  }
}
const titleRule = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入网址名称'))
  } else {
    callback()
  }
}

// 定义表单数据
const ruleForm = reactive({
  address: '',
  title: '',
  iconName: ''
})

// 将规则与数据进行邦定
const rules = reactive({
  address: [{ validator: addressRule, trigger: 'blur' }],
  title: [{ validator: titleRule, trigger: 'blur' }],
})
// 添加时的X，Y坐标
function addTraversal(boxItemData) {

  const interval = 100
  // 第几列
  let page = 0
  // 第几个元素
  let num = 0
  let X, Y
  for (let i = 0; i < boxItemData.length + 1; i++) {
    let Y = num * 100
    if (Y > boxStore.boxContainer.height - 100) {
      page++
      num = 0
      Y = num * 100
    }
    let X = 100 * page
    // 只要有一项重复则重新循环
    let result = boxItemData.some((v, i) => {
      if ((X == v.X) && (Y == v.Y)) {
        return (X == v.X) && (Y == v.Y)
      }
    })
    if (!result) {
      return { X, Y }
    }
    num++
  }
  // if (X == undefined || Y == undefined || (X == 0 && Y == 0)) {
  //   let maxX = boxItemData[0].X;
  //   let maxY = boxItemData[0].Y;
  //   for (let i = 1, ilen = boxItemData.length; i < ilen; i++) {
  //     if (boxItemData[i].X > maxX) {
  //       maxX = boxItemData[i].X;
  //       if (boxItemData[i].Y > maxY) {
  //         maxY = boxItemData[i].Y;
  //       }
  //     }

  //   }
  //   console.log({ X: maxX, Y: maxY });

  //   return { X: maxX, Y: maxY }
  // }
  return { X, Y }
}
// 提交按钮
const submitForm = (formEl: FormInstance | undefined) => {

  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      let { boxItem: boxItemData } = storeToRefs(boxStore)
      if (ruleForm.address.slice(0, 3) == 'www') {
        ruleForm.address = 'https://' + ruleForm.address
      }
      // 通过计算获取 X Ｙ　坐标
      let { X, Y } = addTraversal(boxItemData.value)

      const data = {
        title: ruleForm.title,
        bgType: "image",
        bgImage: ruleForm.address + '/favicon.ico',
        id: uuidv4(),
        target: ruleForm.address,
        bgColor: color1.value,
        bgFont: iconFontSize.value,
        bgText: ruleForm.iconName,
        bgColorImage: null,
        w: 1,
        h: 1,
        X: X,
        Y: Y
      }

      boxItemData.value.push(data)
      // 重置表单
      formEl.resetFields()
    } else {
      console.log('error submit!')
      return false
    }
  })
}
// 重置按钮
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
// icon字体大小
let iconFontSize = ref(120)
watch(() => ruleForm.iconName, (nVal, oVal) => {
  if (ruleForm.iconName.length > 5) {
    ruleForm.iconName = oVal
    return;
  }
  ruleForm.iconName.length == 1 && (iconFontSize.value = 95);
  ruleForm.iconName.length == 2 && (iconFontSize.value = 40);
  ruleForm.iconName.length == 3 && (iconFontSize.value = 20);
  ruleForm.iconName.length == 4 && (iconFontSize.value = 15)
})
// 根据index 添加默认数据

if (props.index != undefined) {
  let boxItemDataByIndex = boxStore.boxItem[props.index]
  ruleForm.address = boxItemDataByIndex.target
  ruleForm.title = boxItemDataByIndex.title
  ruleForm.iconName = boxItemDataByIndex.bgText
  color1.value = boxItemDataByIndex.bgColor
  iconFontSize.value = boxItemDataByIndex.bgFont
}

// 修改事件
const updateBoxItemByIndex = () => {
  const data = {
    title: ruleForm.title,
    bgType: "image",
    bgImage: ruleForm.address + '/favicon.ico',
    target: ruleForm.address,
    bgColor: color1.value,
    bgFont: iconFontSize.value,
    bgText: ruleForm.iconName,
    bgColorImage: null,
  }
  boxStore.updateBoxItemIndex(props.index, data)
}
defineExpose({ updateBoxItemByIndex })
</script>
<template>
  <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
    <el-form-item label="网站地址:" prop="address">
      <el-input v-model="ruleForm.address" type="text" placeholder="例如:www.baidu.com" />
    </el-form-item>
    <el-form-item label="网站名称:" prop="title">
      <el-input v-model="ruleForm.title" type="text" autocomplete="off" />
    </el-form-item>
    <el-form-item class="imageIcon" label="图片加载失败时显示:">
      <!-- 图片-->
      <div class="icon" :style="{ 'background-color': color1 }">
        <span :style="{ 'font-size': iconFontSize + 'px' }" class="icon-name">{{ ruleForm.iconName }}</span>
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
      <el-button type="primary" @click="submitForm(ruleFormRef)">添加图标</el-button>
      <el-button @click="resetForm(ruleFormRef)">重置信息</el-button>
    </el-form-item>
  </el-form>

</template>
<style lang="less">
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