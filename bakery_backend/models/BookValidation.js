var validator = require('validator');
const { InvalidInputError } = require("./invalidInputError");



/** This function validates recipe books name a
@param {string} name of Recipe book to add
@return true recipe object if test pass, null otherwise
*/
function isValid2(name) {
    if (!name || name.length > 25) {
        throw new InvalidInputError("Name was empty or was too long. Please do not add anything over 25 characters");
    }
    return true;
}  
module.exports = { isValid2 };