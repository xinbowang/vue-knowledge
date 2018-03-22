import bootbox from './bootbox.js'
function modals(json) {
  var json = json || {};
  var name = json['name'] || '';
  var title = json['title'] || null;
  var size = json['size'] || 'small';
  var className = json['className'] || null;
  var message = json['message'] || 'message 必须传入内容！';
  var btnLabel = json['btnLabel'] || '确定';
  var btnClass = json['btnClass'] || 'btn-success';
  var callback = json['callback'] || function() {
  };
  var bool = !json['closeButton'] ? false : true;
  // confirms下配置
  var btnCancel = json['btnCancel'] || '取消';
  var btnCancelClass = json['btnCancelClass'] || 'btn-default';
  switch (name) {
    case 'confirm':
      bootbox.confirm({ // 模态框
        title: title, // 弹窗标题
        size: size, // 弹窗尺寸
        className: className,
        message: message, // 主体内容
        buttons: {
          confirm: {
            label: btnLabel,
            className: btnClass,
          },
          cancel: {
            label: btnCancel,
            className: btnCancelClass,
          },
        },
        closeButton: bool, // 右上角关闭按钮：默认false不显示
        callback: callback,
      });
      break;
    default:
      bootbox.alert({ // 弹窗
        title: title, // 弹窗标题
        size: size, // 弹窗尺寸
        className: className,
        message: message, // 主体内容
        buttons: {
          ok: {
            label: btnLabel, // 按钮显示的文字
            className: btnClass // 按钮样式类
          },
        },
        closeButton: bool, // 右上角关闭按钮：默认false不显示
        callback: callback,
      });
  }
}

export default modals;
