// pages/login/index.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: '13708512247',
    password: '164435'

  },
  mobileFun(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  passFun(e) {
    this.setData({
      password: e.detail.value
    })
  },
  loginFun() {
    const that = this;
    if (!that.data.mobile) {
      return App.Atoast('用户名不能为空')
    }
    if (!that.data.password) {
      return App.Atoast('密码不能为空')
    }
    wx.login({
      success(res) {
        if (res.code) {
          App.wxReq('POST', '/app/login', {
            mobile: that.data.mobile,
            password: that.data.password,
            code: res.code
          }, resol => {
            wx.setStorageSync('token', resol.token)
            wx.switchTab({
              url: '/pages/mine/index',
            })
          })
        } else {
          console.log('登录失败！' + res.errMsg)
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