//index.js
//获取应用实例
const app = getApp()
let mapContext;

Page({
  data: {
    widowWidth: 0,
    longitude: 0,
    latitude: 0,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    markers: [{
      iconPath: "/images/markers.png",
      id: 0,
      latitude: 39.85836,
      longitude: 116.29756,
      width: 40,
      height: 45,
    }]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindcontroltap: function(e){
    console.log(e);
  },
  toScan: function() {
    if(this.timer){
      wx.navigateBack({
        url: "/pages/billing/index"
      })
    }else{
      wx.scanCode({
        success: (res) => {
          if (res.result == "李会芳") {
            wx.showLoading({
              title: '正在获取密码',
              mask: true
            })
            wx.request({
              url: 'https://www.easy-mock.com/mock/5b1deca70fe3124f090bd23d/shareBicycle/getUnlockPwd',
              success: (res) => {
                wx.hideLoading();
                var data = res.data.data;
                wx.redirectTo({
                  url: '/pages/scan/scan?unlockPwd=' + data.unlockPwd + "&number=" + data.number,
                  success: (res) => {
                    wx.showToast({
                      title: "获取密码成功",
                      icon: "success",
                      duration: 1000
                    })
                  }
                })
              }
            })

          } else {
            console.log("扫码失败")
          }
        }
      })
    } 
  },
  moveToCenter: function() {
    mapContext.moveToLocation();
  },
  onShow: function() {
    mapContext = wx.createMapContext("mapId", this);
    this.moveToCenter();
  },
  onLoad: function (options) {
    var _this = this;
    if (options.timer){
      this.timer = options.timer;
    }else{
      this.timer = "";
    }
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        _this.setData({
          longitude: res.longitude,
          latitude: res.latitude,
        })
      },
    })
    wx.getSystemInfo({
      success: function(res) {
        _this.setData({
          use: "top: " + (res.windowHeight - 100) + "px;"
                +"left: " + (res.windowWidth / 2 - 40) + "px",
          location: "top: " + (res.windowHeight - 80) + "px;"
                + "left: 20px",
          warn: "top: " + (res.windowHeight - 80) + "px;"
                + "left: " + (res.windowWidth - 70) + "px",
          avatar: "top: " + (res.windowHeight - 150) + "px;"
                + "left: " + (res.windowWidth - 70) + "px",
          marker: "top: " + (res.windowHeight/2 - 48) + "px;"
                + "left: " + (res.windowWidth/2 - 16) + "px",

        })
      },
    })
    
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
