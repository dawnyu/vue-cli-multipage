/**
 * 此处须把所有过滤器全局化
 */
import Vue from 'vue'
Vue.filter('dateFormatter', require('./dateFormatter').dateFormatter)