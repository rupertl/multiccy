export default class Converter {
    constructor(rates) {
        this.rates = rates;
    }

    convert(text) {
        const words = text.trim().split(/\s+/);
        const fromAmount = Number(words[0]);
        const fromCcy = words[1].toUpperCase();
        const toCcy = words[3].toUpperCase();

        const fromUsd = (fromCcy === 'USD') ?
              fromAmount : fromAmount / this.rates[fromCcy];
        const toAmount = (toCcy === 'USD') ?
              fromUsd : fromUsd * this.rates[toCcy];

        return {fromAmount, fromCcy, toAmount, toCcy};
    }

}
