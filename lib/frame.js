var delta = 0
  , frameCount = 0
  , interval = 0
  , now = null
  , rid = null
  , startedAt = null
  , stopped = true
  , then = null;

var frame = {
  
  fps: 0

, framerate: 59

, stack: []

, add(func, scope) {
    if (typeof func !== 'function') {
      throw new TypeError('Expected a function, got ' + typeof func);
    }
    if (this.exists(func) !== false) return false;
    scope = scope || this;
    this.stack.push({ func, scope });
    return true;
  }

, clearInterval(id) {

  }

, clearTimeout(id) {

  }

, exists(func) {
    for (var i = 0, l = this.stack.length; i < l; i++) {
      if (this.stack[i].func === func) return i;
    }
    return false;
  }

, remove(func) {
    if (typeof func !== 'function') {
      throw new TypeError('Expected a function, got ' + typeof func);
    }
    var index = this.exists(func);
    if (index === false) return false;
    this.stack.splice(index, 1);
    return true;
  }

, setInterval(func, int) {

  }

, setTimeout(func, delay) {

  }

, start() {
    if (!stopped) return false;
    stopped = false;
    then = startedAt = window.performance.now();
    interval = 1000 / this.framerate;
    rid = window.requestAnimationFrame((time) => this.update(time));
    return true;
  }

, stop() {
    if (stopped) return false;
    stopped = true;
    window.cancelAnimationFrame(rid);
    return true;
  }

, update(time) {
    if (stopped) return;

    window.requestAnimationFrame((t) => this.update(t));

    now = time;
    delta = now - then;
    if (delta >= interval) {
      then = now - (delta % interval);
      this.fps = Math.round(1000 / ((now - startedAt) / ++frameCount) * 100) / 100;
      for (var item of this.stack) {
        item.func.call(item.scope);
      }
    }
  }

};

export default frame;
