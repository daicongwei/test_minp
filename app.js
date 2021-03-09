// app.js
App({
  data: {
      reqBaseUrl: 'http://192.168.0.22:8080',
      userInfo: null,
  },

  // 获取用户信息
  getUser(content) {
      const that = this;
      let userObj = that.getUserInfoStorage();
      if (userObj) {
          return userObj;
      } else {
          content = content?content:'您还未登录，是否去登录？'
          if(that.data.isRefuseLogin){
              console.log(that.data.isRefuseLogin,'isRefuseLogin')
          }else{
              that.Adialog({
                  content,
                  confirmText: '去登录',
                  cancelText: '暂不登录'
              }, res => {
                  wx.navigateTo({
                      url: '/pages/views/login/wxLogin/index',
                  })
              }, rej => {
                  that.data.isRefuseLogin = true
              })
          }
          
      }
  },

  // 获取位置
  AgetWeizhi(call) {
      wx.getSetting({
          success: (res) => {
              if (res.authSetting['scope.userLocation']) {
                  wx.getLocation({
                      type: 'wgs84',
                      success: (rese) => {
                          return rese
                      }
                  })
              } else {
                  wx.showModal({
                      title: '请授权位置权限',
                      content: '您的位置仅用于小程序获取客栈与您的距离',
                      success(rtt) {
                          if (rtt.confirm) {
                              wx.openSetting({})
                          }
                      },
                  })
              }
          }
      })
  },

  // 从缓存中提取用户信息
  getUserInfoStorage() {
      return wx.getStorageSync('userInfo');
  },

  // 预览图片
  ApreviewImg(current, urls) {
      wx.previewImage({
          current, // 当前显示图片的http链接
          urls // 需要预览的图片http链接列表
      })
  },



  // 从接口获取折扣信息
  getDiscountArr(callBack) {
      let that = this;
      if (that.data.discount.length > 0) {
          callBack && callBack(that.data.discount)
          return false;
      }
      that.wxReq('GET', '/discount/list', null, res => {
          that.data.discount = res.list;
          callBack && callBack(res.list)
      })
  },

  // 从缓存中提取已经选择的时间
  getSelectTime() {
      return wx.getStorageSync('selectTime');
  },
  // 从缓存中提取系统信息
  getSystemInfo() {
      return wx.getStorageSync('systeminfo');
  },


  //  去登录
  toLogin() {
      wx.navigateTo({
          url: '/pages/views/login/wxLogin/index',
      })
  },

  // 对象转为字符串
  AreqParmHandle(obj) {
      let arr = [];
      for (let key in obj) {
          arr.push(key + '=' + obj[key])
      }
      return arr.join('&')
  },


  // 网络请求 放在app.js
  wxReq(method, requestUrl, requestData, callBack, failCallback,isShow) {
    //   return 
      //method    GET或POST
      const that = this;
      let token = wx.getStorageSync('token')
      method && method.toUpperCase();
      if(!isShow){
          that.AloadingShow();
      }
      wx.request({
          url: that.data.reqBaseUrl + requestUrl,
          method: method || 'GET',
          data: requestData,
          header: {
              'content-type': 'application/json',
              'token': token,
          },
          success: function (res) {
              // 关闭loading
              if(!isShow){
                  wx.hideLoading();
              }
              let retData = res.data;
              if(retData.code == 500){
                that.Atoast(retData.msg)
                failCallback && failCallback(retData)
              }else if(retData.code == 401){
                that.Atoast(retData.msg)
              }else{
                callBack && callBack(retData)
              }
              return




              if (retData.status === 'success') {
                  callBack && callBack(retData.result)
                  return;
              } else if (retData.status === 'error') {
                  if (retData.result && retData.result.error_code === 6001) {
                      wx.clearStorageSync(); // 清除本地所有缓存
                      // that.Atoast('登录已过期，请重新登录！')
                      that.getUser('登录已过期，请重新登录！');
                  }else{
                      that.Atoast(retData.result.error_msg ? retData.result.error_msg : '请求失败！');
                  }
                  if (failCallback) {
                      return failCallback(retData);
                  }
                  
              }
          },
          fail: function (rej) {
              // 关闭loading
              if(!isShow){
                  wx.hideLoading();
              }
              that.Atoast('请求超时');
              failCallback && failCallback(rej);
          }
      })
  },

  // toast弹窗
  Atoast(title, mask) {
      wx.showToast({
          title: title,
          mask: true,
          icon: 'none',
          duration: 1500
      });
      return false;
  },
  // loading 弹窗
  AloadingShow(title) {
      title = title ? title : '加载中...';
      wx.showLoading({
          title,
          mask: true
      })
  },

  // 模态框
  Adialog(obj, successCall,failCall) {
      return wx.showModal({
          confirmColor: '#278F68',
          cancelColor: '#666666',
          ...obj,
          success(res) {
              if (res.confirm) {
                  successCall && successCall()
              }else{
                  failCall && failCall() 
              }
          }
      })
  },

  // 获取当前时间
  AgetTime(callBack) {
      var date = new Date();
      let Y = date.getFullYear();
      let M = date.getMonth() + 1;
      M = M < 10 ? '0' + M : M
      // let D = date .getDate();
      callBack && callBack(`${Y}年${M}月`)
  },



  // 订单----时间戳转为日期格式
  dateHandle(timestamp, type) {
      // timestamp = 1595407906;
      let time = new Date(timestamp * 1000)
      let year = time.getFullYear()
      let month = time.getMonth() + 1
      let date = time.getDate()
      let hours = time.getHours()
      let minute = time.getMinutes()
      let second = time.getSeconds()

      if (date < 10) { date = '0' + date }
      if (hours < 10) { hours = '0' + hours }
      if (minute < 10) { minute = '0' + minute }
      if (second < 10) { second = '0' + second }

      if (type == 1) {
          if (month < 10) { month = '0' + month }
          return year + '-' + month + '-' + date + ' ' + hours + ':' + minute
      } else if (type == 2) {
          return month + '月' + date + '日'
      } else if (type == 3) {
          if (month < 10) { month = '0' + month }
          return year + '-' + month + '-' + date
      } else if (type == 4) {
          if (month < 10) { month = '0' + month }
          return year + '-' + month + '-' + date + ' ' + hours + ':' + minute + ':' + second
      }
  },




  // 上传图片
  AupLoadImg(imgArr, callback) {
      const that = this;
      let userInfo = this.getUser();
      let imgUrlList = [];

      if (imgArr.length > 0) {
          that.AloadingShow('图片上传中！')
          new Promise(resolve => {
              imgArr.map(item => {
                  that.imgUp(item, userInfo.token).then(res => {

                      imgUrlList.push(res)
                      if (imgUrlList.length === imgArr.length) {
                          resolve();
                      }
                  })
              })
          }).then(reg => {
              wx.hideLoading();
              callback && callback(imgUrlList)
          }).catch(err => {
              wx.hideLoading();
              that.Atoast('上传错误，请重新上传！')
          })

      }

  },

  // 图片上传
  imgUp(fileUrl, token) {
      let url = this.data.reqBaseUrl;
      return new Promise((resolve, reject) => {
          wx.uploadFile({
              url: url + '/oss/token',
              filePath: fileUrl,
              name: 'file',
              formData: null,
              method: 'POST',
              header: {
                  "content-type": "application/json",
                  "topsession": token
              },
              success(res) {
                  var data = JSON.parse(res.data);
                  var result = data.result;
                  wx.uploadFile({
                      url: result.host,
                      filePath: fileUrl,
                      name: 'file',
                      formData: {
                          name: result.filename,
                          key: result.dir + result.filename,
                          Policy: result.policy,
                          OSSAccessKeyId: result.accessid,
                          success_action_status: 200,
                          Signature: result.signature
                      },
                      success(res) {
                          let url = result.host + '/' + result.dir + result.filename;
                          resolve(url)
                      },
                      fail(err) {
                          reject(err)
                      }
                  })
              },
          })
      })

  },


  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {

  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {

  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
      console.log(msg);
  }

})
