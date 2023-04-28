const express = require('express');
const router = express.Router();
const routeRoot = '/';
const logger = require('../logger.js');
const recipesModel = require("../models/recipesModel.js");


module.exports = {
    router,
    routeRoot
}