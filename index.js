const parse = require("url").parse

module.exports = {
  clean,
  page,
  protocol,
  hostname,
  normalize,
  isSearchQuery,
  isURL
}

function protocol (url) {
  const match = url.match(/(^\w+):\/\//)
  if (match) {
    return match[1]
  }

  return 'http'
}

function clean (url) {
  return cleanUTM(url)
    .trim()
    .replace(/^\w+:\/\//, '')
    .replace(/^[\w-_]+:[\w-_]+@/, '')
    .replace(/(\/|\?|\&|#)*$/, '')
    .replace(/\/\?/, '?')
    .replace(/^www\./, '')
}

function page (url) {
  return clean(url.replace(/\#.*$/, ''))
}

function hostname (url) {
  return parse(normalize(url)).hostname.replace(/^www\./, '')
}

function normalize (input) {
  if (input.trim().length === 0) return ''

  if (isSearchQuery(input)) {
    return `https://google.com/search?q=${encodeURI(input)}`
  }

  if (!/^\w+:\/\//.test(input)) {
    return `http://${input}`
  }

  return input
}

function isSearchQuery (input) {
  return !isURL(input.trim())
}

function isURL (input) {
  return input.indexOf(' ') === -1 && (/^\w+:\/\//.test(input) || input.indexOf('.') > 0 || input.indexOf(':') > 0)
}

function cleanUTM (url) {
  return url
    .replace(/(\?|\&)utm_[\w]+\=[^\&]+/g, '$1')
    .replace(/(\?|\&)ref\=[^\&]+\&?/, '$1')
    .replace(/[\&]{2,}/,'&')
    .replace('?&', '?')
}
