import Formatter from './Formatter';

it('formats correctly', () => {
    expect(Formatter({fromAmount: 123.45, fromCcy: "USD",
                    toAmount: 456.78, toCcy: "GBP"}))
        .toBe("USD 123.45 = GBP 456.78");
});

it('rounds decimals correctly', () => {
    expect(Formatter({fromAmount: 123.459, fromCcy: "USD",
                    toAmount: 456.78001, toCcy: "GBP"}))
        .toBe("USD 123.46 = GBP 456.78");
});

it('sets precision to zero if no decimals', () => {
    expect(Formatter({fromAmount: 123, fromCcy: "USD",
                    toAmount: 456.00, toCcy: "GBP"}))
        .toBe("USD 123 = GBP 456");
});

it('sets precision to zero for special currencies', () => {
    expect(Formatter({fromAmount: 123.45, fromCcy: "JPY",
                    toAmount: 456.10, toCcy: "KRW"}))
        .toBe("JPY 123 = KRW 456");
});

it('returns empty if missing data', () => {
    expect(Formatter({})).toBe("");
});
