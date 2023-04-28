const express = require('express');
const router = express.Router();
const routeRoot = '/';
const logger = require('../logger.js');
const userAccounts = require("../models/userAccountsModel.js");


module.exports = {
    router,
    routeRoot
}