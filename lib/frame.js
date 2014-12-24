var delta = 0
  , frameCount = 0
  , interval = 0
  , now = null
  , rid = null
  , stack = []
  , startedAt = null
  , stopped = true
  , then = null;

var frame = {
  
  fps: 0

, framerate: 59

, add(func, scope) {
    if (typeof func !== 'function') {
      throw new TypeError('Expected a function, got ' + typeof func);
    }
    if (this.exists(func)) return false;
    func.__scope = scope || func;
    stack.push(func);
    return true;
  }

, clearInterval(id) {

  }

, clearTimeout(id) {

  }

, exists(func) {
    return stack.indexOf(func) > -1;
  }

, remove(func) {
    if (typeof func !== 'function') {
      throw new TypeError('Expected a function, got ' + typeof func);
    }
    if (!this.exists(func)) return false;
    stack.splice(stack.indexOf(func), 1);
    return true;
  }

, setInterval(func, int) {

  }

, setTimeout(func, delay) {

  }

, start() {
    if (!stopped) return false;
    stopped = false;
    then = started = window.performance.now();
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
      this.fps = Math.round(1000 / ((now - started) / ++frameCount) * 100) / 100;
      for (var func of stack) {
        func.call(func.__scope);
      }
    }
  }

};

export default frame;
