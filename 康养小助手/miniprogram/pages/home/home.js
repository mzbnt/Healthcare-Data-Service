Page({
  data: {
    gridList: [
      { id: 1, name: "食品安全", icon: "/images/icon-food.png", page: "/pages/food/food" },
      { id: 2, name: "体检单", icon: "/images/icon-foot.png", page: "/pages/exam/exam" },
      { id: 3, name: "出行建议", icon: "/images/icon-wedding.png", page: "/pages/travel/travel" },
      { id: 4, name: "太极", icon: "/images/icon-ktv.png", page: "/pages/taiji/taiji" },
      { id: 5, name: "运动", icon: "/images/icon-job.png", page: "/pages/sport/sport" },
      { id: 6, name: "冥想", icon: "/images/icon-class.png", page: "/pages/meditation/meditation" }
    ]
  },

  // 六宫格点击跳转
  onGridItemTap(e) {
    const item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: item.page
    });
  },

  // 健康系统（替换原来商家推荐）
  goHealth() {
    // 后面把这里换成你/同伴真实路径
    wx.navigateTo({
      url: "/pages/health/health"
    });
  },

  // 个人中心（替换原来交友论坛）
  goMine() {
    // 后面把这里换成你/同伴真实路径
    wx.navigateTo({
      url: "/pages/mine/mine"
    });
  }
});
