// pages/mine/index.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{},
    idCardshow:false,
    studyshow:false
  },
  studyFun(){
    this.setData({
      studyshow:true
    })
  },
  idcardFun(){
    this.setData({
      idCardshow:true
    })
  },
  toLogin(){
    wx.navigateTo({
      url: '/pages/login/index',
    })
  },

  buyCode(){
    const that = this;
    let {username} = this.data.user;
    if(username){
      wx.navigateTo({
        url: '/pages/buyHitory/index',
      })
    }else{
      wx.showModal({
        title: '提示',
        confirmText:'去登录',
        content: '您还未登录，请登录后查看',
        success (res) {
          if (res.confirm) {
            that.toLogin()
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    
  },

  getuserInfo(){
    App.wxReq('POST', '/app/userInfo/select', null, res => {
      this.setData({
        user:res.data
      })
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
    let token = wx.getStorageSync('token')
    console.log(token);
    token && this.getuserInfo()
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