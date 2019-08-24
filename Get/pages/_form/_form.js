// pages/_form/_form.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  formSubmit:function(e){
    console.log(e.detail.value);
    if (e.detail.value.owner.length == 0 || e.detail.value.owner.length >= 8) {
      wx.showToast({
        title: '姓名不能为空或过长!',
        icon: 'loading',
        duration: 1500
      })

      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    }
    else if (e.detail.value.activity.length == 0) {
      wx.showToast({
        title: '活动不能为空!',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    }
    else if (e.detail.value.summary.length == 0) {
      wx.showToast({
        title: '简介不能为空!',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    }
    else if (e.detail.value.adress.length == 0) {
      wx.showToast({
        title: '地点不能为空!',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    }
    else if (e.detail.value.phone.length == 0) {
      wx.showToast({
        title: '电话不能为空!',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } 
    else {
      wx.request({
        url: '接口路径',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        
        data: { 
          activity: e.detail.value.activity, 
          summary: e.detail.value.summary, 
          owner: e.detail.value.owner,
          adress: e.detail.value.adress,
          phone: e.detail.value.phone
          
        }, 
          success:function(res){
            console.log(res.data);
            if(res.data.status==0){
              wx.showToast({
                title: '提交失败',
                icon:'loading',
                duration: 1500
              })
            }
            else{
              wx.showToast({
                title: '提交成功',
                icon:'succes',
                duration:1500
            })
          }
        }
      })
    }
  },

  

      //  that.setData({
      //     activity=e.detail.value.activity,
      //     summary=e.detail.value.summary,
      //     owner=e.detail.value.owner,
      //     adress=e.detail.value.adress,
      //     phone=e.detail.value.phone
      //  }
  formReset:function(e){
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      activity: "",
      summary: "",
      owner: "",
      adress: "",
      phone: ""
    })
  },
  onLoad: function (option) {
    console.log(option.query)
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('acceptDataFromOpenedPage', { data: '_form' });
    eventChannel.emit('someEvent', { data: '_form' });
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      console.log(data)
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