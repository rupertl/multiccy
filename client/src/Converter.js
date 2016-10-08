// Class to do currency conversions based on text input.

import fx from 'money';

// Currency that conversion rates are expressed in.
const BASE_CURRENCY = 'USD';

export default class Converter {
    constructor(rates) {
        fx.base = BASE_CURRENCY;
        fx.rates = rates;
    }

    convert(text) {
        const words = text.trim().split(/\s+/);
        const fromAmount = Number(words[0]);
        const fromCcy = words[1].toUpperCase();
        const toCcy = words[3].toUpperCase();

        try {
            const toAmount = fx(fromAmount).from(fromCcy).to(toCcy);
            return {fromAmount, fromCcy, toAmount, toCcy};
        } catch (e) {
            return {error: e};
        }
    }

}
