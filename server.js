const express = require('express');
const app = express();

app.use(express.static('build'));

app.use((req, res) => res.sendFile(`${__dirname}/build/index.html`));

app.listen(8080, function () {
    console.log('Express http server listening on port 8080.');
});