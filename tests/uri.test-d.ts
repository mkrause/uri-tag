
// Test module to test TypeScript declaration.
// Usage: `tsd`.

import { expectType, expectError } from 'tsd';

import uri, { rawSymbol, raw } from '../src/uri.js';


expectType<string>(uri``);

expectType<string>(uri`/foo`);

expectType<string>(uri`/foo/${'bar'}`);
expectType<string>(uri`/foo/${42}`);

// Various unaccepted component types
// Note: may need to add `as const` to some of these, due to `expectError` not catching some errors as of v0.13.1 (?):
// https://github.com/SamVerschueren/tsd/commit/ec4ea87f04b0ddf3476d270eb44e17957fd10a67
expectError(expectType<string>(uri`/foo/${undefined}`));
expectError(expectType<string>(uri`/foo/${null}`));
expectError(expectType<string>(uri`/foo/${true}`));
expectError(expectType<string>(uri`/foo/${{ x: 42 }}`));
expectError(expectType<string>(uri`/foo/${[1, 2, 3] as const}`));

// Raw
expectType<string>(uri`/foo?${uri.raw('bar&baz')}`);

// Practical example
const baseUri = 'https://example.com';
const userId = 42;
const query = 'John -Smith ?Doe';
expectType<string>(uri`${uri.raw(baseUri)}/api/users/${userId}?search=${query}`);
