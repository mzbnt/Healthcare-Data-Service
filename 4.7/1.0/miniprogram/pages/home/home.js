Page({
  data: {
    gridList: [
      { id: 1, name: "食品安全", icon: "/images/food.png", page: "/pages/food/food" },
      { id: 2, name: "体检单", icon: "/images/text.png", page: "/pages/exam/exam" },
      { id: 3, name: "出行建议", icon: "/images/outad.png", page: "/pages/travel/travel" },
      { id: 4, name: "太极", icon: "/images/taiji.png", page: "/pages/taiji/taiji" },
      { id: 5, name: "运动", icon: "/images/sport.png", page: "/pages/sport/sport" },
      { id: 6, name: "冥想", icon: "/images/thinking.png", page: "/pages/meditation/meditation" }
    ]
  },

  // 六宫格点击跳转
  onGridItemTap(e) {
    const item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: item.page
    });
  },

  // 健康系统
  goHealth() {
    wx.navigateTo({
      url: "/pages/function/function"
    });
  },

  // 个人中心
  goMine() {
    wx.navigateTo({
      url: "/pages/personal/personal"
    });
  }
});