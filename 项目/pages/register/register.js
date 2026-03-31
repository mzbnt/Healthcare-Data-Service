// pages/register/register.js
Page({
  data: {
    username: "",
    password: "",
    confirmPassword: ""
  },

  onUsernameInput(e) {
    this.setData({ username: e.detail.value })
  },

  onPasswordInput(e) {
    this.setData({ password: e.detail.value })
  },

  onConfirmPasswordInput(e) {
    this.setData({ confirmPassword: e.detail.value })
  },

  onRegister() {
    const { username, password, confirmPassword } = this.data;

    // 非空校验
    if (!username.trim()) {
      wx.showToast({ title: '请输入用户名', icon: 'none' })
      return;
    }
    if (!password.trim() || password.length < 6) {
      wx.showToast({ title: '密码至少6位', icon: 'none' })
      return;
    }
    if (password !== confirmPassword) {
      wx.showToast({ title: '两次密码不一致', icon: 'none' })
      return;
    }

    // 模拟注册请求
    wx.showLoading({ title: '注册中...' })
    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({ title: '注册成功', icon: 'success' })
      // 注册成功后跳转到登录页
      wx.navigateBack()
    }, 1500)
  },

  // 跳转到登录页
  onGoLogin() {
    wx.navigateBack()
  },

  onLoad() {},
  onReady() {},
  onShow() {},
  onHide() {},
  onUnload() {},
  onPullDownRefresh() {},
  onReachBottom() {},
  onShareAppMessage() {}
})