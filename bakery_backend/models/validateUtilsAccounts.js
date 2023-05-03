const validator = require('validator');
const { InvalidInputError } = require("./InvalidInputError");

/**
 * Validate if account data is valid by checking Email, DisplayName, Username and Password.
 * Checks if display and usernames contain only numbers and letters.
 * Check if password meets minimum requirements.
 * 
 * Minimum requirements: 
 * Usernames: 6 characters long, no special characters.
 * Display Name: 4 characters long, no special characters. 
 * 
 * Passwords: 8 characters long, 1 special char.
 * @param {string} email of the account to validate.
 * @param {string} displayName of the account to validate.
 * @param {string} username of pokemon name to validate.
 * @param {string} password of pokemon type to validate.
 * @returns True if data is valid
 * @throws InvalidInputError if pokemon Name or Type is invalid.
 * @throws Exception if unexpected error occurred.
 */
 function isAccountValid(email, displayName, username, password) {
    // check if name contains only letters
    if(!validator.isAlpha(username)){
        throw new InvalidInputError("\nINVALID NAME: Name must contain only letters and numbers. It cannot be empty or contain other characters (! , _ @).\nName passed in: " + username);
    }
    // TODO: Validate password
}
/**
 * Method validates to check if email format is valid.
 * @param {string} email to validate 
 * @throws InvalidInputError if email format is invalid
 * @returns {boolean} true if email
 */
function isEmailvalid(email){
    // User validator isEmail(str,[, options])

    // format email using normalizeEmail
}
function isDisplayNameValid(displayName){

}

function isUsernameValid(username){

}

function isPasswordValid(password){
    // use isStrongPassword in validator
}


module.exports ={
    isAccountValid
}