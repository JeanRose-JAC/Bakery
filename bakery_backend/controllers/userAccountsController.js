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
router.post('/account', createAccount);
router.get('/account/:username', showAccount);
router.get('/account/', showAllAccounts);
router.put('/account/:username/editusername',editUsername);
router.put('/account/:username/editpassword',editPassword);
router.put('/account/:username/editdisplayName',editDisplayName);
router.delete('/account', deleteAccount);


 /**
 * Creates an account object from request body parameters.
 * @param {*} request Express request expecting body of email, displayname, username and password
 * @param {*} response Sends a successful response, 400 level response if input is invalid
 *                       a 500 level response if there is a system error.
 */
 async function createAccount(request, response) {
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

/**
 * Query database for a single instance of an account.
 * Sends a response with the account information if available.
 * Sends 500 level response if account could not be found due to a database error or if it does not exist
 * @param {*} request Express request expecting body data of username
 * @param {*} response Sends a successful response with account object if account is found.
 *                     a 500 level response if account could not be found
 */
async function showAccount(request, response) {

    // get the name from url
    let username = request.params.username; // params = endpoint name
    logger.debug("username params value: " + username)

   try {

        let account = await accountModel.getSingleAccount(username);
        logger.debug("Account result: " + account);
        // if account is null, handle appropriately (unexpected)
        if(account == null){
            logger.fatal("Account add account returned something other than object, should NEVER happen");
            response.status(500)
            response.send({errorMessage:"Apologies, account was not found inside of database"});
        }
        else{
                response.status(200);
                response.send(account);

        } 
            

   } catch (err){
        // Database
        if(err instanceof DatabaseError){
            logger.error("Database Error while getting account information" + err.message);
            response.status(500)
            response.send({errorMessage:"Error while finding account: " + err.message});
        }
        // Unknown Error
        else{
            response.status(500)
            logger.error("Unexpected Error while getting account information" + err.message);
            response.send({errorMessage:"Unexpected error while finding account: " + err.message});
        }
   }
}
/**
 * Query database for all accounts inside of a mongo db.
 * Sends a response with the account list if available.
 * Sends 500 level response if accounts could not be queried due to a database error.
 * @param {*} request Express request expecting body data of username
 * @param {*} response Sends a successful response if account is found.
 *                     a 500 level response if account could not be found
 */
async function showAllAccounts(request, response) {

   try {

        let accounts = await accountModel.getAllAccounts();
        logger.debug("Account result: " + accounts);
        // if pokemon is null, handle appropriately
        if(accounts == null){
            logger.fatal("Accounts should not return null");
            response.status(404)
            response.send({errorMessage:"Apologies, could not get all accounts"});
        }
        else{
                response.status(200);
                response.send(accounts);
        } 
            

   } catch (err){
        // Database
        if(err instanceof DatabaseError){
            logger.error("Database Error while getting account information" + err.message);
            response.status(500)
            response.send({errorMessage:"Error while finding account: " + err.message});
        }
        // Unknown Error
        else{
            response.status(500)
            logger.error("Unexpected Error while getting account information" + err.message);
            response.send({errorMessage:"Unexpected error while finding account: " + err.message});
        }
   }
}


/**
 * Queries database for instance of account with same username.
 * Validate new username, then update account with new username if valid.
 * Sends object containing oldUsername and newUsername
 * @param {*} request Express request expecting a JSON request with username and newUsername in body
 * @param {*} response 200 response if account is found and updated. 
 *                     404 response if account is not found.
 *                     500 level response if updating account fails.
 *                     500 level responses can be sent if new username is taken or if updating fails.
 *              
 */
async function modifyAccount(request, response){
    // Body params for new username
    let name = request.body.username;
    let newName = request.body.newUsername;
    logger.debug("Json body from modify request: name: " + name + ", newName: " + newName);
   // updating account username
   try {

        let account = await model.updateOneUsername(name, newName);
        logger.debug("Account update result values  " + account);

        // if pokemon is null, handle appropriately
        if(account == null || account == undefined) {
            logger.fatal("updateOneUsername returned null or undefined, should never happen")
            response.status(500)
            response.send({errorMessage: `Unexpected error while updating account with: \n Name: ${name}`});
        }else if(account == true) {
            response.status(200)
            response.send({oldName: name, newName: newName}); // return object for front end
        }else if(account == false) {
            response.status(200)
            response.send({oldName: "Account not found", newName:"Account not found"});
        }

            

   } catch (err){
        // User Input Error
        if(err instanceof InvalidInputError){
            logger.error("Invalid input error while updating an account " + err.message);
            logger.error("Values passes in: " + name + newName);
            response.status(406); // not acceptable status code
            response.send({errorMessage: "Error while updating account: " + err.message});
        }
        // Database Error
        else if(err instanceof DatabaseError){
            logger.error("Database error while updating an account " + err.message);
            response.status(500)
            response.send({errorMessage:"Error while updating account: " + err.message});
        }
        // Unknown Error
        else{
            logger.warn("Unknown error while updating an account " + err.message);
            response.status(500)
            response.send({errorMessage:"Unexpected error while updating account: " + err.message});
        }
   }
}
module.exports = {
    router,
    routeRoot
}