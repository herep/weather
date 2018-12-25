

Page({

  data: {
  city:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
   
  },
    //获取输入框值
    bindkeyInput:function(e)
    {
      var that = this;
      var i_city = e.detail.value;
   
      //输入结束 查询输入经纬度
      that.getLocation(i_city);
      wx.navigateBack();   
    },
    
  //获取输入城市的经纬度
  getLocation:function(city){
  var that = this
  var i_city = city;
  //请求接口地址
 
  var url = "https://api.map.baidu.com/geocoder/v2/";
  //请求接口所需要的数据
  var parm = {
   address:i_city,
    output:"json",
    ak:"Q7cDNY8CEMAZfR37g5ulzGtBYQgX7rxG"
   
  }

  wx.request({
    data:parm,
    url:url,
    success:function(res){
    
      //收集 输入城市信息
      var lat = res.data.result.location.lat
      var lng = res.data.result.location.lng

      that.getCtiy(lat,lng);
    },
    fail:function(res){},
    complete:function(res){},
  })

},

//获取输入城市信息
getCtiy:function(latitude,longitude){
  var that = this
 
  var url = "https://api.map.baidu.com/geocoder/v2/";
  //请求接口所需要的数据
  var parm = {
    location:latitude+","+longitude,
    output:"json",
    ak:"Q7cDNY8CEMAZfR37g5ulzGtBYQgX7rxG"
   
  }

  wx.request({
    data:parm,
    url:url,
    success:function(res){
   
      //获取城市信息
      var city = res.data.result.addressComponent.city;
      var province = res.data.result.addressComponent.province;
      var district = res.data.result.addressComponent.district;
      var street = res.data.result.addressComponent.street;
      var street_number = res.data.result.addressComponent.street_number

      that.setData({
        city:city,
        district:district,
        street:street,
        street_number:street_number, 
        province: province
      })
   
    
    },
    fail:function(res){},
    complete:function(res){},
  })

},

clickFun:function(){
    var that = this
    wx.redirectTo({
      url:'/pages/index/index?city='+that.data.city+'&street_number='+that.data.street_number+'&street='+that.data.street+'&district='+that.data.district+''
    })
},

clickcity:function(e){
  var that = this
    //请求接口地址
 
    var i_city = e.currentTarget.dataset.city;
    
    var url = "https://api.map.baidu.com/geocoder/v2/";
    //请求接口所需要的数据
    var parm = {
     address:i_city,
      output:"json",
      ak:"Q7cDNY8CEMAZfR37g5ulzGtBYQgX7rxG"
     
    }
  
    wx.request({
      data:parm,
      url:url,
      success:function(res){
      
        //收集 输入城市信息
        var lat = res.data.result.location.lat
        var lng = res.data.result.location.lng
  
        var url = "https://api.map.baidu.com/geocoder/v2/";
  //请求接口所需要的数据
  var parm = {
    location:lat+","+lng,
    output:"json",
    ak:"Q7cDNY8CEMAZfR37g5ulzGtBYQgX7rxG"
   
  }

  wx.request({
    data:parm,
    url:url,
    success:function(res){
   
      //获取城市信息
      var city = res.data.result.addressComponent.city;
      var province = res.data.result.addressComponent.province;
      var district = res.data.result.addressComponent.district;
      var street = res.data.result.addressComponent.street;
      var street_number = res.data.result.addressComponent.street_number

      wx.redirectTo({
          url:'/pages/index/index?city='+city+'&street_number='+street_number+'&street='+street+'&district='+district+''
     })
    
    },
    fail:function(res){},
    complete:function(res){},
  })

      },
      fail:function(res){},
      complete:function(res){},
    })

  
   
},



})