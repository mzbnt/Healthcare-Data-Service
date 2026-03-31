// pages/consult/consult.js
Page({
  data: {
      searchKeyword: '',
      resultList: []
  },

  // 监听输入框变化
  onInputChange(e) {
      this.setData({
          searchKeyword: e.detail.value
      });
  },

  // 执行搜索（可对接后端接口）
  onSearch() {
      const keyword = this.data.searchKeyword.trim();
      if (!keyword) {
          wx.showToast({
              title: '请输入搜索内容',
              icon: 'none'
          });
          return;
      }

      // 模拟搜索数据（实际开发中替换为接口请求）
      const mockData = [
          { id: 1, name: '感冒', desc: '常见上呼吸道感染，症状包括咳嗽、流涕、发热等' },
          { id: 2, name: '高血压', desc: '以体循环动脉血压增高为主要特征的临床综合征' },
          { id: 3, name: '糖尿病', desc: '以高血糖为特征的代谢性疾病，需长期控制血糖' }
      ];

      // 过滤匹配结果
      const filtered = mockData.filter(item =>
          item.name.includes(keyword) || item.desc.includes(keyword)
      );

      this.setData({
          resultList: filtered
      });

      if (filtered.length === 0) {
          wx.showToast({
              title: '未找到相关病症',
              icon: 'none'
          });
      }
  }
});
