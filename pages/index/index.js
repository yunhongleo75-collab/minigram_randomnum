Page({
  data: {
    min: 1,
    max: 100,
    count: 1,
    results: [],
    isRotating: false,
    statusBarHeight: 20,
    navBarHeight: 44,
    showScroll: false
  },

  onLoad() {
    const systemInfo = wx.getSystemInfoSync();
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    
    // Calculate heights to align with the "Capsule" button
    const statusBarHeight = systemInfo.statusBarHeight;
    const navBarHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height;

    this.setData({
      statusBarHeight,
      navBarHeight
    });
  },

  onMinInput(e) {
    this.setData({ min: e.detail.value });
  },

  onMaxInput(e) {
    this.setData({ max: e.detail.value });
  },

  onCountInput(e) {
    this.setData({ count: e.detail.value });
  },

  generateNumbers() {
    let { min, max, count } = this.data;
    
    // Parse and validate values
    min = parseInt(min);
    max = parseInt(max);
    count = parseInt(count) || 1;

    if (isNaN(min) || isNaN(max)) {
      wx.showToast({
        title: '请输入有效的数字',
        icon: 'none'
      });
      return;
    }

    if (count > 30) count = 30;
    if (count < 1) count = 1;
    
    if (min >= max) {
      wx.showToast({
        title: '最小值需小于最大值',
        icon: 'none'
      });
      return;
    }

    this.setData({ 
      isRotating: true,
      results: []
    });

    // Simulate "prophecy" time
    setTimeout(() => {
      const newResults = [];
      for (let i = 0; i < count; i++) {
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        newResults.push(num);
      }

      this.setData({
        results: newResults,
        isRotating: false,
        showScroll: count > 1 // Show scroll only for multiple results
      });

      // Haptic feedback if available
      if (wx.vibrateShort) {
        wx.vibrateShort({ type: 'medium' });
      }
    }, 2000); // 2 seconds of rotation
  },

  closeScroll() {
    this.setData({ 
      showScroll: false,
      results: []
    });
  }
})