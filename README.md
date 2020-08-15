
# uri-tag

[![npm](https://img.shields.io/npm/v/uri-tag.svg?style=flat-square)](https://www.npmjs.com/package/uri-tag)
[![Travis](https://img.shields.io/travis/mkrause/uri-tag.svg?style=flat-square)](https://travis-ci.org/mkrause/uri-tag)
![MIT](https://img.shields.io/npm/l/uri-tag?style=flat-square)
![TypeScript](https://img.shields.io/badge/-TypeScript-blue.svg?style=flat-square)

A [template literal tag](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) to encode URI components. Allows you to to build a URI string, where any expressions will be safely encoded.

```js
import uri from 'uri-tag';

const name = getName(); // Arbitrary user input
const status = getStatus(); // Arbitrary user input

const myUri = uri`https://example.com/api/users?name=${name}&status=${status}`;
```

Uses [RFC 3986](https://tools.ietf.org/html/rfc3986) compliant URI encoding to encode any unsafe character sequences to their escaped representations:

```js
const query = 'query with special chars ! ? foo=bar %';
const endpoint = uri`/api/search?q=${query}`;

// endpoint === '/api/search?q=query%20with%20special%20chars%20%21%20%3F%20foo%3Dbar%20%25'
```

To bypass encoding for a specific component, you can use `uri.raw`:

```js
const apiBase = 'https://example.com/api/v1';
const query = 'foo/bar';
const endpoint = uri`${uri.raw(apiBase)}/users?name=${query}`;

// endpoint === 'https://example.com/api/v1/users?name=foo%2Fbar'
```

`uri.raw` uses a unique [symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) under the hood, so that only code with access to the `uri-tag` module can pass in a raw template variable. Any user input from an external source (so, strings, JSON objects, etc.) will not be able to access this symbol.


## Types

This package includes definitions for TypeScript.


## Similar packages

* [encody](https://www.npmjs.com/package/encody)
* [encodeuricomponent-tag](https://www.npmjs.com/package/encodeuricomponent-tag)
* [url-escape-tag](https://www.npmjs.com/package/url-escape-tag) (Relies on NodeJS `querystring` module, requires a polyfill for browser usage.)
* [url-tagged-template](https://www.npmjs.com/package/url-tagged-template) (Different goals, parses URLs to their components rather than returning a URL string.)
