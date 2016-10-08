import Parser from './Parser';

it('returns from/to amount and ccy', () => {
    expect(Object.keys(Parser("100 USD GBP")).sort())
        .toEqual(['fromAmount', 'fromCcy', 'toCcy']);
});

it('ignores stopwords like to', () => {
    expect(Object.keys(Parser("100 USD to GBP")).sort())
        .toEqual(['fromAmount', 'fromCcy', 'toCcy']);
});

it('extracts from amount', () => {
    expect(Parser("100 USD to GBP").fromAmount).toBe(100);
});

it('extracts from ccy', () => {
    expect(Parser("100 USD to GBP").fromCcy).toBe("USD");
});

it('extracts from ccy if lower case', () => {
    expect(Parser("100 jpy to gbp").fromCcy).toBe("JPY");
});

it('extracts from ccy if extra whitespace', () => {
    expect(Parser("  100   JPY  to  GBP   ").fromCcy).toBe("JPY");
});

it('errors if nothing provided', () => {
    expect(Parser().error).toBeDefined();
});

it('errors if not enough paramaters provided', () => {
    expect(Parser("").error).toBeDefined();
});

it('errors if no amount provided', () => {
    expect(Parser("gbp to usd").error).toBeDefined();
});

it('errors if no from ccy provided', () => {
    expect(Parser("100 to usd").error).toBeDefined();
});

it('errors if no to ccy provided', () => {
    expect(Parser("100 gbp to").error).toBeDefined();
});
