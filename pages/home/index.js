// index.js
// 获取应用实例
const App = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    company: {
      address: "遵义市播州区保利未来城财智桥龙国籍C座",
      companyId: 1,
      companyName: "贵州铭明网络科技",
      introduction: "公司简介......",
      logo: "公司logo......",
      mobile: "136666666669",
    },
    course: {
      companyName: "贵州铭明网络科技",
      courseDuration: "180",
      courseId: 1,
      courseImg: "http://mmwl-train.oss-cn-hangzhou.aliyuncs.com/1/20210308/340cbe33b9f2450f90935e3e1901b12c.png",
      courseName: "Java基础",
      introduction: "Java从入门到放弃",
      price: 678,
      teacher: "喜羊羊",
    },


  },

  toList() {
    let {
      courseName,
      courseId
    } = this.data.course;
    wx.navigateTo({
      url: '/pages/courseList/index?courseId=' + courseId + '&courseName=' + courseName,
    })
  },

  getCompany() {
    App.wxReq('POST', '/app/index/company', null, res => {
      console.log(res);
      this.setData({
        company: res.data
      })
    })
  },
  getCourse() {
    App.wxReq('POST', '/app/index/course', null, res => {
      this.setData({
        course: res.data[0]
      })
    })
  },
  init() {
    let token = wx.getStorageSync('token')
    if (token) {
      this.getCompany()
      this.getCourse()
    }

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
    this.init()
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