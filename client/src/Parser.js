// Class to take a request string and extract amount and from/to currencies

const stopWords = new Set(['TO', 'INTO']);

export default function parse(text) {
    if (typeof text !== 'string') {
        return {error: "Please provide something to convert"};
    }

    const words = text
          .trim()
          .split(/\s+/)
          .map(word => word.toUpperCase())
          .filter(word => !stopWords.has(word));

    if (words.length < 3) {
        return {error: "Please provide an amount and two currencies"};
    }
    const fromAmount = Number(words[0]);
    const fromCcy = words[1];
    const toCcy = words[2];

    return {fromAmount, fromCcy, toCcy};
}
