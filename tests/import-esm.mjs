
/*
Test the public interface of this package, simulating an ESM consumer.

Note: this is intended to run in Node.js directly without transpiling, so only use features of Node that are supported
by all supported Node.js versions.
*/


import assert from 'node:assert';

import uri, { raw, rawSymbol } from 'uri-tag';


// Test: importing an ESM package from an ESM context
//console.log(msg);
assert(typeof uri === 'function');
assert(typeof raw === 'function');
assert(typeof rawSymbol === 'symbol');


// Note: importing a CJS package from an ESM context is not possible
//require('uri-tag');
