'use strict';
//requires
const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middleware/500.js');
const notFoundHandler = require('./middleware/404.js');
const userRouter = require('./auth/router.js');

// create express server
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(cors());

app.get('/', welcome)

app.use('/api/v1/', userRouter)

function welcome(req, res) {
    res.json({
        Home: 'Welcome in the Home Page',
        Signin: '/api/v1/signin',
        Signup: '/api/v1/signup',
    })
}


app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
    server: app,
    start: (port) => {
        const PORT = port || 3030;
        app.listen(PORT, () => console.log(`listening to PORT ${PORT}`));
    }
};