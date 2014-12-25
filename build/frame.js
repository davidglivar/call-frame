"use strict";

var delta = 0, frameCount = 0, interval = 0, now = null, rid = null, startedAt = null, stopped = true, then = null;

var frame = {
  fps: 0,

  framerate: 59,

  stack: [],

  add: function (func, scope) {
    if (typeof func !== "function") {
      throw new TypeError("Expected a function, got " + typeof func);
    }
    if (this.exists(func) !== false) return false;
    scope = scope || this;
    this.stack.push({ func: func, scope: scope });
    return true;
  },

  clearInterval: function (id) {},

  clearTimeout: function (id) {},

  exists: function (func) {
    for (var i = 0, l = this.stack.length; i < l; i++) {
      if (this.stack[i].func === func) return i;
    }
    return false;
  },

  remove: function (func) {
    if (typeof func !== "function") {
      throw new TypeError("Expected a function, got " + typeof func);
    }
    var index = this.exists(func);
    if (index === false) return false;
    this.stack.splice(index, 1);
    return true;
  },

  setInterval: function (func, int) {},

  setTimeout: function (func, delay) {},

  start: function () {
    var _this = this;
    if (!stopped) return false;
    stopped = false;
    then = startedAt = window.performance.now();
    interval = 1000 / this.framerate;
    rid = window.requestAnimationFrame(function (time) {
      return _this.update(time);
    });
    return true;
  },

  stop: function () {
    if (stopped) return false;
    stopped = true;
    window.cancelAnimationFrame(rid);
    return true;
  },

  update: function (time) {
    var _this2 = this;
    if (stopped) return;

    window.requestAnimationFrame(function (t) {
      return _this2.update(t);
    });

    now = time;
    delta = now - then;
    if (delta >= interval) {
      then = now - (delta % interval);
      this.fps = Math.round(1000 / ((now - startedAt) / ++frameCount) * 100) / 100;
      for (var _iterator = this.stack[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
        var item = _step.value;
        item.func.call(item.scope);
      }
    }
  }

};

exports["default"] = frame;