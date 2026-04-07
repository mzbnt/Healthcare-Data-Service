Page({
  data: {
    report: {}
  },

  onLoad(options) {
    const dataStr = decodeURIComponent(options.data);
    const formData = JSON.parse(dataStr);

    const height = Number(formData.height) / 100;
    const weight = Number(formData.weight);
    const bmi = (weight / (height * height)).toFixed(1);

    let bmiLevel = '';
    if (bmi < 18.5) bmiLevel = '偏瘦';
    else if (bmi < 24) bmiLevel = '正常';
    else if (bmi < 28) bmiLevel = '超重';
    else bmiLevel = '肥胖';

    const bpHigh = Number(formData.bpHigh);
    const bpLow = Number(formData.bpLow);
    let bpLevel = '正常';
    if (bpHigh >= 140 || bpLow >= 90) bpLevel = '偏高';
    else if (bpHigh < 90 || bpLow < 60) bpLevel = '偏低';

    const sugar = Number(formData.bloodSugar);
    let sugarLevel = '正常';
    if (sugar > 6.1) sugarLevel = '偏高';
    else if (sugar < 3.9) sugarLevel = '偏低';

    const now = new Date();
    const reportNo = `JK-${now.getFullYear()}${(now.getMonth()+1+'').padStart(2,0)}${(now.getDate()+'').padStart(2,0)}${Math.floor(Math.random()*1000).toString().padStart(3,'0')}`;

    const report = {
      reportNo: reportNo,
      age: formData.age,
      height: formData.height + 'cm',
      weight: formData.weight + 'kg',
      bp: `${bpHigh}/${bpLow} mmHg`,
      bpLevel: bpLevel,
      sugar: sugar + ' mmol/L',
      sugarLevel: sugarLevel,
      diet: formData.diet,
      exercise: formData.exercise,
      bmi: bmi,
      bmiLevel: bmiLevel,
      checkTime: this.getNowTime(),
      suggest: this.getSuggest(formData, bmiLevel, bpLevel, sugarLevel),
      rawData: formData,
      createTime: new Date()
    };

    this.setData({ report });
    this.saveToCloud(report);
  },

  getNowTime() {
    const date = new Date();
    return `${date.getFullYear()}年${(date.getMonth()+1+'').padStart(2,0)}月${(date.getDate()+'').padStart(2,0)}日 ${date.getHours()}:${date.getMinutes()}`;
  },

  getSuggest(formData, bmiLevel, bpLevel, sugarLevel) {
    let s = [];
    if (bmiLevel === '偏瘦') s.push('建议增加优质蛋白与热量摄入，少食多餐');
    if (bmiLevel === '超重' || bmiLevel === '肥胖') s.push('建议控制总热量，减少高油高糖，坚持规律运动');
    if (bpLevel !== '正常') s.push('血压异常，建议清淡少盐，定期监测');
    if (sugarLevel !== '正常') s.push('血糖异常，建议控制糖分，规律作息');
    if (formData.diet.includes('暴饮暴食') || formData.diet.includes('辛辣') || formData.diet.includes('甜食')) {
      s.push('饮食需调整，建议清淡规律，多吃蔬果');
    }
    if (formData.exercise.includes('几乎不')) s.push('建议每周至少运动3次，每次30分钟以上');
    if (s.length === 0) s.push('整体状况良好，继续保持');
    return s.join('；');
  },

  // 保存到云数据库
  saveToCloud(report) {
    const db = wx.cloud.database();
    db.collection('health_reports').add({
      data: report
    }).then(res => {
      console.log('体检单已保存到云数据库', res);
    }).catch(err => {
      console.error('保存失败', err);
    });
  },

  saveReport() {
    wx.showToast({ title: '报告已保存', icon: 'success' });
  }
});