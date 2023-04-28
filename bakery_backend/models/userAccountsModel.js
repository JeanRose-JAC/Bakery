const DatabaseError = require('./databaseError.js');
const InvalidInputError = require('./invalidInputError.js');
const logger = require('../logger.js');
let collectionName = "user_accounts";
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
 * Gets the user accounts collection
 * @returns The user accounts collection from the database
 */
async function getCollection(){
  try{
    return collection;
  }
  catch(err){
    console.log(err.message);
  }
}

module.exports = {setCollection, getCollection}