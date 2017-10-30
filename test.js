const test = require("prova")
const urls = require("./")

test('clean', function (t) {
  t.plan(14)
  t.equal(urls.clean('http://yolo.com'), 'yolo.com')
  t.equal(urls.clean('https://yolo.com'), 'yolo.com')
  t.equal(urls.clean('https://yolo.com#'), 'yolo.com')
  t.equal(urls.clean('https://yolo.com/'), 'yolo.com')
  t.equal(urls.clean('https://yolo.com/yo/lo?'), 'yolo.com/yo/lo')
  t.equal(urls.clean('https://yolo.com/yo/lo#'), 'yolo.com/yo/lo')
  t.equal(urls.clean('https://yolo.com/yo/lo/#?'), 'yolo.com/yo/lo')
  t.equal(urls.clean('https://yolo.com/yo/lo/?foo'), 'yolo.com/yo/lo?foo')
  t.equal(urls.clean('https://yolo.com/yo/lo#bar'), 'yolo.com/yo/lo')
  t.equal(urls.clean('postgres://use-r:p_as-s@host.com:5432/path?k=v#f'), 'host.com:5432/path?k=v')
  t.equal(urls.clean('http://yolo.com/blog/?utm_content=bufferc60dd&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer'), 'yolo.com/blog')
  t.equal(urls.clean('http://yolo.com/blog/?utm_content=bufferc60dd&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer&foo=bar'), 'yolo.com/blog?foo=bar')
  t.equal(urls.clean('http://yolo.com/blog/?span=eggs&utm_content=bufferc60dd&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer&ref=asd&reffoo=bar'), 'yolo.com/blog?span=eggs&reffoo=bar')
  t.equal(urls.clean('http://azer.bike/photography/#foobar3'), 'azer.bike/photography')
})

test('page', function (t) {
  t.plan(2)
  t.equal(urls.page('https://yolo.com/yo/lo#bar'), 'yolo.com/yo/lo')
  t.equal(urls.page('https://yolo.com/?#bar'), 'yolo.com')
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
