Page({

  /**
   * 页面的初始数据
   */
  data: {
    actionText: '登录',
    btnType: 'primary',
    userInfo: {
      userUrl: '',
      nickname: '未登录'
    }
  },

  login: function(){
    if (this.data.userInfo.userUrl === ''){
      wx.login({
        timeout: 1000,
        success: (res) => {
          if (res.code) {
            wx.getUserInfo({
              success: (res) => {
                this.setData({
                  actionText: '退出登录',
                  btnType: 'warn',
                  userInfo: {
                    userUrl: res.userInfo.avatarUrl,
                    nickname: res.userInfo.nickName
                  }
                });
                wx.setStorage({
                  key: 'userInfo',
                  data: {
                    actionText: '退出登录',
                    btnType: 'warn',
                    userInfo: {
                      userUrl: res.userInfo.avatarUrl,
                      nickname: res.userInfo.nickName
                    }
                  },
                });
              }
            });
          } else {
            wx.showToast({
              title: '登录失败',
              icon: 'none'
            });
          }
        }
      }) 
    }else{
      wx.removeStorageSync("userInfo");
      this.setData({
        actionText: '登录',
        btnType: 'primary',
        userInfo: {
          userUrl: '',
          nickname: '未登录'
        }
      });
    }
       
  },

 /**
 * 跳转到我的钱包页面
 */
  movetoWallet: function(){
    wx.navigateTo({
      url: '/pages/wallet/wallet',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = wx.getStorageSync("userInfo");
    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        this.setData({
          actionText: res.data.actionText,
          btnType: res.data.btnType,
          userInfo: {
            userUrl: res.data.userInfo.userUrl,
            nickname: res.data.userInfo.nickname
          }
        })
      },
    })
    if(userInfo){
      
    }
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