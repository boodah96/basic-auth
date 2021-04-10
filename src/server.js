'use strict';
//requires
const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const mongoose = require('mongoose');
const errorHandler = require('./middleware/500.js');
const notFoundHandler = require('./middleware/404.js');

// create express server
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
    server: app,
    start: (port) => {
        const PORT = port || 3030;
        app.listen(PORT, () => console.log(`listening to PORT ${PORT}`));
    }
};