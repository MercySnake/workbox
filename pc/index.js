$(function() {
  seajs.config({
    version: '20181123',
    alias: {
      'toolCookie': '//s.autoimg.cn/car/sidebar/common/js/tool-cookie.js',
      'toolbar': '//s.autoimg.cn/car/sidebar/common/js/toolbar-1.1.0.js'
    }
  })
  seajs.use(['jquery', 'toolbar'], function($, toolbar) {
    // 初始化工具栏(无参数)
    toolbar.init(); 
  });
  $('.athm-title__name-sub').on('click', function() {
    alert($(this).text() + '嘿嘿');
  });
});