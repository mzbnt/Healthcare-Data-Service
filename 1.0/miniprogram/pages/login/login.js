// pages/login/login.js
Page({
  data: {
    username: "",
    password: "",
    rememberMe: false
  },

  onUsernameInput(e) {
    this.setData({ username: e.detail.value })
  },

  onPasswordInput(e) {
    this.setData({ password: e.detail.value })
  },

  onRememberMeChange(e) {
    this.setData({ rememberMe: e.detail.value })
  },

  async onLogin() {
    const { username, password } = this.data;

    // 非空校验
    if (!username.trim()) {
      wx.showToast({ title: '请输入用户名', icon: 'none' })
      return;
    }
    if (!password.trim()) {
      wx.showToast({ title: '请输入密码', icon: 'none' })
      return;
    }

    try {
      wx.showLoading({ title: '登录中...' })
      
      // 调用云函数（复用 saveUserName，标记为登录操作）
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
      console.log("云函数返回：", result);

      // 登录成功判断
      if (result.code === 0) {
        wx.showToast({
          title: result.msg || '登录成功',
          icon: 'success',
          duration: 1500
        });
        console.log("✅ 登录成功，准备跳转首页");

        // 延迟跳转，确保 Toast 展示完毕
        setTimeout(() => {
          console.log("🚀 执行跳转：/pages/home/home");
          wx.reLaunch({
            url: '/pages/home/home',
            fail: (err) => {
              console.error("❌ 跳转失败：", err);
              wx.showToast({
                title: '跳转失败，请检查页面配置',
                icon: 'none'
              });
            }
          });
        }, 1500);
      } else {
        // 登录失败（用户不存在/密码错误）
        wx.showToast({
          title: result.msg || '登录失败',
          icon: 'error'
        });
        console.log("❌ 登录失败：", result);
      }
    } catch (err) {
      wx.hideLoading();
      console.error("调用失败：", err);
      wx.showToast({
        title: '网络异常，请稍后重试',
        icon: 'none'
      });
    }
  },

  onGoRegister() {
    wx.navigateTo({
      url: '/pages/register/register'
    });
  },

  onLoad() {
    // 可选：读取本地记住的账号
    const rememberUser = wx.getStorageSync('rememberMe');
    if (rememberUser) {
      this.setData({
        username: rememberUser.username,
        rememberMe: true
      });
    }
  }
})