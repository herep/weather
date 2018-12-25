
var app = getApp();
Page({
    data:{
        winHeight:"",//窗口高度
        currentTab:0, //预设当前项的值
        scrollLeft:0, //tab标题的滚动条位置
        daily_forecast:[]
    },

    onLoad: function(option) { 
      //收取传递值 
      var that = this; 
      var city = option.city;
      //调用方法 获取天气时间
      that.getWeahter(city);
      that.getari(city);

      wx.getSystemInfo( {  
        success: function( res ) {  
            var clientHeight=res.windowHeight,
                clientWidth=res.windowWidth,
                rpxR=750/clientWidth;
            var  calc=clientHeight*rpxR-180;
          
            that.setData( {  
                winHeight: calc  
            });  
        }  
    })
  }, 
    // 滚动切换标签样式
    switchTab:function(e){
        this.setData({
            currentTab:e.detail.current
        });
       
    },

    // 点击标题切换当前页时改变样式
    swichNav:function(e){
        var cur=e.target.dataset.current;
        if(this.data.currentTaB==cur){return false;}
        else{
            this.setData({
                currentTab:cur
            })
        }
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
            //三天的天气情况
            var daily_forecast = result.data.HeWeather6[0].daily_forecast;

           console.log(daily_forecast);
            //设置 数据
            that.setData({
              daily_forecast:daily_forecast 
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
           console.log(result);
            
            var qlty = result.data.HeWeather6["0"].air_now_city.qlty

            that.setData({
              qlty:qlty
            })
          },
          fail: ()=>{},
          complete: ()=>{}
        });
      },

      
   
    footerTap:app.footerTap
})
