// Class to take a request string and extract amount and from/to currencies

const STOP_WORDS = new Set(['TO', 'INTO']);
const NUMBER_RE = /-*[0-9.]+/;

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

export default function parse(text) {
    if (typeof text !== 'string') {
        return {error: "Please provide something to convert"};
    }

    const tokens = text
          // Make "100USD" or "USD100" separate tokens
          .replace(NUMBER_RE, num => " " + num + " ")
          .trim()
          .split(/\s+/)
          .map(token => token.toUpperCase())
          .filter(token => ! STOP_WORDS.has(token));

    if (tokens.length < 3) {
        return {error: "Please provide an amount and two currencies"};
    }

    const numericTokens = tokens.map(isNumeric);
    if (numericTokens.filter(token => token).length !== 1) {
        return {error: "Please provide one amount and two currencies"};
    }

    const fromAmount = Number(numericTokens[0] ? tokens[0] : tokens[1]);
    const fromCcy = numericTokens[0] ? tokens[1] : tokens[0];
    const toCcy = tokens[2];

    return {fromAmount, fromCcy, toCcy};
}
