// pages/login/login.js
Page({
  data: {
    username: "",
    password: "",
    rememberMe: false
  },

  onUsernameInput(e) {
    this.setData({ username: e.detail.value });
  },

  onPasswordInput(e) {
    this.setData({ password: e.detail.value });
  },

  onRememberMeChange(e) {
    this.setData({ rememberMe: e.detail.value });
  },

  async onLogin() {
    const { username, password, rememberMe } = this.data;

    if (!username.trim()) {
      wx.showToast({ title: '请输入用户名', icon: 'none' });
      return;
    }
    if (!password.trim()) {
      wx.showToast({ title: '请输入密码', icon: 'none' });
      return;
    }

    try {
      wx.showLoading({ title: '登录中...' });
      
      const res = await wx.cloud.callFunction({
        name: "saveUserName",
        data: {
          type: 'login',
          userName: username,
          password: password
        }
      });

      wx.hideLoading();
      const result = res.result;

      if (result.code === 0) {
        // 正确存入用户信息，防止首页闪退
        wx.setStorageSync('userInfo', {
          username: result.userName || username,
          userId: result.userId
        });

        // 记住我逻辑
        if (rememberMe) {
          wx.setStorageSync('rememberMe', { username });
        } else {
          wx.removeStorageSync('rememberMe');
        }

        // 登录成功后直接跳首页，不停留
        wx.reLaunch({
          url: '/pages/home/home'
        });
      } else {
        wx.showToast({ title: result.msg || '登录失败', icon: 'error' });
      }
    } catch (err) {
      wx.hideLoading();
      wx.showToast({ title: '服务异常', icon: 'none' });
    }
  },

  onGoRegister() {
    wx.navigateTo({ url: '/pages/register/register' });
  },

  onLoad() {
    const rememberUser = wx.getStorageSync('rememberMe');
    if (rememberUser) {
      this.setData({
        username: rememberUser.username,
        rememberMe: true
      });
    }
  }
});