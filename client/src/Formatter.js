// Class to format conversion results

import accounting from 'accounting';

// Some of these are by convention rather than official rounding amounts
// List is not comprehensive
const CURRENCY_ROUNDING = {
    "JPY": 0,
    "KRW": 0,
    "THB": 0
};

export default function format({fromAmount, fromCcy, toAmount, toCcy}) {
    if (typeof fromAmount === "undefined" || typeof toAmount === "undefined") {
        return "";
    } else {
        return formatAmount(fromAmount, fromCcy)
            + " = "
            + formatAmount(toAmount, toCcy);
    }
}

function formatAmount(amount, ccy) {
    return accounting.formatMoney(amount, ccy + " ",
                                  determinePrecision(amount, ccy));
}

function determinePrecision(amount, ccy) {
    if (accounting.formatNumber(amount, 2).slice(-3) === ".00") {
        // Force no decimals if amount is exact
        return 0;
    } else if (ccy in CURRENCY_ROUNDING) {
        return CURRENCY_ROUNDING[ccy];
    } else {
        return 2;
    }
}
