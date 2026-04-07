Page({
  data: {
    userName: "张三"
  },

  onLoad() {
    // 可在这里获取用户信息
  },

  // 跳转到设置页面
  goSetting() {
    wx.navigateTo({
      url: '/pages/setting/setting',
      fail: () => {
        wx.showToast({
          title: '功能开发中',
          icon: 'none'
        })
      }
    })
  }
})