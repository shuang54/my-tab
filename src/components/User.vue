<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useUserStore } from '../store/user'
import { useBox } from '../store/box'
import { storeToRefs } from 'pinia';
import { log } from 'console'
let userStore = useUserStore()
let boxStore = useBox()
const ruleFormRef = ref<FormInstance>()
const isShow = ref('login')
// 用户信息
const { userInfo } = storeToRefs(userStore)
if (userInfo.value.email !== "") {
  isShow.value = 'user'
} else {
  isShow.value = 'login'
}
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
      new Error("密码以字母开头长度在6~12之间只能包含字母、数字、下划线")
    );
  } else {
    callback();
  }
}
const newPasswordRule = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输⼊密码"));
  } else if (!isvalidPass(value)) {
    callback(
      new Error("密码以字母开头长度在6~12之间只能包含字母、数字、下划线")
    );
  } else if (value == pwdRuleForm.oldPwd) {
    callback(
      new Error("新密码与旧密码相同")
    );
  } else {
    callback();
  }
}
// 验证表单规则
const mailRule = (rule: any, value: any, callback: any) => {

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
  const regCode = /^[0-9]*$/;
  if (value === "") {
    callback(new Error("请输入验证码"));
  }
  if (regCode.test(value)) {
    return callback();
  }
  callback(new Error("验证码必须是数字"));
}
// 将规则与数据进行邦定
const rules = reactive({
  email: [{ validator: mailRule, trigger: 'blur' }],
  password: [{ validator: passwordRule, trigger: 'blur' }],
})
// 定义表单数据
const ruleForm = reactive({
  email: '',
  password: '',
})
// 重置按钮
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
// 验证密码密码，以字母开头，长度在6~12之间，只能包含字母、数字和下划线
function isvalidPass(str) {
  const reg = /^[a-zA-Z]\w{6,12}$/;
  return reg.test(str);
}
//   验证⽤户名⽤户名要求数字、字母、下划线的组合，其中数字和字母必须同时存在*
function isvalidUsername(str) {
  const reg = /^[a-zA-Z0-9_-]{4,16}$/;
  return reg.test(str);
}

const registerClick = () => {
  isShow.value = 'register'
}
// 注册表单
const RegisterRuleFormRef = ref<FormInstance>()
// 将规则与数据进行邦定
const RegisterRules = reactive({
  username: [{ validator: userNameRule, trigger: 'blur' }],
  password: [{ validator: passwordRule, trigger: 'blur' }],
  email: [{ validator: mailRule, trigger: 'blur' }],
  code: [{ validator: codeRule, trigger: 'blur' }],
})
// 定义表单数据
const RegisterRuleForm = reactive({
  username: '',
  password: '',
  email: '',
  code: '',
})
// 重置按钮
const resetForm2 = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
const loginClick = () => {
  isShow.value = 'login'
}


// 登录
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      let result = await userStore.login({ ...ruleForm })
      if (result == 'ok') {
        isShow.value = 'user'
      }
    }
  })
}
// 修改信息
const nameRuleForm = reactive({
  username: '',
})
const nameRules = reactive({
  username: [{ validator: userNameRule, trigger: 'blur' }],
})
const nameRuleFormRef = ref<FormInstance>()
const pwdRuleFormRef = ref<FormInstance>()
// 将规则与数据进行邦定
const pwdRules = reactive({
  oldPwd: [{ validator: passwordRule, trigger: 'blur' }],
  newPwd: [{ validator: newPasswordRule, trigger: 'blur' }],
})
const pwdRuleForm = reactive({
  oldPwd: '',
  newPwd: ''
})
// 点击修改用户名按钮
const changeName = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      userStore.changeName({ ...nameRuleForm }).then(() => {
        nameRuleForm.username = ''
      })
    }
  })
}
// 修改密码
const changePwd = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      userStore.changePwd({ ...pwdRuleForm }).then(() => {
        pwdRuleForm.newPwd = ""
        pwdRuleForm.oldPwd = ""
      })
    }
  })
}
// 备份
const { backup } = storeToRefs(userStore)
// 备份描述信息
let describes = reactive<any[]>([])
// 通过循环获取描述信息
for (const key in backup.value) {
  if (backup.value[key] == "" || backup.value[key] == null) {
    describes.push("")
    continue;
  }
  let a: any = JSON.parse(backup.value[key])[0].describe
  describes.push(a)
}

