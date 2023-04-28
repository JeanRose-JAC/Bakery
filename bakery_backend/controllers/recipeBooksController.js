const express = require('express');
const router = express.Router();
const routeRoot = '/';
const logger = require('../logger.js');
const recipeBooksModel = require("../models/recipeBooksModel.js");


module.exports = {
    router,
    routeRoot
}