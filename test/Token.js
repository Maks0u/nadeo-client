import assert from 'assert';
import Token from '../dist/Token.js';

describe('Token', () => {
    const emptyToken = new Token();
    const validToken = new Token(
        `.${Buffer.from('{ "exp": 2000000000 }').toString('base64')}.`,
        `.${Buffer.from('{ "exp": 2000000000 }').toString('base64')}.`
    );
    const expiredToken = new Token(
        `.${Buffer.from('{ "exp": 1690582000 }').toString('base64')}.`,
        `.${Buffer.from('{ "exp": 2000000000 }').toString('base64')}.`
    );
    const obsoleteToken = new Token(
        `.${Buffer.from('{ "exp": 1690582000 }').toString('base64')}.`,
        `.${Buffer.from('{ "exp": 1690582000 }').toString('base64')}.`
    );

    describe('isExpired', () => {
        it('empty token should be considered expired', () => {
            assert.ok(emptyToken.isExpired());
        });
        it('valid token should not be considered expired', () => {
            assert.ok(!validToken.isExpired());
        });
        it('expired token should be considered expired', () => {
            assert.ok(expiredToken.isExpired());
        });
        it('obsolete token should be considered expired', () => {
            assert.ok(obsoleteToken.isExpired());
        });
    });
    describe('isObsolete', () => {
        it('empty token should be considered obsolete', () => {
            assert.ok(emptyToken.isObsolete());
        });
        it('valid token should not be considered obsolete', () => {
            assert.ok(!validToken.isObsolete());
        });
        it('expired token should not be considered obsolete', () => {
            assert.ok(!expiredToken.isObsolete());
        });
        it('obsolete token should be considered obsolete', () => {
            assert.ok(obsoleteToken.isObsolete());
        });
    });
});
