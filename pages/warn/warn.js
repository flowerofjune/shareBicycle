Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkBoxValues: [],
    inputValue: {
      num: 0,
      desc: '',
    },
    subBtnColor: '#f2f2f2',
    disabled: true,
    picUrls: [],
    picText: "拍照/相册",
    typeArr: [{
      name: '私锁私用',
      value: 1,
      checked: false
    }, {
      name: '车牌缺损',
      value: 2,
      checked: false
    }, {
      name: '轮胎坏了',
      value: 3,
      checked: false
    }, {
      name: '车锁坏了',
      value: 4,
      checked: false
    }, {
      name: '违规乱停',
      value: 5,
      checked: false
    }, {
      name: '密码不对',
      value: 6,
      checked: false
    }, {
      name: '刹车坏了',
      value: 7,
      checked: false
    }, {
      name: '其他故障',
      value: 8,
      checked: false
    }]
  },

  submitContent: function(){
    wx.showLoading({
      title: '正在提交。。。'
    });
    if (!this.data.disabled){     
      wx.request({
        url: 'https://www.easy-mock.com/mock/5b1deca70fe3124f090bd23d/shareBicycle/addWarnInfo',
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        data: {
          checkBoxValues: this.data.checkBoxValues,
          num: this.data.inputValue.num,
          desc: this.data.inputValue.desc,
          picUrls: this.data.picUrls
        },
        success: function (res) {
          var data = res.data.data;
          wx.hideLoading();
          if (data.code == 'AAAAA') {
            wx.showToast({
              title: data.msg,
              icon: 'success',
              success: function(){
                wx.navigateBack({
                  url: '/pages/index/index'
                });
              }
            });
            
          }else{
            wx.showToast({
              title: "提交失败",
              icon: 'none'
            })
          }
        }
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '请选择故障类型'
      })
    }
    
  },

  changeNumber: function(event){
    this.setData({
      inputValue: {
        num: event.detail.value,
        desc: this.data.inputValue.desc,
      }
    });
  },

  changeDesc: function (event) {
    this.setData({
      inputValue: {
        num: this.data.inputValue.num,
        desc: event.detail.value,
      }
    });
  },
  changeWarnType: function(event){
    var _checkBoxValues = event.detail.value;
    var _subBtnColor = this.data.subBtnColor;
    var _disabled = this.data.disabled;
    if (_checkBoxValues.length > 0){
      _subBtnColor = '#b9dd08';
      _disabled = false;
    }else{
      _subBtnColor = '#f2f2f2';
      _disabled = true;
    }
    this.setData({
      checkBoxValues: _checkBoxValues,
      subBtnColor: _subBtnColor,
      disabled: _disabled
    });
  },

  delPhone: function(event){
    var delIndex = event.target.dataset.index;
    var _picUrls = this.data.picUrls;
    var _picText = this.data.picText;
    _picUrls.splice(delIndex, 1);
    if (_picUrls.length == 0){
      _picText = "拍照/相册";
    }
    this.setData({
      picUrls: _picUrls,
      picText: _picText
    });
  },

  addPhone: function(){
    var _picUrls = this.data.picUrls;
    wx.chooseImage({
      success: res => {
        var tempFilePaths = res.tempFilePaths;
        _picUrls = _picUrls.concat(tempFilePaths);
        this.setData({
          picUrls: _picUrls,
          picText: '+'
        })
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