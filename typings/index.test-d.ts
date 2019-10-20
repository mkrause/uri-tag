///<reference lib="es2019"/>
///<reference path="./index.d.ts"/>

// Test module to test TypeScript declaration.
// Usage: `tsd`.

import { expectType, expectError } from 'tsd';

import uri, { rawSymbol, raw } from '.';


expectType<string>(uri``);

expectType<string>(uri`/foo`);

expectType<string>(uri`/foo/${'bar'}`);
expectType<string>(uri`/foo/${42}`);

// Various unaccepted component types
expectError(expectType<string>(uri`/foo/${undefined}`));
expectError(expectType<string>(uri`/foo/${null}`));
expectError(expectType<string>(uri`/foo/${true}`));
expectError(expectType<string>(uri`/foo/${{ x: 42 }}`));
expectError(expectType<string>(uri`/foo/${[1, 2, 3]}`));

// Raw
expectType<string>(uri`/foo?${uri.raw('bar&baz')}`);

// Practical example
const baseUri = 'https://example.com';
const userId = 42;
const query = 'John -Smith ?Doe';
expectType<string>(uri`${uri.raw(baseUri)}/api/users/${userId}?search=${query}`);
