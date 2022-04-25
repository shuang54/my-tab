<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { DocumentCopy, BottomRight } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useBox } from '../store/box';
const boxStore = useBox()
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  desc: '',
})
const rules = reactive<FormRules>({
  desc: [
    { required: true, message: '请输入配置', trigger: 'blur' },
  ],
})
// 导入配置
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      const data = JSON.parse(ruleForm.desc)
      boxStore.GlobalConfiguration = data[0]
      boxStore.boxItem = data[1]
    } else {
      ElMessage.warning('导入失败')
    }
  })
}
// 导出配置
const copyConfig = () => {
  const data = [
    boxStore.GlobalConfiguration,
    boxStore.boxItem
  ]
  const dataStr = JSON.stringify(data)
  // 模拟 输入框
  var cInput = document.createElement("input");
  cInput.value = dataStr;
  document.body.appendChild(cInput);
  cInput.select(); // 选取文本框内容

  // 执行浏览器复制命令
  // 复制命令会将当前选中的内容复制到剪切板中（这里就是创建的input标签）
  // Input要在正常的编辑状态下原生复制方法才会生效

  document.execCommand("copy");

  ElMessage({
    type: "success",
    message: "复制成功"
  });
  // 复制成功后再将构造的标签 移除
  document.body.removeChild(cInput);

}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
<template>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
    :size="formSize">
    <el-form-item prop="desc" style="margin-left:0px;">
      <el-input v-model="ruleForm.desc" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button :icon="BottomRight" type="primary" @click="submitForm(ruleFormRef)">导入配置</el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
  <el-button :icon="DocumentCopy" type="primary" @click="copyConfig">复制本地配置</el-button>
</template>
<style lang="less" >
.el-form-item__content {
  margin-left: 0px !important;
}

.el-textarea__inner {
  width: 76%;
  height: 300px;
}
</style>