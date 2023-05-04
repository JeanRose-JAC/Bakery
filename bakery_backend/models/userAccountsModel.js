const DatabaseError = require("./databaseError.js");
const InvalidInputError = require("./invalidInputError.js");
const logger = require("../logger.js");
let collectionName = "user_accounts";
let collection;
let databaseConnection;

// validation imports
const validateUtilsAcc = require("./validateUtilsAccounts");
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

    if (resetFlag) {
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
async function getCollection() {
  try {
    return collection;
  } catch (err) {
    console.log(err.message);
  }
}
/**
 * Close connection to database with name stored in dbName
 * Logs if closing connection was successful, otherwise logs error message
 */
async function close() {
  try {
    await client.close();
    console.log("MongoDb connection closed");
  } catch (error) {
    console.log(error.message);
  }
}
// =================================================================
// CRUD
// =================================================================
/**
 * Method creates an account object and adds it to the MongoDB specified collection.
 * @param {*} username of account to create.
 * @param {*} password of account to create.
 * @returns account object if successful.
 * @throws InvalidInputError if username is taken. Or if password is not good enough.
 * @throws Database error if could not add to database.
 */
async function addAccount(email, displayName, username, password) {
  try {

    // Check if an account already exists
    // ----------------------------------------------------------------
    if (await accountCollection.findOne({ username: username })) {
      throw new InvalidInputError(
        "\nAccount with username is taken. Username: " + username
      );
    }
    // check for valid username and password
    // ----------------------------------------------------------------
    else if (validateUtilsAcc.isAccountValid(email, displayName, username, password)) {
      // creates and returns new account object if successful
      if (await !accountCollection.insertOne({email: email, displayName: displayName, username: username, password: password,})
      )
        throw new DatabaseError(
          `Error while inserting account into db: ${username}, ${password}`
        );

      // Return account object
      return { username: username, password: password };
    }
  } catch (err) {
    if (err instanceof InvalidInputError) {
      logger.error("Input Error while adding account: " + err.message);
    }
    if (err instanceof DatabaseError) {
      logger.error("Database Error while adding account: " + err.message);
    } else {
      logger.error("Unexpected error while adding account: " + err.message);
    }
    throw err;
  }
}
module.exports = { setCollection, getCollection, addAccount, close };
