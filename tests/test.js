
import { expect } from 'chai';

import uri from '../src/index.js';


describe('uri-tag', () => {
    it('should return the template unmodified if no substitutions', () => {
        expect(uri``).to.equal('');
        expect(uri`http://example.com`).to.equal('http://example.com');
    });
    
    it('should interpolate strings by URI encoding', () => {
        expect(uri`http://example.com/${'foo&bar=baz%'}`).to.equal('http://example.com/foo%26bar%3Dbaz%25');
    });
    
    it('should interpolate numbers by URI encoding of their string representation', () => {
        expect(uri`http://example.com/${42}`).to.equal('http://example.com/42');
        expect(uri`http://example.com/${-10}`).to.equal('http://example.com/-10');
        expect(uri`http://example.com/${+0}`).to.equal('http://example.com/0');
        expect(uri`http://example.com/${-0}`).to.equal('http://example.com/0');
        expect(() => uri`http://example.com/${NaN}`).to.throw(TypeError);
        expect(() => uri`http://example.com/${Infinity}`).to.throw(TypeError);
        expect(() => uri`http://example.com/${-Infinity}`).to.throw(TypeError);
    });
    
    it('should support uri.raw to bypass encoding', () => {
        expect(uri`http://example.com/${uri.raw('some/path')}/${'&'}`).to.equal('http://example.com/some/path/%26');
    });
});
