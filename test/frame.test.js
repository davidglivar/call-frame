var test = require('tape')
  , frame = require('../index')
  , sinon = require('sinon');

function before() {
  frame.stop();
  frame.stack = [];
}

function pending(t) {
  t.fail('PENDING');
  t.end();
}

test('add', function (t) {
  t.plan(4);

  t.ok('add' in frame, 'exists');

  t.test('throws a TypeError if argument is not a function', function (st) {
    var func = function () { frame.add({}); };
    before();
    st.plan(1);
    st.throws(func, /Expected a function/, 'throws error');
  });

  t.test('returns false if function already exists in call stack', function (st) {
    var func = function () {};
    before();
    st.plan(1);
    frame.add(func);
    st.equal(frame.add(func), false, 'returns false');
  });

  t.test('returns true if function has been added to call stack', function (st) {
    var func = function () {};
    before();
    st.plan(3);
    st.equal(frame.stack.length, 0, 'is empty');
    st.equal(frame.add(func), true, 'returns true');
    st.equal(frame.stack.length, 1, 'was added');
  });
});

test('clearInterval', pending);

test('clearTimeout', pending);

test('exists', function (t) {
  t.plan(3);

  t.ok('exists' in frame, 'exists');

  t.test('returns false if function is not found in call stack', function (st) {
    var func = function () {};
    before();
    st.plan(3);
    st.equal(frame.exists(func), false, 'function is not found in stack');

    frame.add(func);
    st.equal(frame.exists(func), 0, 'function is found in stack');
    st.equal(frame.exists(function () {}), false, 'new function is not found');
  });

  t.test('returns true if function is found in call stack', function (st) {
    var func = function () {};
    before();
    st.plan(1);
    frame.add(func);
    st.equal(frame.exists(func), 0, 'function is found at index 0');
  });
});

test('remove', function (t) {
  t.plan(4);

  t.ok('remove' in frame, 'exists');

  t.test('throws a TypeError if argument is not a function', function (st) {
    var func = function () { frame.remove({}); };
    st.plan(1);
    st.throws(func, /Expected a function/, 'throws error');
  });

  t.test('returns false if function is not in the call stack', function (st) {
    var func = function () {};
    before();
    st.plan(1);
    st.equal(frame.remove(func), false, 'returns false');
  });

  t.test('returns true if function is found and removed from call stack', function (st) {
    var func = function () {}; 
    before();
    st.plan(3);
    frame.add(func);
    st.equal(frame.stack.length, 1, 'was added');
    st.equal(frame.remove(func), true, 'returns true');
    st.equal(frame.stack.length, 0, 'was removed');
  });
});

test('setInterval', pending);

test('setTimeout', pending);

test('start', function (t) {
  t.plan(3);

  t.ok('start' in frame, 'exists');

  t.test('returns false if frame is not stopped', function (st) {
    before();
    st.plan(1);
    frame.start();
    st.equal(frame.start(), false, 'returns false');
  });

  t.test('returns true if frame started successfully', function (st) {
    before();
    st.plan(1);
    st.equal(frame.start(), true, 'returns true');
  });
});

test('stop', function (t) {
  t.plan(3);

  t.ok('stop' in frame, 'exists');

  t.test('returns false if frame is stopped', function (st) {
    before();
    st.plan(1);
    st.equal(frame.stop(), false, 'returns false');
  });

  t.test('returns true if frame stopped successfully', function (st) {
    before();
    st.plan(1);
    frame.start();
    st.equal(frame.stop(), true, 'returns true');
  });
});

test('update', function (t) {
  t.ok('update' in frame, 'exists');
  t.test('does not run stack if stopped', pending);
  t.test('runs stack if not stopped', pending);
  t.test('calculates fps', pending);
});
