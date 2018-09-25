Page({

  /**
   * 页面的初始数据
   */
  data: {
    money: 0
  },

  /**
   * 充值操作
   */
  charge: function(){
    wx.request({
      url: 'https://www.easy-mock.com/mock/5b1deca70fe3124f090bd23d/shareBicycle/recharge',
      method: 'GET',
      success: (res) => {
        var data = res.data.data;
        if(data.code == 'code'){
          wx.getStorage({
            key: 'wallet',
            success: (res) => {
              console.log("success: "+res);
            },
            fail: (res) => {
              console.log("fail: " + res);
            }
          })
        }else{
          wx.showModal({
            title: '支付提示',
            content: '支付失败，请稍后再试',
          });
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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