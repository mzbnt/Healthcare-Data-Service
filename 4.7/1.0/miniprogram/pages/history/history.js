Page({
  data: {
    historyList: []
  },

  onShow() {
    this.getHistoryFromCloud();
  },

  async getHistoryFromCloud() {
    wx.showLoading({ title: '加载中...' });
    const db = wx.cloud.database();
    try {
      const res = await db.collection('health_reports')
        .orderBy('createTime', 'desc')
        .get();

      this.setData({
        historyList: res.data
      });
    } catch (err) {
      console.error(err);
    }
    wx.hideLoading();
  },

  viewDetail(e) {
    const item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/result/result?data=' + encodeURIComponent(JSON.stringify(item.rawData))
    });
  }
});