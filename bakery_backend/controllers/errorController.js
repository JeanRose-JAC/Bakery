const express = require('express');
const router = express.Router();
const routeRoot = '/';

router.all('*', sendError);

/**
 * Handles all the invalid endpoints
 * 
 * @param {object} request Client request
 * @param {Object} response Server response
 */
function sendError(request, response) {
    response.sendStatus(404);
}

module.exports = {
    router,
    routeRoot
}
