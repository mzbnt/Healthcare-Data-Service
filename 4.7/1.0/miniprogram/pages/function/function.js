// pages/function/function.js
Page({
  data: {
    userInfo: {}
  },

  onLoad() {
    // 啥也不用干
  },

  // 功能跳转
  goToPage(e) {
    const page = e.currentTarget.dataset.page;
    const pageMap = {
      'consult': '/pages/consult/consult',
      'check': '/pages/check/check',
      'mental': '/pages/mental/mental',
      'tcm': '/pages/tcm/tcm'
    };
    const url = pageMap[page];
    if (url) {
      wx.navigateTo({ url });
    } else {
      wx.showToast({ title: '功能暂未开放', icon: 'none' });
    }
  }
});