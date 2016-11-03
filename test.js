const test = require("prova")
const urls = require("./")

test('clean', function (t) {
  t.plan(9)
  t.equal(urls.clean('http://yolo.com'), 'yolo.com')
  t.equal(urls.clean('https://yolo.com'), 'yolo.com')
  t.equal(urls.clean('https://yolo.com#'), 'yolo.com')
  t.equal(urls.clean('https://yolo.com/'), 'yolo.com')
  t.equal(urls.clean('https://yolo.com/yo/lo?'), 'yolo.com/yo/lo')
  t.equal(urls.clean('https://yolo.com/yo/lo#'), 'yolo.com/yo/lo')
  t.equal(urls.clean('https://yolo.com/yo/lo/#?'), 'yolo.com/yo/lo')
  t.equal(urls.clean('https://yolo.com/yo/lo?foo'), 'yolo.com/yo/lo?foo')
  t.equal(urls.clean('https://yolo.com/yo/lo#bar'), 'yolo.com/yo/lo#bar')
})

test('page', function (t) {
  t.plan(1)
  t.equal(urls.page('https://yolo.com/yo/lo#bar'), 'yolo.com/yo/lo')
})

test('hostname', function (t) {
  t.plan(2)
  t.equal(urls.hostname('http://www.yo.lo.co.uk'), 'yo.lo.co.uk')
  t.equal(urls.hostname('foo.com/yolo'), 'foo.com')
})

test('protocol', function (t) {
  t.plan(3)
  t.equal(urls.protocol('http://yo.lo'), 'http')
  t.equal(urls.protocol('https://yo.lo'), 'https')
  t.equal(urls.protocol('yo.lo'), 'http')
})

test('normalize', function (t) {
  t.plan(3)
  t.equal(urls.normalize('yo.lo'), 'http://yo.lo')
  t.equal(urls.normalize('yo lo'), 'https://google.com/search?q=yo%20lo')
  t.equal(urls.normalize(''), '')
})

test('isSearchQuery', function (t) {
  t.plan(5)
  t.equal(urls.isSearchQuery('http://localhost:1234'), false)
  t.equal(urls.isSearchQuery('localhost:1234'), false)
  t.equal(urls.isSearchQuery('yolo'), true)
  t.equal(urls.isSearchQuery('yo lo'), true)
  t.equal(urls.isSearchQuery('yolo.com'), false)
})

test('isURL', function (t) {
  t.plan(5)
  t.equal(urls.isURL('http://localhost:1234'), true)
  t.equal(urls.isURL('localhost:1234'), true)
  t.equal(urls.isURL('yolo'), false)
  t.equal(urls.isURL('yo lo'), false)
  t.equal(urls.isURL('yolo.com'), true)
})
