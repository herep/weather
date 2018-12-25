//index.js
//获取应用实例

var day = ["今天", "明天", "后天"];
 Page({

   data: {
     timer:'',
     num: 9,
     day:day,
     lifestyle:[],
     airArray:{},
     t:''
   },

   clickFun:function(){
    wx.redirectTo({
     url: '/pages/city/city',
   })

  },

  onLoad: function (option) {
    var that = this;
    //获取小程序实例
    that.app =  getApp();
    
     if(option.city)
     {
       var city = option.city;
       var  district = option. district;
       var street = option.street;
       var  street_number=option.street_number;
 

         // 将数据设置调用‘
         that.setData({
          city:city,
          district:district,
          street:street,
          street_number:street_number
        })
  
    
     //查询 所在地 天气
     that.getWeahter(city);
     //获取空气质量
     that.getari(city)

     }else
     {
      that.getLocation();
     }
     
     //调用定时器
    that.countDown();
     //调用动画  this.app.show(this, 'slide_up1', -20, that.data.t)
     setTimeout(function () {
      this.app.slideupshow(this, 'slide_up1', -20, 0)
    }.bind(this), 200);
  
  },


//获取此时坐标
getLocation:function (){
  var that = this;
    wx.getLocation({
      //返回GPS坐标
      type: 'wgs84',
      success: function(res){
        //console.log(result)
        //获取w纬度
        var latitude = res.latitude;
        //获取经度
        var longitude = res.longitude;
     
        //console.log(latitude,longitude);
        //将纬度经度 传入获取城市的方法中
        that.getCtiy(latitude,longitude);
      },
    });
},

getCtiy:function(latitude,longitude){
  var that = this
  //请求接口地址

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
      
      var city = res.data.result.addressComponent.city;
      var district = res.data.result.addressComponent.district;
      var street = res.data.result.addressComponent.street;
      var street_number = res.data.result.addressComponent.street_number
           
      // 将数据设置调用‘
       that.setData({
         city:city,
         district:district,
         street:street,
         street_number:street_number
       })

 
    //查询 所在地 天气
    that.getWeahter(city);
    //获取空气质量
    that.getari(city)
    },
    fail:function(res){},
    complete:function(res){},
  })

},


//获取天气信息
getWeahter:function(city)
{
  var that = this
  var url = "https://free-api.heweather.com/s6/weather/"
  var paramters = {
    location:city,
    key:"bcc68edc914e442a8f4e749df2c8bedc"
  }
  //发送请求
  var reqTask = wx.request({
    data:paramters,
    url:url,
    success: (result)=>{
     //温度
      var tmp =result.data.HeWeather6[0].now.tmp;
      //天气
      var txt = result.data.HeWeather6[0].now.cond_txt;
      //天气状态码
      var code = result.data.HeWeather6[0].now.cond_code;
     //风向
      var dir =result.data.HeWeather6[0].now.wind_dir;
      //风力
      var sc =result.data.HeWeather6[0].now.wind_sc;
      //相对湿度
      var hum =result.data.HeWeather6[0].now.hum;
      //体感温度
      var fl = result.data.HeWeather6[0].now.fl;
      //三天的天气情况
      var daily_forecast = result.data.HeWeather6[0].daily_forecast;
      //生活建议
      var lifestyle = result.data.HeWeather6["0"].lifestyle;

      
      //设置 数据
      that.setData({
        tmp:tmp,
        txt:txt,
        code:code,
        dir:dir,
        sc :sc,
        hum:hum,
        fl:fl, 
        daily_forecast:daily_forecast,
        lifestyle:lifestyle,
        airArray:lifestyle[0]
      })
      
    },
    fail: (result)=>{},
    complete: (result)=>{}
  });

},

//获取空气质量
getari:function(city)
{
  var that = this
  var url = "https://free-api.heweather.com/s6/air/"
  var parms = {
    location:city,
    key:"bcc68edc914e442a8f4e749df2c8bedc"
  }
  var reqTask = wx.request({
    url: url,
    data: parms,
    success: (result)=>{
      var qlty = result.data.HeWeather6["0"].air_now_city.qlty
      that.setData({
        qlty:qlty,      
      })

    },
    fail: ()=>{},
    complete: ()=>{}
  });
},

//使用定时器 置换文档
countDown: function() {
  var that = this;
  var num = 8;

  that.setData({
    timer:setInterval(function() {
      //下标递减
      --num;
      //判断
      if(num < 0){
        num = 8
        that.setData({
          airArray:that.data.lifestyle[0]
        })
      }else{
        that.setData({
          airArray:that.data.lifestyle[num]
        })
      }
    },5000)
  })

},

 //跳转 显示三天天气信息页面
 clickDays:function()
{
  var that = this
  var city= that.data.city; 
   wx.redirectTo({
    url:'/pages/days/days?city='+city  
   })
},

})
