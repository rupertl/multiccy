import Converter from './Converter';

/* eslint-disable no-unused-vars */

it('creates a converter object', () => {
    let converter = new Converter({usd: 1});
});

it('returns from/to amount and ccy', () => {
    let converter = new Converter({usd: 1});
    expect(Object.keys(converter.convert("100 USD to USD")).sort())
        .toEqual(['fromAmount', 'fromCcy', 'toAmount', 'toCcy']);
});

it('converts to and from the same currency', () => {
    let converter = new Converter({usd: 1});
    expect(converter.convert("100 USD to USD").toAmount).toBe("100");
});
