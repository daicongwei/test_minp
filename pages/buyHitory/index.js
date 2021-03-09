// pages/buyHitory/index.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },
  getuserInfo(){
    App.wxReq('POST', '/app/userInfo/select', null, res => {
      this.setData({
        list:res.data.purchaseRecords
      })
    })
  },
  toDetails(e){
    // return;
    let {courseId,courseName} = e.currentTarget.dataset.item//课程id
    console.log(e);
    wx.navigateTo({
      url: '/pages/courseList/index?courseName='+courseName+'&courseId='+courseId,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getuserInfo()
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