// pages/check/check.js
Page({
  data: {
      dietOptions: ['清淡饮食', '均衡饮食', '偏好辛辣', '偏好甜食', '暴饮暴食', '其他'],
      dietText: '请选择饮食习惯',
      exerciseOptions: ['几乎不运动', '每周1-2次', '每周3-5次', '每天运动'],
      exerciseText: '请选择运动状况'
  },

  dietChange(e) {
      const index = e.detail.value;
      this.setData({
          dietText: this.data.dietOptions[index]
      });
  },

  exerciseChange(e) {
      const index = e.detail.value;
      this.setData({
          exerciseText: this.data.exerciseOptions[index]
      });
  },

  formSubmit(e) {
      const formData = e.detail.value;
      console.log('自我检测数据：', formData);

      // 简单验证
      if (!formData.age || !formData.height || !formData.weight) {
          wx.showToast({
              title: '请完善必填信息',
              icon: 'none'
          });
          return;
      }

      if (this.data.dietText === '请选择饮食习惯' || this.data.exerciseText === '请选择运动状况') {
          wx.showToast({
              title: '请选择饮食习惯和运动状况',
              icon: 'none'
          });
          return;
      }

      // 提交到后端或本地存储
      wx.showLoading({
          title: '提交中...',
      });

      // 模拟提交延迟
      setTimeout(() => {
          wx.hideLoading();
          wx.showToast({
              title: '提交成功',
              icon: 'success'
          });

          // 跳转到结果页（如果需要）
          // wx.navigateTo({
          //   url: '/pages/result/result?data=' + JSON.stringify(formData)
          // });
      }, 1000);
  }
});

