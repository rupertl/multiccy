const express = require('express');

const app = express();
app.set('port', (process.env.API_PORT || 3001));

app.get('/api/rates', (req, res) => {
    return res.json({'rates': {'GBP': 0.77, 'EUR': 0.90}});
});

app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
