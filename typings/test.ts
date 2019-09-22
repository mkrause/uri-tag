///<reference lib="es2015"/>
///<reference path="./uri-tag.d.ts"/>

// Test module to test TypeScript declaration file.
// Usage:
//   $ tsc --noEmit --strict --esModuleInterop typings/test.ts
// See: https://stackoverflow.com/questions/49296151/how-to-write-tests-for-typescript-typing-definition


import uri, { rawSymbol, raw } from 'uri-tag';


// None of the following should produce any type errors

const test1 : string = uri``;

const test2 : string = uri`/foo`;

const test3 : string = uri`/foo/${'bar'}`;

const test4 : string = uri`/foo/${42}`;

const test5 : string = uri`/foo?${uri.raw('bar&baz')}`;
