// Class to do currency conversions based on text input.

import fx from 'money';
import Parser from './Parser';

// Currency that conversion rates are expressed in.
const BASE_CURRENCY = 'USD';

export default class Converter {
    constructor(rates) {
        fx.base = BASE_CURRENCY;
        fx.rates = rates;
    }

    convert(text) {
        const toConvert = Parser(text);
        if (toConvert.error) {
            return toConvert;
        } else {
            return this.doConversion(toConvert);
        }
    }

    doConversion({fromAmount, fromCcy, toCcy}) {
        try {
            const toAmount = fx(fromAmount).from(fromCcy).to(toCcy);
            return {fromAmount, fromCcy, toAmount, toCcy};
        } catch (e) {
            return {error: "Error converting amount"};
        }
    }

}
