
import { expect } from 'chai';

import uri from '../src/uri.js';


describe('uri-tag', () => {
    it('should return the template unmodified if no substitutions', () => {
        expect(uri``).to.equal('');
        expect(uri`http://example.com`).to.equal('http://example.com');
    });
    
    it('should fail to encode substitutions of unsupported types', () => {
        [undefined, null, true, false, {}, [], () => {}].forEach(value => {
            expect(() => uri`http://example.com/${value}`).to.throw(/Cannot encode URI component/);
        });
    });
    
    it('should interpolate strings by URI encoding', () => {
        expect(uri`http://example.com/${'foo&bar=baz%'}`).to.equal('http://example.com/foo%26bar%3Dbaz%25');
    });
    
    it('should be RFC 3986 compliant', () => {
        // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
        
        const set1 = `;,/?:@&=+$`;  // Reserved characters
        const set2 = `-_.~`;        // Unescaped characters
        const set3 = `#`;           // Number sign
        const set4 = `ABC abc 123`; // Alphanumeric characters + space
        const set5 = `!'()*`;       // Additional escaped characters in RFC 3986
        
        expect(uri`${set1}`).to.equal(`%3B%2C%2F%3F%3A%40%26%3D%2B%24`);
        expect(uri`${set2}`).to.equal(`-_.~`);
        expect(uri`${set3}`).to.equal(`%23`);
        expect(uri`${set4}`).to.equal(`ABC%20abc%20123`);
        expect(uri`${set5}`).to.equal(`%21%27%28%29%2A`);
    });
    
    it('should interpolate numbers by URI encoding of their string representation', () => {
        expect(uri`http://example.com/${42}`).to.equal('http://example.com/42');
        expect(uri`http://example.com/${-10}`).to.equal('http://example.com/-10');
        expect(uri`http://example.com/${-0.5}`).to.equal('http://example.com/-0.5');
        expect(uri`http://example.com/${+0}`).to.equal('http://example.com/0');
        expect(uri`http://example.com/${-0}`).to.equal('http://example.com/0');
        expect(() => uri`http://example.com/${NaN}`).to.throw(TypeError);
        expect(() => uri`http://example.com/${Infinity}`).to.throw(TypeError);
        expect(() => uri`http://example.com/${-Infinity}`).to.throw(TypeError);
    });
    
    it('should interpolate bigint values by URI encoding of their string representation', () => {
        expect(uri`http://example.com/${42n}`).to.equal('http://example.com/42');
        expect(uri`http://example.com/${-10n}`).to.equal('http://example.com/-10');
        expect(uri`http://example.com/${0n}`).to.equal('http://example.com/0');
        expect(uri`http://example.com/${-0n}`).to.equal('http://example.com/0');
    });
    
    it('should support `uri.raw` to bypass encoding', () => {
        expect(uri`http://example.com/${uri.raw('some/path')}/${'&'}`).to.equal('http://example.com/some/path/%26');
    });
});
