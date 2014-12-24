"use strict";

var delta = 0, frameCount = 0, interval = 0, now = null, rid = null, stack = [], startedAt = null, stopped = true, then = null;

var frame = {
  fps: 0,

  framerate: 59,

  add: function (func) {},

  clearInterval: function (id) {},

  clearTimeout: function (id) {},

  exists: function (func) {},

  remove: function (func) {},

  setInterval: function (func, int) {},

  setTimeout: function (func, delay) {},

  start: function () {},

  stop: function () {},

  update: function () {}

};

exports["default"] = frame;