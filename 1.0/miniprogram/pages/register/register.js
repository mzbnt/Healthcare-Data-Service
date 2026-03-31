// pages/register/register.js
Page({
  data: {
    username: '',
    password: ''
  },

  onUsernameInput(e) {
    this.setData({ username: e.detail.value })
  },

  onPasswordInput(e) {
    this.setData({ password: e.detail.value })
  },

  async onRegister() {
    const { username, password } = this.data

    if (!username || !password) {
      wx.showToast({ title: '请输入账号密码', icon: 'none' })
      return
    }

    try {
      wx.showLoading({ title: '注册中...' })

      const res = await wx.cloud.callFunction({
        name: 'saveUserName',
        data: {
          type: 'register',
          userName: username,
          password: password
        }
      })

      wx.hideLoading()
      const result = res.result

      if (result.code === 0) {
        wx.showToast({ title: '注册成功', icon: 'success' })
        setTimeout(() => {
          wx.navigateBack()
        }, 1000)
      } else {
        wx.showToast({ title: result.msg, icon: 'error' })
      }

    } catch (err) {
      wx.hideLoading()
      wx.showToast({ title: '注册失败', icon: 'error' })
    }
  }
})