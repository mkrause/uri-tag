
// See:
// https://arethetypeswrong.github.io/?p=uri-tag

// If we configured our project wrong the following will give a TypeScript error:
// "The current file is a CommonJS module whose imports will produce 'require' calls [...]"
import uri, { raw, rawSymbol } from 'uri-tag';
