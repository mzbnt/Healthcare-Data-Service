Page({
  data: {
    // 原有选项
    dietOptions: ['清淡饮食', '均衡饮食', '偏好辛辣', '偏好甜食', '暴饮暴食', '其他'],
    dietText: '请选择饮食习惯',
    exerciseOptions: ['几乎不运动', '每周1-2次', '每周3-5次', '每天运动'],
    exerciseText: '请选择运动状况',
    
    // 🔥 新增：血脂选项（标准/异常/未知）
    lipidOptions: ['血脂正常', '血脂偏高', '血脂偏低', '未知'],
    lipidText: '请选择血脂状况',
    
    // 🔥 新增：睡眠质量选项（良好/一般/差）
    sleepOptions: ['睡眠充足 (7-9h)', '睡眠一般 (4-6h)', '睡眠较差 (<4h)', '未知'],
    sleepText: '请选择睡眠质量'
  },

  // 饮食选择回调
  dietChange(e) {
    this.setData({ dietText: this.data.dietOptions[e.detail.value] });
  },

  // 运动选择回调
  exerciseChange(e) {
    this.setData({ exerciseText: this.data.exerciseOptions[e.detail.value] });
  },

  // 🔥 新增：血脂选择回调
  lipidChange(e) {
    this.setData({ lipidText: this.data.lipidOptions[e.detail.value] });
  },

  // 🔥 新增：睡眠选择回调
  sleepChange(e) {
    this.setData({ sleepText: this.data.sleepOptions[e.detail.value] });
  },

  // 表单提交（核心逻辑升级）
  formSubmit(e) {
    const formData = e.detail.value;

    // 1. 基础必填项校验（年龄、身高、体重）
    if (!formData.age || !formData.height || !formData.weight) {
      wx.showToast({ title: '请完善年龄/身高/体重', icon: 'none' });
      return;
    }

    // 2. 血压血糖必填项校验
    if (!formData.bpHigh || !formData.bpLow || !formData.bloodSugar) {
      wx.showToast({ title: '请填写血压血糖', icon: 'none' });
      return;
    }

    // 3. 新增：血脂和睡眠必须选择（去掉“未知”才必填，或者保留校验看你需求）
    // 如果你想让这两项必须填写，保留下面的校验；如果允许未知，就注释掉这两段
    if (this.data.lipidText === '请选择血脂状况') {
       wx.showToast({ title: '请选择血脂状况', icon: 'none' });
       return;
    }
    if (this.data.sleepText === '请选择睡眠质量') {
       wx.showToast({ title: '请选择睡眠质量', icon: 'none' });
       return;
    }

    // 4. 组装最终数据（包含新增的两个字段）
    const resultData = {
      age: formData.age,
      height: formData.height,
      weight: formData.weight,
      bpHigh: formData.bpHigh,
      bpLow: formData.bpLow,
      bloodSugar: formData.bloodSugar,
      diet: this.data.dietText,
      exercise: this.data.exerciseText,
      lipid: this.data.lipidText,       // 新增
      sleep: this.data.sleepText,       // 新增
      other: formData.other || ''
    };

    // 5. 跳转结果页
    wx.showLoading({ title: '生成报告中...' });
    setTimeout(() => {
      wx.hideLoading();
      wx.navigateTo({
        url: '/pages/result/result?data=' + encodeURIComponent(JSON.stringify(resultData))
      });
    }, 800);
  },

  // 跳转历史页
  goHistory() {
    wx.navigateTo({ url: '/pages/history/history' });
  }
});