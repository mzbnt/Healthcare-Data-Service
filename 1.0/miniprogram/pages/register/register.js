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

  async onRegister() {
    wx.cloud.init({
      env:'cloudbase-2grgdfj597010dcd',
      traceUser:true
    })
    const { username, password, confirmPassword } = this.data;
    console.log("注册按钮被点击");
    console.log("用户名: ", this.data.username);
  
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
  
    try {
      wx.showLoading({ title: '注册中...' })
      
      
      const res = await wx.cloud.callFunction({
        name: "saveUserName",
        data: {
          type:'register',
          userName: username,
          password: password
          // 注意：当前云函数没处理 password，先只存用户名
        }
      });
  
      wx.hideLoading();
      console.log("云函数返回：", res.result);
  
      if (res.result.success) {
        wx.showToast({ title: res.result.msg || '注册成功', icon: 'success' })
        setTimeout(() => wx.navigateBack(), 1500)
      } else {
        wx.showToast({ title: res.result.msg || '注册失败', icon: 'none' })
      }
    } catch (err) {
      wx.hideLoading();
      console.error("调用失败：", err);
      wx.showToast({ title: '网络异常', icon: 'none' })
    }
  },


  // 跳转到登录页
  onGoLogin() {
      wx.navigateBack();
  },

  onLoad() { },
  onReady() { },
  onShow() { },
  onHide() { },
  onUnload() { },
  onPullDownRefresh() { },
  onReachBottom() { },
  onShareAppMessage() { }
})