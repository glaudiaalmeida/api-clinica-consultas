const express = require('express');

const rotas = require('./rotas');

const app = express();

app.use(express.json());

app.use(rotas);

app.listen(5000);

