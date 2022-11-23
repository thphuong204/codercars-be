const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

// CAR
const carAPI = require('./car.api');
const transmission_type_arr = ['MANUAL', 'AUTOMATIC', 'AUTOMATED_MANUAL', 'DIRECT_DRIVE', 'UNKNOWN'];
const size_arr = ['COMPACT', 'MIDSIZE', 'LARGE'];

router.use(
    '/cars',

    // Use express-validator, require 'make' must be at least 3 characters long
    body('make','make must be at least 3 characters long').isString().isLength({ min: 3 }),
    body('model','model must be filled').isString().notEmpty(),
    body('release_date',`year must be from 1900 to ${new Date().getFullYear()}`).notEmpty().custom((value) => value <= new Date().getFullYear() && value >= 1900),
    body('transmission_type','transmission_type must be filled with one of these options: MANUAL, AUTOMATIC, AUTOMATED_MANUAL, DIRECT_DRIVE, UNKNOWN')
        .isString().notEmpty().custom((value) => transmission_type_arr.includes(value.toUpperCase())),
    body('size','size must be filled with one of these options: Compact, Midsize, Large').isString().notEmpty().custom((value) => size_arr.includes(value.toUpperCase())),
    body('style','style must be filled').isString().notEmpty(),
    body('price','price must be greater than or equal 1,000').notEmpty().custom((value) => value >= 1000),

    carAPI
    );

module.exports = router;
