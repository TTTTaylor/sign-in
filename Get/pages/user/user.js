//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    motto: '欢迎使用打卡系统',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  changeAvator: function() {
    var me = this;
    wx.chooseImage({
      success: function(res) {
        var filePath = res.tempFilePaths[0];
        console.log(filePath);
        // var fileName = filePath.match(/http.{7}(.*)/);
        //fileName = fileName[1];
        var fileName = Date.parse(new Date()) + '.jpg';
        console.log(fileName);
        uploadFn(filePath, fileName, me, function(avator_url) {
          wx.request({
            url: config.url + '/person/update',
            data: {
              'user_id': app.globalData.user_id,
              'avator_url': avator_url
            },
            method: 'POST',
            success: function(res) {
              console.log(res.data);
              app.globalData.avator_url = avator_url;
            }
          })
        });
      },
    })
  },
  write: function() {
    wx.navigateTo({
      url: '../_form/_form',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function(data) {
          console.log(data)
        },
        someEvent: function(data) {
          console.log(data)
        }
      },
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          data: '_form'
        })
      }
    })
  }
})