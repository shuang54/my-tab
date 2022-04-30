<script lang="ts" setup>

import { reactive, ref, } from 'vue'
import { FormInstance } from 'element-plus'
const ruleFormRef = ref<FormInstance>()

// 登录表单
// 验证表单规则
const userNameRule = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输⼊⽤户名"));
  } else if (!isvalidUsername(value)) {
    callback(
      new Error(
        "⽤户名要求数字、字母、下划线、减号的组合字母必须存在长度为4-16个字符"
      )
    );
  } else {
    callback();
  }
};

const passwordRule = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输⼊密码"));
  } else if (!isvalidPass(value)) {
    callback(
      new Error("密码以字母开头长度在8~18之间只能包含字母、数字和下划线")
    );
  } else {
    callback();
  }
}
// 将规则与数据进行邦定
const rules = reactive({
  userName: [{ validator: userNameRule, trigger: 'blur' }],
  password: [{ validator: passwordRule, trigger: 'blur' }],
})
// 定义表单数据
const ruleForm = reactive({
  userName: '',
  password: '',
})
// 重置按钮
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
// 验证密码密码，以字母开头，长度在8~18之间，只能包含字母、数字和下划线
function isvalidPass(str) {
  const reg = /^[a-zA-Z]\w{8,18}$/;
  return reg.test(str);
}
//   验证⽤户名⽤户名要求数字、字母、下划线的组合，其中数字和字母必须同时存在*
function isvalidUsername(str) {
  const reg = /^[a-zA-Z0-9_-]{4,16}$/;
  return reg.test(str);
}
const showLogin = ref(true);

const registerClick = () => {
  showLogin.value = false
  showRegister.value = true
}


// 注册表单
const RegisterRuleFormRef = ref<FormInstance>()
const showRegister = ref(false)
// 验证表单规则

const mailRule = (rule: any, value: any, callback: any) => {
  console.log('a');

  const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (value === "") {
    callback(new Error("请输入邮箱"));
  }
  if (regEmail.test(value)) {
    return callback();
  }
  callback(new Error("请输入合法的邮箱"));
}
const codeRule = (rule: any, value: any, callback: any) => {
}
// 将规则与数据进行邦定
const RegisterRules = reactive({
  userName: [{ validator: userNameRule, trigger: 'blur' }],
  password: [{ validator: passwordRule, trigger: 'blur' }],
  mail: [{ validator: mailRule, trigger: 'blur' }],
  code: [{ validator: codeRule, trigger: 'blur' }],
})
// 定义表单数据
const RegisterRuleForm = reactive({
  userName: '',
  password: '',
  mail: '',
  code: '',
})
// 重置按钮
const resetForm2 = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
const loginClick = () => {
  showLogin.value = true
  showRegister.value = false
}
</script>
<template>
  <el-form v-if="showLogin" ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px"
    class="demo-ruleForm">
    <el-form-item label="用户名:" prop="userName">
      <el-input clearable v-model="ruleForm.userName" type="text" placeholder="请输入用户名" />
    </el-form-item>
    <el-form-item label="密码:" prop="password">
      <el-input placeholder="请输入密码" show-password v-model="ruleForm.password" type="password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="btn">登录</el-button>
    </el-form-item>
    <el-form-item class="sub">
      <el-button @click="resetForm(ruleFormRef)">重置信息</el-button>
      <el-button @click="registerClick">注册</el-button>
    </el-form-item>
  </el-form>
  <el-form v-if="showRegister" ref="RegisterRuleFormRef" :model="RegisterRuleForm" status-icon :rules="RegisterRules"
    label-width="120px" class="demo-ruleForm">
    <el-form-item prop="userName">
      <el-input clearable v-model="RegisterRuleForm.userName" type="text" placeholder="请输入用户名" />
    </el-form-item>
    <el-form-item prop="password">
      <el-input placeholder="请输入密码" show-password v-model="RegisterRuleForm.password" type="password" />
    </el-form-item>
    <el-form-item prop="mail">
      <el-input placeholder="请输入邮箱" v-model="RegisterRuleForm.mail" type="text" />
      <el-button type="primary">获取验证码</el-button>
    </el-form-item>
    <el-form-item prop="code">
      <el-input placeholder="请输入验证码" v-model="RegisterRuleForm.code" type="text" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary">注册用户</el-button>
    </el-form-item>
    <el-form-item class="sub">
      <el-button @click="resetForm(RegisterRuleFormRef)">重置信息</el-button>
      <el-button @click="loginClick">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<style lang="less" scoped>
.el-form {
  padding-top: 20px;
  align-items: center;
  display: flex;
  flex-direction: column;
}


.mail {
  .el-button {
    flex: none;
  }
}


.el-button {
  flex: 1;
}

.el-form-item {
  width: 68%;
  margin-bottom: 30px;
}

.el-form-item__label {
  width: 80px !important;
}
</style>