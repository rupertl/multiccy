// Class to get rates from a provider.

// We're using the rates from https://openexchangerates.org/
// We get a copy of rates at start up and refresh every RATES_REFRESH_INTERVAL_MS
// as we don't need up to the minute rates.

import fetch from 'node-fetch';

const RATES_REFRESH_INTERVAL_MS = 6 * 60 * 60 * 1000;
const OPEM_EXCHANGE_RATES_URL = "https://openexchangerates.org/api/latest.json?app_id=";

export default class RatesProvider {
    constructor(credentials) {
        if (! credentials || ! credentials.openExchangeRates) {
            throw new Error("Must provide credentials for rate provider");
        }

        this.apiKey = credentials.openExchangeRates.apiKey;
        this.cachedRates = { rates: { USD: 1 } };
        this.cacheRates();

        setInterval(() => this.cacheRates(), RATES_REFRESH_INTERVAL_MS);
    }

    cacheRates() {
        fetch(this.getUrl(), {})
            .then(res => {
                console.log("Loaded rates from source");
                return res.json();
            })
            .then(json => {
                if (json.error) {
                    console.error(json);
                    throw new Error("Source returned an error loading rates");

                }
                this.cachedRates = json;
            })
            .catch(error => {
                console.error(error);
                throw new Error("Could not load rates from source: ", error);
            });
    }

    getUrl() {
        return OPEM_EXCHANGE_RATES_URL + this.apiKey;
    }

    getRates() {
        return this.cachedRates;
    }
}
