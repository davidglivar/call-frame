var test = require('tape')
  , frame = require('../index')
  , sinon = require('sinon');

function pending(t) {
  t.fail('PENDING');
  t.end();
}

test('add', function (t) {
  t.plan(4);
  t.ok('add' in frame, 'exists');
  t.test('throws a TypeError if argument is not a function', pending);
  t.test('returns false if function already exists in call stack', pending);
  t.test('returns true if function has been added to call stack', pending);
});

test('clearInterval', pending);

test('clearTimeout', pending);

test('exists', function (t) {
  t.plan(3);
  t.ok('exists' in frame, 'exists');
  t.test('returns false if function is not found in call stack', pending);
  t.test('returns true if function is found in call stack', pending);
});

test('remove', function (t) {
  t.plan(4);
  t.ok('remove' in frame, 'exists');
  t.test('throws a TypeError if argument is not a function', pending);
  t.test('returns false if function is not in the call stack', pending);
  t.test('returns true if function is found and removed from call stack', pending);
});

test('setInterval', pending);

test('setTimeout', pending);

test('start', function (t) {
  t.plan(3);
  t.ok('start' in frame, 'exists');
  t.test('returns false if frame is not stopped', pending);
  t.test('returns true if frame started successfully', pending);
});

test('stop', function (t) {
  t.plan(3);
  t.ok('stop' in frame, 'exists');
  t.test('returns false if frame is stopped', pending);
  t.test('returns true if frame stopped successfully', pending);
});

test('update', function (t) {
  t.ok('update' in frame, 'exists');
  t.test('does not run stack if stopped', pending);
  t.test('runs stack if not stopped', pending);
  t.test('calculates fps', pending);
});
