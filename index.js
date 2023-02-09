require("dotenv-safe").config();
const { json } = require('body-parser');
const express = require('express');
const router = require('./api/router.js');

const app = express(); 
app.use(json());
app.use(router);

app.listen(3000, () => {
    console.log(`Ouvindo porta 3000`);
});