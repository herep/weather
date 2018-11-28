/**
 * 公共方法
 * 
 * 
 */ 
module.exports.getCtiy = getCtiy;
module.exports.getWeahter = getWeahter;
module.exports.getari = getari;

//获取所在位置信息
function getCtiy(latitude,longitude){
    var that = this
    //请求接口地址
    //console.log(latitude,longitude);
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
        
        // var city = res.data.result.addressComponent.city;
        // var district = res.data.result.addressComponent.district;
        // var street = res.data.result.addressComponent.street;
        // var street_number = res.data.result.addressComponent.street_number
              //console.log(city);
         //将数据设置调用‘
        //  that.setData({
        //    city:city,
        //    district:district,
        //    street:street,
        //    street_number:street_number
        //  })
      },
      fail:function(res){},
      complete:function(res){},
    })

}

//获取天气信息
function getWeahter(city)
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

      //console.log(result);

      //设置 数据
      that.setData({
        tmp:tmp,
        txt:txt,
        code:code,
        dir:dir,
        sc :sc,
        hum:hum,
        fl:fl, 
        daily_forecast:daily_forecast  
      })
    },
    fail: (result)=>{},
    complete: (result)=>{}
  });

}

//获取空气质量
function getari(city)
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
      //console.log(result);
      var qlty = result.data.HeWeather6["0"].air_now_city.qlty

      that.setData({
        qlty:qlty
      })
    },
    fail: ()=>{},
    complete: ()=>{}
  });
}

