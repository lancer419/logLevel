# logLevel
浏览器根据需要显示不同等级log
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
