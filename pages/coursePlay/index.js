// pages/coursePlay/index.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseItem:{},
    // currentTime:'',
    isshow:false
  },
  bindtimeupdate(e){
    // console.log(e.detail);
    this.setData({
      currentTime:Math.floor(e.detail.currentTime)
    })
  },
  saveData(){
    console.log(this.data.currentTime);
    if(this.data.isave == 2){
      App.wxReq('POST', '/app/studyrecord/save', {
        courseId:this.data.courseItem.courseId,
        cataId:this.data.courseItem.cataId,//
        stopTime:this.data.currentTime
      }, res => {
        // if(res.studyRecord){
  
        // }
      })
    }
    // return
    
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let courseItem = JSON.parse(options.item)
    let isave = options.isave
    console.log(courseItem);
    console.log('开始时间：---'+courseItem.stopTime);
    // this.setData({
    //   isave
    // })
    this.setData({
      courseItem,
      // currentTime:courseItem.stopTime,
      isave
    })
    if(courseItem.cataName){
      wx.setNavigationBarTitle({
        title: courseItem.cataName || '课程'
      })
    }
    setTimeout(()=>{
      this.setData({
        isshow:true
      },300)
    })

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
    this.saveData()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.saveData()
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