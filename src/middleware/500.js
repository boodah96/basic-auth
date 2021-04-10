'use strict';
module.exports = (err, req, res, next) => {
    res.status(500);
    res.jsson({
        message: err.message,
        route: req.path
    });
};