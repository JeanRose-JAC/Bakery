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

    // Validate Email is an Email 
    isEmailValid(email);

    // check if name contains only letters
    if(!validator.isAlpha(username)){
        throw new InvalidInputError("\nINVALID NAME: Name must contain only letters and numbers. It cannot be empty or contain other characters (! , _ @).\nName passed in: " + username);
    }
    // TODO: Validate password
}
/**
 * Validate if string passed in is an email.
 * @param {string} email to validate 
 * @throws InvalidInputError if email format is invalid
 * @returns {boolean} true if email string passed in, in in fact an email.
 */
function isEmailValid(email){

    // User validator isEmail(str,[, options]) ** only checks for format
    if (!validator.isEmail(email))
        throw new InvalidInputError("\nEmail format is invalid. Accepted format: xyz@domain.com");

    return true;
}

/**
 * Checks if Display is at least 4 characters long
 * Checks if Display Name does not contain any special characters
 * @param {string} displayName to validate
 * @throws InvalidInputError if display name does not meet requirements.
 * @returns {boolean} true if display name meets all requirements
 */
function isDisplayNameValid(displayName){
    
    // Check length meets minimum requirements (4)
    if(displayName.length < 4)
        throw new InvalidInputError("\nUsername must be at least 4 characters long.");
    
    // Check for special characters
    if(!validator.isAlphanumeric(displayName))
        throw new InvalidInputError("\nSpecial Characters are not allowed");

    // If all checks pass, return true
    return true;
    
}

function isUsernameValid(username){

}

function isPasswordValid(password){
    // use isStrongPassword in validator
}


module.exports ={
    isAccountValid,
    isEmailValid,
    isDisplayNameValid
}