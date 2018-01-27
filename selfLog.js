/** * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
 可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *  eg:
 * (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S")==> 2018-01-26 23:05:07.423
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2018-01-26 五 23:05:07
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2018-01-26 周五 11:05:07
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2018-01-26 星期五 11:05:07
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2018-01-26 11:5:7.30
 */
Date.prototype.pattern = function(fmt) {
    var o = {
        "M+" : this.getMonth()+1, //月份
        "d+" : this.getDate(), //日
        "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
        "H+" : this.getHours(), //小时
        "m+" : this.getMinutes(), //分
        "s+" : this.getSeconds(), //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S" : this.getMilliseconds() //毫秒
    };
    var week = {
        "0" : "/u65e5",
        "1" : "/u4e00",
        "2" : "/u4e8c",
        "3" : "/u4e09",
        "4" : "/u56db",
        "5" : "/u4e94",
        "6" : "/u516d"
    };
    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    if(/(E+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
};


/**
 *  log 分为4个等级 从低到高，DEBUG, INFO, WARN, ERROR
 *  level:  默认值：9
 *      1 只打印 DEBUG 模式的 log
 *      2 只打印 INFO 模式的 log
 *      3 只打印 WARN 模式的 log
 *      4 只打印 ERROR 模式的 log
 *      5 打印 DEBUG INFO 模式的 log
 *      6 打印 WARN ERROR 模式的 log
 *      7 打印 DEBUG INFO WARN 模式的 log
 *      8 打印 DEBUG INFO ERROR 模式的 log
 *      9 打印 DEBUG INFO WARN ERROR 模式的 log
 *      输入其他数字(除0之外)不打印任何等级的log
 *   showTime: 默认不显示时间 true or false
 *   format: 时间格式化
 *      yyyy-MM-dd hh:mm:ss.S           --> 2018-01-26 23:05:07.423
 *      yyyy-MM-dd E HH:mm:ss           --> 2018-01-26 五 23:05:07
 *      yyyy-MM-dd EE hh:mm:ss          --> 2018-01-26 周五 11:05:07
 *      yyyy-MM-dd EEE hh:mm:ss         --> 2018-01-26 星期五 11:05:07
 *      yyyy-M-d h:m:s.S                --> 2018-01-26 11:5:7.30
 *
 *  Created by yifan on 2018/1/26.
 */
(function (global,level,showTime,format) {
    "use strict";
    var LEVEL = level || 9;
    var SHOWTIME =  showTime || false;
    var FORMAT = format || "yyyy-MM-dd HH:mm:ss.S";
    var makeTime = function () {
        return SHOWTIME ? "[ "+new Date().pattern(FORMAT)+" ] ": "";
    };
    var isShowColor = myBrowser();
    var selfLog = {
        DEBUG:function DEBUG(msg1,msg2,msg3,msg4,msg5,msg6,msg7,msg8,msg9,msg10) {
            switch(LEVEL){
                case 1:case 5:case 7:case 8:case 9:
                    console.log(makeTime()+"debug:",msg1||"",msg2||"",msg3||"",msg4||"",msg5||"",msg6||"",msg7||"",msg8||"",msg9||"",msg10||"");
                    break;
            }
            return this;
        },
        INFO:function INFO(msg1,msg2,msg3,msg4,msg5,msg6,msg7,msg8,msg9,msg10) {
            switch(LEVEL){
                case 2:case 5:case 7:case 8:case 9:
                    if(isShowColor){
                        console.log("%c%s","color: #00BFFF;",makeTime()+"info :",msg1||"",msg2||"",msg3||"",msg4||"",msg5||"",msg6||"",msg7||"",msg8||"",msg9||"",msg10||"");
                    }else{
                        console.log(makeTime()+"info :",msg1||"",msg2||"",msg3||"",msg4||"",msg5||"",msg6||"",msg7||"",msg8||"",msg9||"",msg10||"");
                    }
                    break;
            }
            return this;
        },
        WARN:function WARN(msg1,msg2,msg3,msg4,msg5,msg6,msg7,msg8,msg9,msg10) {
            switch(LEVEL){
                case 3:case 6:case 7:case 9:
                    if(isShowColor){
                        console.log("%c%s","color: #FF4500;",makeTime()+"warn :",msg1||"",msg2||"",msg3||"",msg4||"",msg5||"",msg6||"",msg7||"",msg8||"",msg9||"",msg10||"");
                    }else{
                        console.log(makeTime()+"warn :",msg1||"",msg2||"",msg3||"",msg4||"",msg5||"",msg6||"",msg7||"",msg8||"",msg9||"",msg10||"");
                    }
                    break;
            }
            return this;
        },
        ERROR:function ERROR(msg1,msg2,msg3,msg4,msg5,msg6,msg7,msg8,msg9,msg10) {
            switch(LEVEL){
                case 4:case 6:case 8:case 9:
                    if(isShowColor){
                        console.log("%c%s","color: #ff0000;",makeTime()+"error:",msg1||"",msg2||"",msg3||"",msg4||"",msg5||"",msg6||"",msg7||"",msg8||"",msg9||"",msg10||"");
                    }else {
                        console.log(makeTime() + "error :", msg1 || "", msg2 || "", msg3 || "", msg4 || "", msg5 || "", msg6 || "", msg7 || "", msg8 || "", msg9 || "", msg10 || "");
                    }
                    break;
            }
            return this;
        }
    };

    function myBrowser(){
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
            return 0;
        }  //判断是否IE浏览器
        if (userAgent.indexOf("Edge") > -1) {
            return 0;
        } //判断是否Edge浏览器
        if (userAgent.indexOf("Opera") > -1) {
            return 0
        } //判断是否Opera浏览器
        if (userAgent.indexOf("Firefox") > -1) {
            return 1;
        } //判断是否Firefox浏览器
        if (userAgent.indexOf("Chrome") > -1){
            return 1;
        }
        if (userAgent.indexOf("Safari") > -1) {
            return 1;
        } //判断是否Safari浏览器
    }
    global.selfLog = selfLog;
})(this);

selfLog.DEBUG("log debug");

selfLog.INFO("log info");

selfLog.WARN("log warn");

selfLog.ERROR("log error");

selfLog.DEBUG(1);

selfLog.INFO(2);

selfLog.WARN(3);

selfLog.ERROR(4);

selfLog.DEBUG(true);

selfLog.INFO(true);

selfLog.WARN(true);

selfLog.ERROR(true);

selfLog.DEBUG({data:"debug"});

selfLog.INFO({data:"info"});

selfLog.WARN({data:"warn"});

selfLog.ERROR({data:"error"});

selfLog.DEBUG([1]);

selfLog.INFO([2]);

selfLog.WARN([3]);

selfLog.ERROR([4]);

selfLog.DEBUG(null);

selfLog.INFO(null);

selfLog.WARN(null);

selfLog.ERROR(null);

selfLog.DEBUG(undefined);

selfLog.INFO(undefined);

selfLog.WARN(undefined);

selfLog.ERROR(undefined);

selfLog.DEBUG("log debug"+" . " +1,"aaa");

selfLog.INFO("log info"+" . " +2,"aaa");

selfLog.WARN("log warn"+" . " +3,"aaa");

selfLog.ERROR("log error"+" . " +4,"aaa");

selfLog.DEBUG(1,2,3,4,5,6,7,8,9,10);

selfLog.INFO(1,2,3,4,5,6,7,8,9,10);

selfLog.WARN(1,2,3,4,5,6,7,8,9,10);

selfLog.ERROR(1,2,3,4,5,6,7,8,9,10);

selfLog.DEBUG("","","","","","","","","","");

selfLog.INFO("","","","","","","","","","");

selfLog.WARN("","","","","","","","","","");

selfLog.ERROR("","","","","","","","","","");

selfLog.DEBUG("1","2","3","4","5","6","7","8","9","10");

selfLog.INFO("1","2","3","4","5","6","7","8","9","10");

selfLog.WARN("1","2","3","4","5","6","7","8","9","10");

selfLog.ERROR("1","2","3","4","5","6","7","8","9","10");

