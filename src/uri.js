
// Utility: generic builder for template literal tags, using `encode` for each substitution
const createTag = encode => (stringParts, ...substitutions) =>
    substitutions.reduce(
        (prev, cur, i) => prev + encode(cur) + stringParts[i + 1],
        stringParts[0]
    );


export const rawSymbol = Symbol('uri.raw');

const representAsString = value => {
    if (value === undefined) {
        throw new TypeError('Cannot encode URI component, given `undefined`');
    } else if (typeof value === 'string') {
        return value;
    } else if (typeof value === 'number') {
        if (Number.isNaN(value)) {
            throw new TypeError('Cannot encode URI component, given NaN');
        } else if (!Number.isFinite(value)) {
            throw new TypeError(`Cannot encode URI component, given ${String(value)}`);
        }
        
        return String(value);
    } else if (typeof value === 'bigint') {
        return String(value);
    } else {
        throw new TypeError(`Cannot encode URI component, given value of unsupported type: ${typeof value}`);
    }
};

const encodeComponent = value => {
    // Sanity check: make sure we have `encodeURIComponent` (available in browsers, Node)
    if (typeof encodeURIComponent !== 'function') {
        throw new TypeError(`Missing encodeURIComponent`);
    }
    
    // RFC 3986 compliant URI encoding
    // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
    return encodeURIComponent(value)
        .replace(/[!'()*]/g, c => '%' + c.charCodeAt(0).toString(16).toUpperCase());
};

const encode = value => {
    if (typeof value === 'object' && value !== null && rawSymbol in value) {
        return representAsString(value[rawSymbol]);
    }
    
    const valueAsString = representAsString(value);
    
    return encodeComponent(valueAsString);
};

export const raw = value => ({ [rawSymbol]: value });

const uri = createTag(encode);
uri.raw = raw;

export default uri;
