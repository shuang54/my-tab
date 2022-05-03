import { defineStore } from 'pinia'
import { get, post } from '../utils/axios'
import { ElMessage as $message } from 'element-plus'
import qs from 'qs'
export const useUserStore = defineStore({
  id: 'user', // id必填，且需要唯一
  state: () => {
    return {
      userInfo: { username: '', email: '', id: '' },
      token: window.localStorage.getItem('token'),
      backup: {},
    }
  },
  actions: {
    // 用户登录
    async login(userInfo) {
      const result: any = await post('api/login', qs.stringify(userInfo))
      if (result.status == 0) {
        this.token = result.token
        this.userInfo = result.data
        // console.log(this.userInfo, result.data);
        window.localStorage.setItem('token', this.token)
        $message.success('成功登录')
        this.getBackup()
        return 'ok'
      } else {
        $message.error('登录失败')
      }
    },
    // 用户注册
    async register(data) {
      const result: any = await post('api/reguser', qs.stringify(data))
      console.log(result);
      console.log(qs.stringify(data), data);

      if (result.status == 0) {
        $message.success('注册成功')
        return 'ok'
      } else {
        $message.error('注册失败')
      }
    },
    // 发送验证码
    async sendCode(data) {
      const result: any = await post('api/email', qs.stringify(data))
      if (result.status == 0) {
        $message.success('发送成功')
        return 'ok'
      } else {
        $message.error(result.message)
      }
    },
    // 获取用户信息
    async getUserInfo() {
      const result: any = await get('my/userinfo')
      if (result.status == 0) {
        this.userInfo = result.data
        return 'ok'
      }

    },
    // 修改姓名
    async changeName(name) {
      const result: any = await post('my/userinfo', qs.stringify(name))
      if (result.status == 0) {
        this.userInfo.username = name.username
        $message.success('修改成功')
        return 'ok'
      } else {
        $message.error('修改失败')
      }
    },
    // 修改密码
    async changePwd(data) {
      const result: any = await post('my/updatepwd', qs.stringify(data))
      if (result.status == 0) {
        $message.success('修改成功')
      } else {
        $message.error(result.message)
      }
    },
    // 获取备份
    async getBackup() {
      const result: any = await get('my/backup')
      if (result.status == 0) {
        this.backup = result.data
        return 'ok'
      }
    },

    // 删除备份
    async delBackup(i) {
      const data = { "backup": "backup" + i }
      const result: any = await post('my/delBackup', qs.stringify(data))
      if (result.status == 0) {
        $message.success('删除成功')
        this.backup['backup' + i] = ""
        return 'ok'
      } else {
        $message.error(result.message)
      }
    },
    // 修改备份
    async updatedBackup(data, i) {
      // console.log(this.backup['backup' + (i + 1)], data, i);

      const result: any = await post('my/updateBackup', qs.stringify(data))
      if (result.status == 0) {
        $message.success('修改成功')
        this.backup['backup' + (i + 1)] = data['backup' + (i + 1)]
        return 'ok'
      } else {
        $message.error(result.message)
      }
    }
  }
})
