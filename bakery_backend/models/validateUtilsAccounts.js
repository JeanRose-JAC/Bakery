const validator = require('validator');
const { InvalidInputError } = require("./InvalidInputError");

/**
 * Validate if account data is valid by checking DisplayName, Username and Password.
 * Checks if display and usernames contain only numbers and letters.
 * Check if password meets minimum requirements.
 * 
 * Minimum requirements: 
 * Usernames: 6 char long, no special characters
 * Display Name: 4 char long, no special characters 
 * 
 * Passwords: 8 char long, 1 special char
 * @param {*} username of pokemon name to validate.
 * @param {*} type of pokemon type to validate.
 * @returns True if data is valid
 * @throws InvalidInputError if pokemon Name or Type is invalid.
 */
 function isValid2(username, type) {
    // check if name contains only letters
    if(!validator.isAlpha(username)){
        throw new InvalidInputError("\nINVALID NAME: Name must contain only letters and numbers. It cannot be empty or contain other characters (! , _ @).\nName passed in: " + username);
    }
    // name valid, check type
    if(type == "Normal" || type == "Grass" || type =="Fire" || type == "Water" || type == "Electric" || type == "Psychic") 
        return true;
    
    let acceptedTypes = "\nAccepted types: Normal, Grass, Fire, Water, Electric, Psychic"
    throw new InvalidInputError("\nINVALID TYPE. Type must be within accepted types.\nType passed in: " + type + acceptedTypes) ;
}
/**
 * Method validates to check if email format is valid.
 * @param {string} email to validate 
 * @throws InvalidInputError if email format is invalid
 * @returns {boolean} true if email
 */
function isEmailvalid(email){

}


module.exports ={
    isValid2
}