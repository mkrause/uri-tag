
/*
Test the public interface of this package, simulating a CommonJS consumer.

Note: this is intended to run in Node.js directly without transpiling, so only use features of Node that are supported
by all supported Node.js versions.
*/

const assert = require('node:assert');

// Test: importing a CJS package from a CJS context
const uri = require('uri-tag');
//console.log(uri);
assert(typeof uri.default === 'function');
assert(typeof uri.raw === 'function');
assert(typeof uri.rawSymbol === 'symbol');


// Test: importing an ESM package from a CJS context
import('uri-tag')
  .then((uri) => {
    assert(typeof uri.default === 'function');
    assert(typeof uri.raw === 'function');
    assert(typeof uri.rawSymbol === 'symbol');
  });
