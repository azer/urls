## urls

URL Library for Kaktus

## Install

```bash
$ npm install kaktus/urls
```

## API

#### .clean

Removes protocol, `www.` and unnecessary characters at the end of the url (if exists).

```js
urls.clean('http://www.yolo.com/?&')
// => yolo.com
```

#### .page

Returns clean page URL (applies `.clean` and also removes hashbang part)

```js
urls.page('http://yolo.com#yo=lo')
// => yolo.com
```

#### .hostname

Returns the hostname

```js
urls.hostname('http://yolo.co.uk')
// => yolo.co.uk
```

#### .protocol

Returns the protocol

```js
urls.hostname('http://yolo.co.uk')
// => http
```

#### .normalize

Makes given any input a valid URL. If given input is not a URL at all, returns a Yolo search URL.

```js
urls.normalize('yolo.com')
// => http://yolo.com

urls.normalize('hello world')
// => https://google.com/search?q=hello%20world
```

#### .isSearchQuery

Returns true if given input is a search query rather than URL

```js
urls.isSearchQuery('hello world')
// => true

urls.isSearchQuery('yolo.com')
// => false
```

#### .isURL

Returns true if given input is a URL

```js
urls.isURL('hello world')
// => false

urls.isURL('yolo.com')
// => true
```
