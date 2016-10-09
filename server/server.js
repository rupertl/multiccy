const express = require('express');
const logger = require('morgan');

const app = express();
const env = process.env.NODE_ENV || 'development';

app.set('port', (process.env.API_PORT || 3001));
app.use(logger(env === 'development' ? 'dev' : 'short'));

app.get('/api/rates', (req, res) => {
    return res.json({'rates': {'USD': 1, 'GBP': 0.77, 'EUR': 0.90}});
});

app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});

/// Catch 404 and forward to error handler
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
