// Express API server providing rates to client

import express from 'express';
import logger from 'morgan';
import RatesProvider from './RatesProvider';

// Credentuals for OpenExchangeRates.
// Provide a file here with the API key of the form:
// export default {
//     openExchangeRates: {
//         apiKey: "API_KEY_HERE"
//     }
// };
import credentials from '../credentials.js';

const app = express();
const env = process.env.NODE_ENV || 'development';
const ratesProvider = new RatesProvider(credentials);

app.set('port', (process.env.API_PORT || 3001));
app.use(logger(env === 'development' ? 'dev' : 'short'));

app.get('/api/rates', (req, res) => {
    return res.json(ratesProvider.getRates());
});

app.listen(app.get('port'), 'localhost', () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    return next(err);
});

// Production error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500);
    return res.json({"error" : err.message});
});