// 删除按钮
const delBackup = async (i) => {
  const result = await userStore.delBackup(i + 1)
  if (result == 'ok') {
    describes[i] = ""
    // console.log(describes[i], i);
  }
}
// 修改按钮
const nDescribe = ref('')
const changeDescribe = (index) => {
  let data: any = JSON.parse(backup.value['backup' + (index + 1)])
  if (nDescribe.value == "") {
    nDescribe.value = "备份" + (index + 1)
  }
  data[0].describe = nDescribe.value
  let backupStr = "backup" + (index + 1)
  let data2 = {
    [backupStr]: JSON.stringify(data)
  }
  userStore.updatedBackup(data2, index).then(() => {
    describes[index] = nDescribe.value
    nDescribe.value = ""
  })
}
// 导入按钮
const backupData = ref('')
const inportBackup = (index) => {
  if (backupData.value == "") return
  let backupStr = "backup" + (index + 1)
  let data2 = {
    [backupStr]: backupData.value
  }
  userStore.updatedBackup(data2, index).then(() => {
    // backup['backup' + index] = backupData.value
    describes[index] = JSON.parse(backupData.value)[0].describe
    backupData.value = ""

  })
}
// 使用按钮
const useBackup = (index) => {
  const data = JSON.parse(backup.value['backup' + (index + 1)])
  boxStore.globalPicture = data[0].globalPicture
  boxStore.cardPicture = data[0].cardPicture

  boxStore.GlobalConfiguration = data[0]
  boxStore.boxItem = data[1]
  localStorage.setItem('boxItemData', JSON.stringify(data[1]))
  localStorage.setItem('GlobalConfiguration', JSON.stringify(data[0]))
}
// 退出登录
const loginOut = () => {
  localStorage.removeItem("token");
  isShow.value = 'login'
  userStore.token = ''
}
// 获取验证码
const getCode = () => {
  const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (RegisterRuleForm.email !== ""
    && regEmail.test(RegisterRuleForm.email)) {
    const data = {
      "email": RegisterRuleForm.email
    }

    userStore.sendCode(data)
  }
}
// 注册用户
const registerForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const result = await userStore.register({ ...RegisterRuleForm })
      if (result == 'ok') {
        isShow.value = 'login'
      }
    }
  })
}
</script>
<template>
  <el-form v-if="isShow == 'login'" ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px"
    class="demo-ruleForm">
    <el-form-item label="邮箱:" prop="email">
      <el-input clearable v-model="ruleForm.email" type="text" placeholder="请输入邮箱" />
    </el-form-item>
    <el-form-item label="密码:" prop="password">
      <el-input placeholder="请输入密码" show-password v-model="ruleForm.password" type="password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)" class="btn">登录</el-button>
    </el-form-item>
    <el-form-item class="sub">
      <el-button @click="resetForm(ruleFormRef)">重置信息</el-button>
      <el-button @click="registerClick">注册</el-button>
    </el-form-item>
  </el-form>
  <el-form v-if="isShow == 'register'" ref="RegisterRuleFormRef" :model="RegisterRuleForm" status-icon
    :rules="RegisterRules" label-width="120px" class="demo-ruleForm">
    <el-form-item prop="username">
      <el-input clearable v-model="RegisterRuleForm.username" type="text" placeholder="请输入用户名" />
    </el-form-item>
    <el-form-item prop="password">
      <el-input placeholder="请输入密码" show-password v-model="RegisterRuleForm.password" type="password" />
    </el-form-item>
    <el-form-item prop="email">
      <el-input placeholder="请输入邮箱" v-model="RegisterRuleForm.email" type="text" />
      <el-button type="primary" @click="getCode">获取验证码</el-button>
    </el-form-item>
    <el-form-item prop="code">
      <el-input placeholder="请输入验证码" maxlength="6" v-model="RegisterRuleForm.code" type="text" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="registerForm(RegisterRuleFormRef)">注册用户</el-button>
    </el-form-item>
    <el-form-item class="sub">
      <el-button @click="resetForm(RegisterRuleFormRef)">重置信息</el-button>
      <el-button @click="loginClick">登录</el-button>
    </el-form-item>
  </el-form>
  <div v-if="isShow == 'user'">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>用户信息</span>
          <el-button @click="loginOut" class="button" type="text" :style="{ 'flex': 0 }">退出登录</el-button>
        </div>
      </template>
      <span class="username">{{ userInfo.username }}</span>
      <p>{{ userInfo.email }}</p>
    </el-card>
    <el-card class="box-card change">
      <template #header>
        <div class="card-header">
          <span>信息修改</span>
        </div>
      </template>
      <el-button type="primary" @click="changeName(nameRuleFormRef)">修改用户名</el-button>
      <el-form ref="nameRuleFormRef" :model="nameRuleForm" status-icon :rules="nameRules" label-width="120px"
        class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input clearable v-model="nameRuleForm.username" type="text" placeholder="请输入新的用户名" />
        </el-form-item>
      </el-form>
      <!-- <el-divider /> -->
      <el-button type="primary" @click="changePwd(pwdRuleFormRef)">修改密码</el-button>
      <el-form ref="pwdRuleFormRef" :model="pwdRuleForm" status-icon :rules="pwdRules" label-width="120px"
        class="demo-ruleForm change">
        <el-form-item prop="oldPwd">
          <el-input type="password" v-model="pwdRuleForm.oldPwd" show-password placeholder="请输入旧的密码"></el-input>
        </el-form-item>
        <el-form-item prop="newPwd">
          <el-input type="password" v-model="pwdRuleForm.newPwd" show-password placeholder="请输入新的密码"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card backup">
      <template #header>
        <div class="card-header">
          <span>备份</span>
        </div>
      </template>
      <div class="backup-body">
        <el-input size="small" maxlength="10" v-model="nDescribe" placeholder="输入描述内容"></el-input>
        <el-input size="small" v-model="backupData" placeholder="输入导入的数据"></el-input>
        <div size="small" class="backup-item" v-for="(item, index) in describes" :key="index">
          <span>{{ item }}</span>
          <div>
            <el-button type="info" @click="useBackup(index)" size="small" :disabled="item == ''">使用</el-button>
            <el-button type="primary" @click="inportBackup(index)" size="small">导入</el-button>
            <el-button size="small" @click="changeDescribe(index)" :disabled="item == ''">修改</el-button>
            <el-button type="danger" size="small" @click="delBackup(index)" :disabled="item == ''">删除
            </el-button>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<style lang="less" scoped>
.change {
  .el-form-item {
    width: 100%;
  }
}

.username {
  font-size: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
}

.text {
  font-size: 14px;
}


.box-card {
  width: 90%;
  margin-bottom: 10px;

}

.el-form {
  align-items: center;
  display: flex;
  flex-direction: column;
}

.change {

  .el-input {
    margin-top: 10px;

  }
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
  margin-top: 10px;
}

.el-form-item__label {
  width: 80px !important;
}

.backup {

  .el-card__body {
    padding: 10px !important;

    .backup-item {
      width: 100%;
      margin-bottom: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .el-button+.el-button {
        margin: 0px;
      }
    }

  }
}
</style>