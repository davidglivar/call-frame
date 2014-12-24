"use strict";

var delta = 0, frameCount = 0, interval = 0, now = null, rid = null, stack = [], startedAt = null, stopped = true, then = null;

var frame = {
  fps: 0,

  framerate: 59,

  add: function (func, scope) {
    if (typeof func !== "function") {
      throw new TypeError("Expected a function, got " + typeof func);
    }
    if (this.exists(func)) return false;
    func.__scope = scope || func;
    stack.push(func);
    return true;
  },

  clearInterval: function (id) {},

  clearTimeout: function (id) {},

  exists: function (func) {
    return stack.indexOf(func) > -1;
  },

  remove: function (func) {
    if (typeof func !== "function") {
      throw new TypeError("Expected a function, got " + typeof func);
    }
    if (!this.exists(func)) return false;
    stack.splice(stack.indexOf(func), 1);
    return true;
  },

  setInterval: function (func, int) {},

  setTimeout: function (func, delay) {},

  start: function () {
    var _this = this;
    if (!stopped) return false;
    stopped = false;
    then = started = window.performance.now();
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
      this.fps = Math.round(1000 / ((now - started) / ++frameCount) * 100) / 100;
      for (var _iterator = stack[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
        var func = _step.value;
        func.call(func.__scope);
      }
    }
  }

};

exports["default"] = frame;