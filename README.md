
# uri-tag

[![npm](https://img.shields.io/npm/v/uri-tag.svg)](https://www.npmjs.com/package/uri-tag)
[![Travis](https://img.shields.io/travis/mkrause/uri-tag.svg)](https://travis-ci.org/mkrause/uri-tag)

A [template literal tag](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) to encode URI components.

```js
import uri from 'uri-tag';

const query = 'query with special chars ! ? foo=bar %';
const endpoint = uri`https://example.com/api/users?name=${query}`;

// endpoint === 'https://example.com/api/users?name=query%20with%20special%20chars%20!%20%3F%20foo%3Dbar%20%25'
```

To bypass encoding for a specific component, use `uri.raw`:

```js
const apiBase = 'https://example.com/api/v1';
const query = 'foo/bar';
const endpoint = uri`${uri.raw(apiBase)}/users?name=${query}`;

// endpoint === 'https://example.com/api/v1/users?name=foo%2Fbar'
```


## Related packages

Packages which provide similar functionality:

* [url-escape-tag](https://www.npmjs.com/package/url-escape-tag): Relies on NodeJS `querystring` module (requires a polyfill for browser usage); doesn't support a method to pass `raw` components.
* [encody](https://www.npmjs.com/package/encody): Doesn't support a method to pass `raw` components.
* [encodeuricomponent-tag](https://www.npmjs.com/package/encodeuricomponent-tag): Doesn't support a method to pass `raw` components.
* [url-tagged-template](https://www.npmjs.com/package/url-tagged-template): Different functionality, this package parses URLs to their components rather than returning a URL string.
