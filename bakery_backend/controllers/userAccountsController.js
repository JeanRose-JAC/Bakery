const express = require('express');
const router = express.Router();
const routeRoot = '/';
const logger = require('../logger.js');
const userAccounts = require("../models/userAccountsModel.js");

// Error handlers
const { DatabaseError } = require("../models/databaseError.js");
const {InvalidInputError} = require("../models/invalidInputError.js");


module.exports = {
    router,
    routeRoot
}