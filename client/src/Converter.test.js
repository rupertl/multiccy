import Converter from './Converter';

const converter = new Converter({USD: 1, EUR: 0.90, JPY: 101, GBP: 0.81});

it('converts to and from the same currency', () => {
    expect(converter.convert("100 JPY to JPY").toAmount).toBe(100);
});

it('converts to and from the same currency for USD', () => {
    expect(converter.convert("100 USD to USD").toAmount).toBe(100);
});

it('converts from USD to EUR', () => {
    expect(converter.convert("100 USD to EUR").toAmount).toBe(90);
});

it('converts from EUR to USD', () => {
    expect(converter.convert("90 EUR to USD").toAmount).toBe(100);
});

it('converts from EUR to JPY', () => {
    expect(converter.convert("90 EUR to JPY").toAmount).toBe(10100);
});

it('converts from JPY to EUR', () => {
    expect(converter.convert("10100 JPY to EUR").toAmount).toBe(90);
});

it('converts zero amount to zero', () => {
    expect(converter.convert("0 USD to JPY").toAmount).toBe(0);
});

it('converts negative amounts', () => {
    expect(converter.convert("-10 USD to JPY").toAmount).toBe(-1010);
});

it('errors if no amount provided', () => {
    expect(converter.convert("gbp to usd").error).toBeDefined();
});

it('errors if no such currency provided', () => {
    expect(converter.convert("100 gbp to xxx").error).toBeDefined();
});
