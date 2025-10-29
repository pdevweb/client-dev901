System.register(["./application.be13c.js"], function (_export, _context) {
  "use strict";

  var Application, canvas, $p, bcr, timer, percentJd, application;
  // 是否加载执行完成
  function setLoadingDisplay() {
    console.log('Engine is initialized');

    // 创建定时器
    timer = setInterval(function () {
      // 定时器的回调函数，这里可以执行你的逻辑
      if (percentJd < 70) {
        percentJd = percentJd + 1;
        onProgress(percentJd);
      } else {
        clearInterval(timer);
      }
    }, 250);
    cc.director.once(cc.Director.EVENT_AFTER_SCENE_LAUNCH, function () {
      // 在场景加载完成后，检查并关闭定时器
      if (timer) {
        clearInterval(timer); // 关闭定时器
        console.log("定时器已关闭 percentJd = ", percentJd);
      }
      console.log('game run over');
      var progressBar = splash.querySelector('.progress-bar span');
      if (progressBar) {
        var percentageString = progressBar.style.width; // 获取百分比字符串，例如 "50%"
        var percentageInt = parseInt(percentageString); // 将百分比字符串转换为整数
        console.log("html current percent = ", percentageInt);
      }
    });
  }
  function onProgress(percent) {
    var progressBar = splash.querySelector('.progress-bar span');
    if (progressBar) {
      progressBar.style.width = percent + '%';
      console.log("percent = ", percent);
    }
  }
  function topLevelImport(url) {
    return System["import"](url);
  }
  return {
    setters: [function (_applicationJs) {
      Application = _applicationJs.Application;
    }],
    execute: function () {
      canvas = document.getElementById('GameCanvas');
      $p = canvas.parentElement;
      bcr = $p.getBoundingClientRect();
      canvas.width = bcr.width;
      canvas.height = bcr.height;
      percentJd = 1;
      application = new Application();
      topLevelImport('cc').then(function (engine) {
        //监听
        setLoadingDisplay();
        console.log('application init');
        return application.init(engine);
      }).then(function () {
        console.log('application start');
        return application.start();
      })["catch"](function (err) {
        console.error(err);
      });
    }
  };
});