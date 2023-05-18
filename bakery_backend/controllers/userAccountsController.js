const express = require('express');
const router = express.Router();
const routeRoot = '/';
const logger = require('../logger.js');
const accountModel = require("../models/userAccountsModel.js");

// Error handlers
const { DatabaseError } = require("../models/databaseError.js");
const {InvalidInputError} = require("../models/invalidInputError.js");

// End Points
// refer to project documentation for more information
router.post('/account', CreateAccount);



 /**
 * Creates an account object from request body parameters.
 * @param {*} request Express request expecting body of email, displayname, username and password
 * @param {*} response Sends a successful response, 400 level response if input is invalid
 *                       a 500 level response if there is a system error.
 */
 async function CreateAccount(request, response) {
    logger.info("Inside of createAccount, in account controller");
    // Body parameters for account doc
    let email = request.body.email;
    let displayName = request.body.displayName;
    let username = request.body.username;
    let password = request.body.password;

    logger.debug(`JSON BODY INFO: email: ${email}, display: ${displayName}, username: ${username}, password: ${password}`);
    
   // create account object
   try {

        let account = await accountModel.addAccount(email, displayName, username, password);
        logger.debug("Account created: " + account);

        // if account is null (Unexpected), handle appropriately
        if(account == null || account == undefined) {
            logger.fatal("Account add account returned something other than object, should NEVER happen");
            response.status(500)
            response.send({errorMessage:`Unexpected error while adding account with: \n Name: ${account.username} \n Type: ${account.password}`});
        }else{
            response.status(200)
            response.send(account); // Send back account object for front end
        }

            

   } catch (err){
        // User Input Error
        if(err instanceof InvalidInputError){
            logger.error("Invalid input error while creating an account: " + err.message);
            response.status(406); // note acceptable status code
            response.send({errorMessage:"Error while creating account: " + err.message});
        }
        // Database Error
        else if(err instanceof DatabaseError){
            logger.error("Database Error while creating an account: " + err.message);
            response.status(500)
            response.send({errorMessage:"Error while creating account: " + err.message});
        }
        // Unknown Error
        else{
            response.status(500)
            logger.warn("Unexpected error while creating an account" + err.message);
            response.send({errorMessage: "Unexpected error while adding account: " + err.message} );
        }
   }
}


module.exports = {
    router,
    routeRoot
}