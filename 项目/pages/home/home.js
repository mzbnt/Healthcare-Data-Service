Page({
  data: {
    userInfo: {}
  },

  onLoad() {
    // 获取本地存储的用户信息
    const userInfo = wx.getStorageSync('userInfo') || {};
    this.setData({ userInfo });

    // 未登录则跳回登录页
    if (!userInfo.username) {
      wx.redirectTo({
        url: '/pages/login/login'
      });
    }
  },

  // 跳转到对应功能页面
  goToPage(e) {
    const page = e.currentTarget.dataset.page;
    const pageMap = {
      'consult': '/pages/consult/consult',   // 医疗咨询
      'check': '/pages/check/check',       // 自我检测
      'system': '/pages/system/system',    // 健康系统
      'tcm': '/pages/tcm/tcm'              // 中医理疗
    };
    wx.navigateTo({
      url: pageMap[page] || '/pages/index/index'
    });
  },

  // 退出登录
  logout() {
    wx.removeStorageSync('userInfo');
    wx.redirectTo({
      url: '/pages/login/login'
    });
  }
})