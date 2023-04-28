const {MongoClient} = require("mongodb");
const DatabaseError = require('./databaseError.js');
const logger = require('../logger.js');
let collectionName = "user_accounts";
let client;
let collection;

/**
 * Connect up to the online MongoDb database based on .env details
 * Use the database with the name stored in the dbName
 * Will create the collection if it doesn't exist
 */
async function initialize(url, dbName, resetFlag) {
    try {

      logger.debug("debug");
      logger.trace("trace");

      client = new MongoClient(url); // store connected client for use while the app is running
      await client.connect(); 
      logger.info("Connected to Mongo");
      let db = client.db(dbName);

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

module.exports = {initialize}