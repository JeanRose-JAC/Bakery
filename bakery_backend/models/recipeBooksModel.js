const DatabaseError = require('./databaseError.js');
const InvalidInputError = require('./invalidInputError.js');
const logger = require('../logger.js');
let collectionName = "recipe_books_test";
const validateUtils = require("./BookValidation.js");
let collection;
let databaseConnection;

/**
 * Sets the collection in the database
 * 
 * @param {object} db Database connection
 * @param {boolean} resetFlag Flag to drop collection and create a new one
 */
async function setCollection(db, resetFlag) {
    try {

      databaseConnection = db;

      logger.debug("debug");
      logger.trace("trace");

      // collation specifying case-insensitive collection
      const collation = { locale: "en", strength: 1 };
        
      // Check to see if the collection exists
      let collectionCursor = await db.listCollections({ name: collectionName });
      let collectionArray = await collectionCursor.toArray();
      if (collectionArray.length == 0) {  
          // No match was found, so create new collection
          await db.createCollection(collectionName, { collation: collation });
      }    
      collection = db.collection(collectionName); // convenient access to collection

      if(resetFlag){
        await collection.drop();
        await db.createCollection(collectionName, { collation: collation });
        collection = db.collection(collectionName); // convenient access to collection
      }

    } catch (err) {
      logger.error(err.message);
      throw new DatabaseError(err.message);
    } 
}

/**
 * Gets the recipe book collection
 * @returns The recipe book collection from the database
 */
async function getCollection(){
  try{
    return collection;
  }
  catch(err){
    console.log(err.message);
  }
}


/**
 * Adds recipes to the database by validating certain conditions which should be under 25 characterts
 * @param {*} userId username
 * @param {*} name is the name of the recipes book to add in the database
 * @param {*} SavedRecipes of the recipes
 * @returns the new recipe book if succesful otherwise either null or throw an error depending of the validation
 */
async function addBook(userId, name,SavedRecipes){
  try{
    if (validateUtils.isValid2(name)){
      const book =  {userId: userId, name: name,SavedRecipes: SavedRecipes}
      await collection.insertOne(book)
      return book
      }
    else throw new InvalidInputError("Recipe book" + name + " does not have a valid");
    }catch(err)
    {
        let isIt = err.message.includes('not')
        if(isIt){
            throw new InvalidInputError("Recipe book " + name + " is invalid. The Name was incorrect. Please do not add anything over 25 characters");
        }

        throw new DatabaseError("Error in the databse" + err);
    }
}

/**
* This function will try to find a recipe book by their name to see if the recipe exists or not
* @param {*} userId username
* @param {*} find is the name of the recipe book to find
* @returns return true if the recipe was found otherwise false
*/
async function getSingleRecipeBook(userId, find) {
  try {
  let response = await collection.findOne({ userId: userId, name: find })
  return response
  }
  catch (err) {
      throw new DatabaseError("Input" + err);
  }

}
/**
* Gets every recipes book in the database
* @returns the whole collection of recipes in the database
*/
async function getAllRecipeBooks() {
  try {
      const cursor = collection.find({});
      const allValues = await cursor.toArray();
      return allValues;
  }
  catch (err) {
      throw new DatabaseError("Input" + err);
  }
}
/**
* Deletes a recipe from the database based on the name of the recipe book
* @param {*} userId username
* @param {*} find is the parameter used to find the recipe book to delete
* @returns if the operation has somebody deleted or not
*/
async function deleteRecipeBook(userId, find) {
    try {
  let response = await collection.deleteOne({userId:userId, name: find })
  return response
    }
    catch (err) {
      throw new DatabaseError("Input" + err);
  }
}
/**
* This function is used to take name of a certain recipe book and update their name.
* The new type is of course validated to be sure that it follows the 
* requirement of a proper type
* @param {*} userId username
* @param {*} name of the recipe book that has to be updated
* @param {*} newName is the new name of the recipe book
* @returns wether the operation was succesfull or not.
*/
async function updateRecipeBoookName(userId, name, newName) {

  try {
      if((!validateUtils.isValid2(newName))){
          throw new InvalidInputError("Recipe " + name + " does not have a valid name");
      }
      let response = await collection.updateOne({ userId: userId, name: name }, { $set: { name: newName } })
      return response
  }
  catch (err) {
      let isIt = err.message.includes('not')
      if(isIt){
          throw new InvalidInputError("Recipe " + name + " does not have a valid name");
      }

      throw new DatabaseError("Error in the databse" + err);
  }
}

/**
* This function is used to take name of a certain recipe book and update their content.
* The new type is of course validated to be sure that it follows the 
* requirement of a proper type
* @param {*} userId username
* @param {*} name of the recipe book that has to be updated
* @param {*} SavedRecipes is the new type of the recipe content added to the recipe book
* @returns wether the operation was succesfull or not.
*/
async function updateRecipeBoookContent(userId, name, update) {

  try {
      let response = await collection.updateOne({ userId: userId, name: name }, { $set: { SavedRecipes: update } })
      return response
  }
  catch (err) {

      throw new InvalidInputError("Error while updating the recipe book Content: " + err);
  }
}




module.exports = {setCollection, getCollection,addBook,getSingleRecipeBook,getAllRecipeBooks,deleteRecipeBook,updateRecipeBoookName,updateRecipeBoookContent}