Page({
  data: {
    min: 1,
    max: 100,
    count: 1,
    results: [],
    isRotating: false
  },

  onMinInput(e) {
    this.setData({ min: parseInt(e.detail.value) || 0 });
  },

  onMaxInput(e) {
    this.setData({ max: parseInt(e.detail.value) || 0 });
  },

  onCountInput(e) {
    let count = parseInt(e.detail.value) || 1;
    if (count > 10) count = 10; // Limit to 10 for UI reasons
    this.setData({ count });
  },

  generateNumbers() {
    const { min, max, count } = this.data;
    
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
        isRotating: false
      });

      // Haptic feedback if available
      if (wx.vibrateShort) {
        wx.vibrateShort({ type: 'medium' });
      }
    }, 2000); // 2 seconds of rotation
  }
})
