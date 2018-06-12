Page({

  /**
   * 页面的初始数据
   */
  data: {
    number: 0,
    hours: '00',
    minutes: '00',
    seconds: '00',
    timeTitle: '正在计费',
    clickBtn: false
  },

  goBackIndex: function () {
    if(this.timer == ""){
      wx.redirectTo({
        url: '/pages/index/index',
      })
    }else{
      wx.navigateTo({
        url: '/pages/index/index?timer='+this.timer,
      })
    }
    
  },

  endRide: function(){
    clearInterval(this.timer);
    this.timer = "";
    this.setData({
      timeTitle: '本次骑行用时',
      clickBtn: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let hours = 0,
        minutes = 0,
        seconds = 0;
    this.setData({
      number: options.number
    });
    this.timer = setInterval(() => {
      seconds++
      if(seconds == 60){
        seconds = 0;
        minutes++;
      }
      if (minutes == 60){
        minutes = 60;
        hours++;
      }
      this.setData({
        hours: hours < 10 ? '0' + hours : hours,
        minutes: minutes < 10 ? '0' + minutes : minutes,
        seconds: seconds < 10 ? '0' + seconds : seconds,
      })
    }, 1000);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})