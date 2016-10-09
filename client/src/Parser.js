// Class to take a request string and extract amount and from/to currencies

const STOP_WORDS = new Set(['TO', 'INTO']);
const NUMBER_RE = /-*[0-9.]+/;
// List is not comprehensive
const CURRENCY_SYMBOLS = {
    "€": "EUR",
    "£": "GBP",
    "¥": "JPY",
    "₩": "KRW",
    "฿": "THB",
    "$": "USD"
};

export default function parse(text) {
    if (typeof text !== 'string') {
        return {error: "Please provide something to convert"};
    }

    const tokens = textToTokens(text);

    if (tokens.length < 3) {
        return {error: "Please provide an amount and two currencies"};
    }

    const mappedTokens = mapTokens(tokens);

    return mappedTokens;
}

function textToTokens(text) {
    return text
        .replace(NUMBER_RE, num => " " + num + " ") // Make "100USD" or
                                                    // "USD100" separate tokens
        .trim()
        .split(/\s+/)
        .map(token => token.toUpperCase())
        .filter(token => ! STOP_WORDS.has(token));
}

function mapTokens(tokens) {
    const numericTokens = tokens.map(isNumeric);
    if (numericTokens.filter(token => token).length !== 1) {
        return {error: "Please provide one amount and two currencies"};
    }

    const fromAmount = Number(numericTokens[0] ? tokens[0] : tokens[1]);
    const fromCcy = mapCurrency(numericTokens[0] ? tokens[1] : tokens[0]);
    const toCcy = mapCurrency(tokens[2]);

    if (! validateCurrency(fromCcy)) {
        return {error: "From currency not valid"};
    }
    if (! validateCurrency(toCcy)) {
        return {error: "To currency not valid"};
    }

    return {fromAmount, fromCcy, toCcy};
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function mapCurrency(s) {
    return s in CURRENCY_SYMBOLS ? CURRENCY_SYMBOLS[s] : s;
}

function validateCurrency(c) {
    return c.length === 3;
}
