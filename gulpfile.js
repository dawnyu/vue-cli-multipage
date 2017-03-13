'use strict';

var gulp = require('gulp')//加载gulp模块
var webpack = require('webpack')
var Q = require('q')//Q模块。适用于把异步转成同步执行,抽空换成ES6实现
var minimist = require('minimist')//传参
var ora = require('ora')//终端管理
var pro = require('child_process')//运行子进程库
var sftp = require('gulp-sftp')//sftp上传程序
var knownOptions = {
    string: 'env',
    default: {env: process.env.NODE_ENV || 'production'}
};

var gutil = require('gulp-util'),
  options = minimist(process.argv.slice(2), knownOptions),
  src = process.cwd() + '/src',
  assets = process.cwd() + '/dist',
  remoteServer1 = {
    host: '123.56.7.118',
    port:22444,
    remotePath: '/server/nginx/html/newmerchant/newmerchant',
    user: 'tjd',
    pass: 'tjd.ser.lb1'
},
  remoteServer2 = {
    host: '123.56.8.169',
    port:22444,
    remotePath: '/server/nginx/html/newmerchant/newmerchant',
    user: 'tjd',
    pass: 'tjd.ser.lb2'
}
//先执行build命令打包。在把程序上传至服务器
gulp.task('deploy',() => build().then(() => {
     gulp.src(assets + '/**').pipe(sftp(remoteServer1))
     gulp.src(assets + '/**').pipe(sftp(remoteServer2))
  })
)
var build = () => {
   var deferred = Q.defer()
   pro.exec('npm run build',(error, stdout, stderr) => {
     if (error !== null) {
       console.log('exec error: ' + error)
     }
     console.log('build codeing finished')
     deferred.resolve()
   })
   return deferred.promise
}
