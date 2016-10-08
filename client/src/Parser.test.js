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

it('extracts from amount if no whitespace after', () => {
    expect(Parser("100JPY to GBP").fromAmount).toBe(100);
});

it('extracts complex from amount if no whitespace after', () => {
    expect(Parser("-100.23GBP to JPY").fromAmount).toBe(-100.23);
});

it('extracts from ccy if no whitespace before', () => {
    expect(Parser("100JPY to GBP").fromCcy).toBe("JPY");
});

it('extracts from amount if before from ccy', () => {
    expect(Parser("JPY100 to GBP").fromAmount).toBe(100);
});

it('extracts from ccy if it is a symbol', () => {
    expect(Parser("$100 to GBP").fromCcy).toBe("USD");
});

it('extracts to ccy if it is a symbol', () => {
    expect(Parser("USD 100 to £").toCcy).toBe("GBP");
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

it('errors if no from amount provided', () => {
    expect(Parser("gbp usd").error).toBeDefined();
});

it('errors if no from amount provided but three words', () => {
    expect(Parser("gbp jpy usd").error).toBeDefined();
});

it('errors if a bad number is provided', () => {
    expect(Parser("100.23.45 gbp to usd").error).toBeDefined();
});

it('errors if two numbers are provided', () => {
    expect(Parser("100 200 gbp to usd").error).toBeDefined();
});

it('errors if a number is provided instead of a to ccy', () => {
    expect(Parser("100 gbp to 200").error).toBeDefined();
});

it('errors if from currency cannot be an ISO currency', () => {
    expect(Parser("@100 to usd").error).toBeDefined();
});

it('errors if to currency cannot be an ISO currency', () => {
    expect(Parser("100 USD to XXXXXX").error).toBeDefined();
});
