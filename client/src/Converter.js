export default class Converter {
    constructor(rates) {
        this.rates = rates;
    }

    convert(text) {
        const words = text.split(' ');
        const fromAmount = words[0];
        const fromCcy = words[1].toUpperCase();
        const toCcy = words[3].toUpperCase();

        const fromUsd = (fromCcy === 'USD') ?
              fromAmount : fromAmount / this.rates[fromCcy];
        const toAmount = (toCcy === 'USD') ?
              fromUsd : fromUsd * this.rates[toCcy];

        return {fromAmount: fromAmount, fromCcy: fromCcy,
                toAmount: toAmount, toCcy: toCcy};
    }

}
