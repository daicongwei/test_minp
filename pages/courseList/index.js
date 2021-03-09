// pages/courseList/index.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    sort:0,
    courseId:''

  },

  toPlay(e){
    // console.log(e);
    let item = e.currentTarget.dataset.item
    if(item.sort < this.data.sort){
      // 已经学习完的
      wx.navigateTo({
        url: '/pages/coursePlay/index?item='+JSON.stringify(item)+'&isave=1',
      })
    }else if(item.sort == this.data.sort){
      //正在学习中的
      wx.navigateTo({
        url: '/pages/coursePlay/index?item='+JSON.stringify(item)+'&isave=2',
      })
    }else{
      // 未开始的
      let isFirst = this.data.list.every((i) => i.sort >= item.sort );
      if(isFirst){
        wx.navigateTo({
          url: '/pages/coursePlay/index?item='+JSON.stringify(item)+'&isave=2',
        })
      }else{
        wx.showModal({
          title: '提示',
          content: '请按顺序学习视频'
        })
      }
    }
    // return
    
  },

  getList(courseId){
    App.wxReq('GET', '/app/index/coursecata/'+courseId, null, res => {
      let list = res.courseList;
      let sort = this.data.sort;
      let isFin = false;
      if(res.studyRecord){
        list.map(item => {
          if(item.cataId === res.studyRecord.cataId){
            if(res.studyRecord.stopTime == item.cataDuration){
              sort = item.sort+1;
              isFin = true
            }else{
              item.stopTime = res.studyRecord.stopTime
              item.showTime = parseFloat(res.studyRecord.stopTime/60).toFixed(2)
              sort = item.sort
            }
          }
        })
        if(isFin){
          list.map(iv => {
            if(iv.sort == sort){
              iv.showTime = '0',
              iv.stopTime = 0
            }
          })
        }
      }
      this.setData({
        list,
        courseImg:res.courseImg,
        sort
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      courseId:options.courseId
    })
    // this.getList(options.courseId || 1)
    if(options.courseName){
      wx.setNavigationBarTitle({
        title: options.courseName || '课程列表'
      })
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
   this.getList(this.data.courseId || 1)
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