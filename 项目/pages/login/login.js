// pages/login/login.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    password: ""
  },

  // 监听用户名输入
  onUsernameInput(e) {
    this.setData({
      username: e.detail.value
    })
  },

  // 监听密码输入
  onPasswordInput(e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 登录按钮点击事件
  onLogin() {
    const { username, password } = this.data;
    // 简单非空校验
    if (!username.trim()) {
      wx.showToast({
        title: '请输入用户名',
        icon: 'none'
      })
      return;
    }
    if (!password.trim()) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      })
      return;
    }
    // 这里可以替换为真实的登录接口请求
    wx.showLoading({ title: '登录中...' })
    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({
        title: '登录成功',
        icon: 'success'
      })
      // 保存登录态到本地
      wx.setStorageSync('userInfo',
      { username: username })
      // 登录成功后跳转到首页
      wx.navigateTo({
        url: '/pages/home/home'
      })
    }, 1500)
  },

  // 忘记密码
  onForgetPassword() {
    wx.showToast({
      title: '跳转到找回密码',
      icon: 'none'
    })
  },

  // 去注册页面
  onGoRegister() {
    wx.navigateTo({
      url: '/pages/register/register'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})