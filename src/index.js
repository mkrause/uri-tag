
// Generic builder for template literal tags
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
        if (isNaN(value)) {
            throw new TypeError('Cannot encode URI component, given NaN');
        } else if (!Number.isFinite(value)) {
            throw new TypeError(`Cannot encode URI component, given ${String(value)}`);
        }
        
        return String(value);
    } else {
        throw new TypeError('Cannot encode URI component, given value of unknown type');
    }
};

const encode = value => {
    if (typeof value === 'object' && value !== null && rawSymbol in value) {
        return representAsString(value[rawSymbol]);
    }
    
    const valueAsString = representAsString(value);
    
    return encodeURIComponent(valueAsString);
};

export const raw = value => ({ [rawSymbol]: value });

const uri = createTag(encode);
uri.raw = raw;

export default uri;
