
# Changelog

- v2.0
  - Upgrade `uri-tag` to use modern Node.js 14+ features.
  - Convert package to ES modules by default using `module: "type"`.
  - Use `exports` in `package.json` rather than `main`. This is technically a breaking change due to the change
    in which subpaths can be imported.
  - Drop support for Node 12.
  - Upgrade to package-lock v2 format.

- v1.4
  - Drop support for Node v10.

- v1.3
  - Update URI encoding to be RFC 3986 compliant

- v1.2
  - Remove support for Node v8, add tests for Node v14.

- v1.1
  - Remove core-js polyfills to improve file size.
  - Add `tsd` to test TypeScript declaration.

- v1.0
  - First stable release.
  - Adds support for TypeScript.

- v0
  - Initial version.
