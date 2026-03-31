// pages/home/home.js
Page({
  data: {
    userInfo: {}
  },

  onLoad() {
    const userInfo = wx.getStorageSync('userInfo') || {};
    this.setData({ userInfo });

    // 未登录则跳回登录页（温和判断，防止闪退）
    if (!userInfo || !userInfo.username) {
      wx.reLaunch({
        url: '/pages/login/login'
      });
    }
  },

  // 功能跳转（和你原来的路径完全一致）
  goToPage(e) {
    const page = e.currentTarget.dataset.page;
    const pageMap = {
      'consult': '/pages/consult/consult',
      'check': '/pages/check/check',
      'system': '/pages/system/system',
      'tcm': '/pages/tcm/tcm'
    };
    const url = pageMap[page];
    if (url) {
      wx.navigateTo({ url });
    } else {
      wx.showToast({ title: '功能暂未开放', icon: 'none' });
    }
  },

  // 退出登录（保留原逻辑）
  logout() {
    wx.removeStorageSync('userInfo');
    wx.reLaunch({
      url: '/pages/login/login'
    });
  }
});