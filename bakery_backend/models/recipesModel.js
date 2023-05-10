const DatabaseError = require('./databaseError.js');
const InvalidInputError = require('./invalidInputError.js');
const recipesValidateUtils = require('./recipesValidateUtils.js');
const validator = require('validator');
const logger = require('../logger.js');
let collectionName = "recipes";
let recipesCollection;
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
      recipesCollection = db.collection(collectionName); // convenient access to collection

      if(resetFlag){
        await recipesCollection.drop();
        await db.createCollection(collectionName, { collation: collation });
        recipesCollection = db.collection(collectionName); // convenient access to collection
      }

    } catch (err) {
      logger.error(err.message);
      throw new DatabaseError(err.message);
    } 
}

/**
 * Gets the recipe collection
 * @returns The recipe collection from the database
 */
async function getCollection(){
  try{
    return recipesCollection;
  }
  catch(err){
    console.log(err.message);
  }
}

/**
 * Add a recipe object to the recipes collection
 * 
 * @param {string} userId username
 * @param {string} title title of recipe
 * @param {string} type recipe type
 * @param {string} ingredients ingredients  of recipe
 * @param {string} servings number of servings of recipe
 * @param {string} instructions instructions of recipe 
 * @returns Recipe object
 * @throws DatabaseError if an error occurs in the database
 * @throws InvalidInputError if any of the input fields are invalid
 */
async function addNewRecipe(userId, title, ingredients, servings, instructions, type = undefined){
  recipesValidateUtils.areFieldsValid(userId, title, ingredients, servings, instructions);

  try{
      await recipesCollection.insertOne({userId: userId, title: title, type: type, ingredients: ingredients, servings: servings, instructions: instructions});
      let newRecipe = await getOneRecipe(userId, title);
      return newRecipe;
  }
  catch (err) {
      logger.error("From addNewRecipe(): " + err.message);
      throw new DatabaseError(err.message);
  }

}

/**
 * Gets all the recipes in the database
 * 
 * @returns An array of recipe objects
 * @throws DatabaseError if an error occurs in the database
 */
async function getRecipes(){
  try{
    let allRecipes = await recipesCollection.find();
    return allRecipes.toArray();
  }
  catch (err) {
    logger.error("From getRecipes(): " + err.message);
    throw new DatabaseError(err.message);
  }  
}

/**
 * Gets all the recipes of one user
 * 
 * @param {string} username username 
 * @returns An array of recipe objects
 * @throws DatabaseError if an error occurs in the database
 * @throws InvalidInputError if the username is empty
 */
async function getRecipesOfOneUser(username){

  try{
    if(validator.isEmpty(username)){
      throw new InvalidInputError("Username field must not be empty.");
    }

    let allRecipes = await recipesCollection.find({userId: username});
    return allRecipes.toArray();
  }
  catch (err) {
    logger.error("From getRecipesOfOneUser(): " + err.message);

    if(err instanceof InvalidInputError){
      throw err;
    }
    else
      throw new DatabaseError(err.message);
  }  
}

/**
 * Gets the recipe based on the userId and title
 * 
 * @param {string} userId username
 * @param {string} title title of recipe
 * @returns Recipe object
 * @throws DatabaseError if an error occurs in the database
 * @throws InvalidInputError if any of the input fields are invalid
 */
async function getOneRecipe(userId, title){
  recipesValidateUtils.areKeyValid(userId, title);

  try{

    return await recipesCollection.findOne({userId: userId, title: title});
  }
  catch (err) {
    logger.error("From getOneRecipe(): " + err.message);
    throw new DatabaseError(err.message);
  }  
}

/**
 * Updates the specified recipe with the new information
 * 
 * @param {string} userId username
 * @param {string} title title of the recipe
 * @param {string} newTitle new title of the recipe
 * @param {string} newType new type of the recipe
 * @param {string} newIngredients new ingredients of the recipe
 * @param {string} newServings new serving size of the recipe
 * @param {string} newInstructions new instructions of the recipe
 * @returns Updated recipe object
 * @throws DatabaseError if an error occurs in the database
 * @throws InvalidInputError if any of the input fields are invalid
 */
async function updateRecipe(userId, title, newTitle = "", newType = "", newIngredients = "", newServings = "", newInstructions = ""){
  recipesValidateUtils.areKeyValid(userId, title);

  try{
    let obj = await getOneRecipe(userId, title);

    if(obj == null){
      throw new InvalidInputError("Recipe does not exist.");
    }

    let key = {_id: obj._id};

    if(newTitle == "")
        newTitle = obj.title;

    if(newType = "")
      newType = obj.type;

    if(newIngredients == "")
        newIngredients = obj.ingredients;

    if(newServings == "")
        newServings = obj.servings;
    else{
      recipesValidateUtils.isServingsValid(newServings);
    }
    
    if(newInstructions == "")
        newInstructions = obj.instructions;

    let newValues = {userId: userId, title:newTitle, type:newType, ingredients:newIngredients, servings:newServings, instructions:newInstructions};
    let result = await recipesCollection.replaceOne(key, newValues); 
    let newRecipe = await getOneRecipe(userId, newValues.title); 

    return {updateResult:result, recipe:newRecipe}
  }
  catch(err){
    logger.error("From updateRecipe(): " + err.message);

    if(err instanceof InvalidInputError){
      throw err;
    }
    else
      throw new DatabaseError(err.message);
}
}

/**
 * Deletes the specified recipe
 * 
 * @param {string} userId username
 * @param {string} title title of the recipe
 * @returns Object with a boolean acknowledged and integer deletedCount as well as recipe object
 * @throws DatabaseError if an error occurs in the database
 * @throws InvalidInputError if any of the input fields are invalid
 */
async function deleteRecipe(userId, title){
  recipesValidateUtils.areKeyValid(userId, title);

  try{
    let recipe = await getOneRecipe(userId, title);

    if(recipe == null){
      throw new InvalidInputError("Recipe does not exist.");
    }

    let result = await recipesCollection.deleteOne({_id: recipe._id});

    return {recipe: recipe, deleteResult: result};
  }
  catch(err){
    logger.error("From deleteRecipe(): " + err.message);

    if(err instanceof InvalidInputError){
      throw err;
    }
    else
      throw new DatabaseError(err.message);  
  }
}

module.exports = {setCollection, getCollection, addNewRecipe, getOneRecipe, getRecipes, getRecipesOfOneUser, updateRecipe, deleteRecipe}