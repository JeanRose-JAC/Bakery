const { InvalidInputError } = require('../models/invalidInputError');
const { DatabaseError } = require('../models/databaseError');
const {faker} = require('@faker-js/faker');
const logger = require("../logger.js");

const model = require('../models/userAccountsModel');
const utils = require('../models/validateUtilsAccounts');
const databaseConnection = require('../models/databaseConnection');
const { MongoMemoryServer} = require('mongodb-memory-server');

require("dotenv").config();
jest.setTimeout(100000);
let db = "user_account_test"; // collection name

// format: email, displayName, username, password
const userData = [
    {email:faker.internet.email(), displayName: "RandomUsername1", username: "username1" , password: "testPassword123!"},
    {email:faker.internet.email(), displayName: "darkLordSon", username: "username2"  , password: "testPassword123!"},
    {email:faker.internet.email(), displayName: "DarkerLordSon", username: "username3"  , password: "testPassword123!"},
    {email:faker.internet.email(), displayName: "sundayDaisy", username: "username4"  , password: "testPassword123!"},
    {email:faker.internet.email(), displayName: "anotherDisplay", username: "username5"  , password: "testPassword123!"},
    {email:faker.internet.email(), displayName: "helloDarkness123", username: "username6"  , password: "testPassword123!"},
    {email:faker.internet.email(), displayName: "IloveWebProgramming", username: "username7"  , password: "testPassword123!"},
    {email:faker.internet.email(), displayName: "ThePersonAboveMeLied", username: "username8"  , password: "testPassword123!"},
    {email:faker.internet.email(), displayName: "gosunohairline", username: "username9"  , password: "testPassword123!"},
    {email:faker.internet.email(), displayName: "GodSlayer256", username: "username10"  , password: "testPassword123!"},
    {email:faker.internet.email(), displayName: "HotDawg514", username: "username11"  , password: "testPassword123!"},
    {email:faker.internet.email(), displayName: "CyberSlasher", username: "username12"  , password: "testPassword123!"},
    {email:faker.internet.email(), displayName: "epicdestroyer", username: "username13"  , password: "testPassword123!"},
    {email:faker.internet.email(), displayName: "irandoutofideas", username: "username14"  , password: "testPassword123!"},
    {email:faker.internet.email(), displayName: "bombobararocelclat", username: "username15"  , password: "testPassword123!"},
    {email:faker.internet.email(), displayName: "HisHighnessMishMish", username: "username16"  , password: "testPassword123!"},
]

/** Since a  account can only be added to the DB once, we have to splice from the array. */
const generateAccountData_Old = () => userData.splice(Math.floor((Math.random() * userData.length)), 1)[0];

// Updated version of generating account data using faker.js 
// Default password isntead of faker js because reg expression suck
function generateAccountData(){
    return  {email:faker.internet.email(), displayName: "HisHighnessMishMish", username: "username16"  , password: "testPassword123!"};
}

// Prep mock database
let mongod;

beforeAll(async () => {
    // This will create a  new instance of "MongoMemoryServer" and automatically start it
    mongod = await MongoMemoryServer.create();
    console.log("Mock Database started");
});

afterAll(async () => {
    await mongod.stop(); // Stop the MongoMemoryServer
    console.log("Mock Database stopped");
});

// initialize a connection to a database before each test
beforeEach(async () => {
    try {
        // Get URL for mock database
        const url = mongod.getUri();
        await databaseConnection.connectToDatabase(url, db)
        .then((conn) => model.setCollection(conn, true));

    } catch (error) {
        console.log(error.message);
    }
})

// Close database connection after each test run
afterEach(async () => {
    await model.close();
});

// =================================================================
// Test Units
// =================================================================


// --------- 
// Create
// ---------
//TODO: Tests should not user model methods
//TODO: test validation methods separately

// Add test 
/**
 * Investigate issue where querying database when adding causes this test to fail 
 * 
 * Side note: sometimes length will be 0, other times 1, run test multiple times 
 * for more accurate results.
*/
test("Can add account to DB", async () => {
    // Generate account data
    const { email, displayName, username, password } = generateAccountData();
    let filter = { email: email, displayName: displayName, username: username, password: password };
    
    
    // get collection
    let collection = await model.getCollection();
    
    // add account to database  
    await collection.insertOne(filter); 

    // Query database
    const cursor = await model.getCollection();
    let results = await cursor.find({username: username, password:password}).toArray();// Convert query to array

    // Check Array 
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBe(1);

    // Check Pokemon Object from Database 
    expect(results[0].username.toLowerCase() == username.toLowerCase()).toBe(true);
    expect(results[0].password.toLowerCase() == password.toLowerCase()).toBe(true);
 
});
test("Cannot add duplicate accounts to DB", async () => {
    // Generate account data
    const { email, displayName, username, password } = generateAccountData();

    // Add first account to database  
    await model.addAccount(email, displayName, username, password);

    // Query database
    const cursor = await model.getCollection();
    let results = await cursor.find({username: username, password:password}).toArray();// Convert query to array

    // Check Array 
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBe(1);

    // Check Account Object from Database 
    expect(results[0].username.toLowerCase() == username.toLowerCase()).toBe(true);
    expect(results[0].password.toLowerCase() == password.toLowerCase()).toBe(true);

    // Add second account, expect failure
    await expect(()=> model.addAccount(email, displayName, username ,password)).rejects.toThrow(DatabaseError);
 
});

test("Cannot add account with an empty Username", async () => {
    const { email, displayName, username, password } = generateAccountData();
    const emptyuserName = "";
    
    // expect InvalidInputError exception to be thrown
    await expect(()=> model.addAccount(email, displayName, emptyuserName,password)).rejects.toThrow(InvalidInputError);
});
test("Cannot add account with an empty Display Name", async () => {
    const { email, displayName, username, password } = generateAccountData();
    const emptydisplayName = "";
    
    // expect InvalidInputError exception to be thrown
    await expect(()=> model.addAccount(email, emptydisplayName, username ,password)).rejects.toThrow(InvalidInputError);
});
test("Cannot add account with an invalid Username", async () => {
    const { email, displayName, username, password } = generateAccountData();
    const invalidUsername = "NoSpecialCharacters!_";
    
    // expect InvalidInputError exception to be thrown
    await expect(()=> model.addAccount(email, displayName, invalidUsername ,password)).rejects.toThrow(InvalidInputError);
});
test("Cannot add account with an invalid Display Name", async () => {
    const { email, displayName, username, password } = generateAccountData();
    const invalidDisplayName = "";
    
    // expect InvalidInputError exception to be thrown
    await expect(()=> model.addAccount(email, invalidDisplayName, username ,password)).rejects.toThrow(InvalidInputError);
});
test("Cannot add account with an invalid password", async () => {
    const { email, displayName, username, password } = generateAccountData();
    const invalidPassword = "lamepassword";
    
    // expect InvalidInputError exception to be thrown
    await expect(()=> model.addAccount(email, displayName, username ,invalidPassword)).rejects.toThrow(InvalidInputError);
});

// // -------------
// // Read 
// // -------------

// // Read one
// // while we technically didnt need this one because the add queries, good to check
test("Can read existing account ", async () => {
    const { email, displayName, username, password } = generateAccountData();
    await model.addAccount(email, displayName, username ,password) // add account to database  
    
    // Filter for query
    let filter = { username: username, password: password };
    let collection = await model.getCollection();
    
    // Query database
    let account =  await collection.findOne(filter);
    const cursor = await model.getCollection();
    let results = await cursor.find({username: username}).toArray();// Convert query to array
    
    // Check details from getSingleAccount
    expect(account.username == username).toBe(true);
    expect(account.password == password).toBe(true);
    expect(account.email.toLowerCase() == email.toLowerCase()).toBe(true);
    expect(account.displayName == displayName).toBe(true);

    // Check account again but directly from database
    expect(results[0].username == username).toBe(true);
    expect(results[0].password == password).toBe(true);
    expect(results[0].email == email).toBe(true);
    expect(results[0].displayName == displayName).toBe(true);
 
});
test("Can read existing account using model ", async () => {
    const { email, displayName, username, password } = generateAccountData();
    await model.addAccount(email, displayName, username ,password) // add account to database  
    
    // Filter for query
    let filter = { username: username, password: password };
    let collection = await model.getCollection();
    
    // Query database
    let account =  await collection.findOne(filter);

    let modelAccount = await model.getSingleAccount(username);
    logger.info("Account info is " + modelAccount);
    // Check details from getSingleAccount
    expect(account.username == username).toBe(true);
    expect(account.password == password).toBe(true);
    expect(account.email.toLowerCase() == email.toLowerCase()).toBe(true);
    expect(account.displayName == displayName).toBe(true);

    // Check model results
    expect(modelAccount.username == username).toBe(true);
    expect(modelAccount.password == password).toBe(true);
    expect(modelAccount.email.toLowerCase() == email.toLowerCase()).toBe(true);
    expect(modelAccount.displayName == displayName).toBe(true);
 
});

test("Cannot read account that doesn't exist (Valid name)", async () => {

    // Add some accounts to the database
    const { email, displayName, username, password } = generateAccountData();
    let filter = { username: username, password: password };
    let collection = await model.getCollection();
    
    // TODO: use fakerJS for fake usernames and passwords
    await collection.insertOne(filter);// add account to database  

    let notRealUsername = "KuiHuaReal";
    let result = await collection.findOne({username: notRealUsername});

    // Check account that doesn't exist
    await expect(result == null).toBe(true);
});
test("Cannot read account that doesn't exist (Valid name) using model", async () => {

    // Add some accounts to the database
    const { email, displayName, username, password } = generateAccountData();
    let collection = await model.getCollection();
    
    // add account to database 
    let filter = { username: username, password: password }; 
    await collection.insertOne(filter);

    // Fake Data 
    let notRealUsername = "KuiHuaReal";
    
    // Check account that doesn't exist
    await expect(()=> model.getSingleAccount(notRealUsername).rejects.toThrow(DatabaseError));
});
// // Read many 
// test("Can read entire collection", async () => {

//     // Add some accounts to the database
//     const { username, password } = generateAccountData();
//     let username2 ="Zaid";
//     let password2 = "123467GoodPassword";
//     let username3 ="Ahmed";
//     let password3 = "123ShorterPassword";

//     await model.addAccount(username,password) // add account to database  
//     await model.addAccount(username2,password2);
//     await model.addAccount(username3,password3);

//     let results = await model.getAllAccounts();

//     // Check Array 
//     expect(Array.isArray(results)).toBe(true);
//     expect(results.length).toBe(3);

//     // Check all accounts that we just created.
//     // Account 1 
//     expect(results[0].username.toLowerCase() == username.toLowerCase()).toBe(true);
//     expect(results[0].password.toLowerCase() == password.toLowerCase()).toBe(true);
//     // Account 2
//     expect(results[1].username.toLowerCase() == username2.toLowerCase()).toBe(true);
//     expect(results[1].password.toLowerCase() == password2.toLowerCase()).toBe(true);
//     // Account 3
//     expect(results[2].username.toLowerCase() == username3.toLowerCase()).toBe(true);
//     expect(results[2].password.toLowerCase() == password3.toLowerCase()).toBe(true);
// });
// // Update
// test("Can update existing accounts username with valid username", async () => {
//     // create account
//     const { username, password } = generateAccountData();
//     await model.addAccount(username,password); // kept model method for simplicity sake

//     let newUsername = "newPikachu";
//     let filter = { username: username, password: password };
//     let collection = await model.getCollection();
    

//     let results = await collection.updateOne(filter,{$set:{username:newUsername}})

//     let accountCollection = await model.getCollection(); // convenient access to collection
//     let databaseResult = await accountCollection.findOne({username: newUsername}); // this returns document directly

//     // Check method returns properly
//     expect(results.modifiedCount === 1).toBe(true);
//     // Check database for proper update
//     // Only check for username, assuming duplpicates cannot be added,
//     // which is complete but needs to be commented out.
//     expect(databaseResult.username.toLowerCase() == newUsername.toLowerCase()).toBe(true);

// });
// test("Can't update account with an invalid username", async () => {
     
//     // create account
//      const { username, password } = generateAccountData();
//      let filter = { username: username, password: password };
//      let collection = await model.getCollection();
//      await collection.insertOne(filter);
    
//      let invalidUsername = "newPikachu_!";

        
//     // Expect method to throw
//     await expect(()=> model.updateOneUsername(username, invalidUsername)).rejects.toThrow(InvalidInputError);

//      // check if current account has updated
//      let accountCollection = await model.getCollection(); // convenient access to collection
//      let databaseResult = await accountCollection.findOne({username: username}); // this returns document directly

//      // Check database for proper update
//      expect(databaseResult.username.toLowerCase() == username.toLowerCase()).toBe(true);
//      expect(databaseResult.password.toLowerCase() == password.toLowerCase()).toBe(true);

// });
// test("Can't update existing account with an already existing username", async () => {
//     let existingUsername = "newPikachu";
     
//     // create account
//      const { username, password } = generateAccountData();
//      await model.addAccount(username,password)
//      await model.addAccount(existingUsername,password);
        
//         // Expect method to throw
//     await expect(()=> model.updateOneUsername(username, existingUsername)).rejects.toThrow(DatabaseError);

//      // check if current account has updated
//      let accountCollection = await model.getCollection(); // convenient access to collection
//      let databaseResult = await accountCollection.findOne({username: username}); // this returns document directly

//      // Check database for proper update
//      // Only check for username, assuming duplpicates cannot be added,
//      // which is complete but needs to be commented out.
//      expect(databaseResult.username.toLowerCase() == username.toLowerCase()).toBe(true);
//      expect(databaseResult.password.toLowerCase() == password.toLowerCase()).toBe(true);
     

// });
// test("Can't update account that doesn't exist", async () => {
     
//     // create account
//      const { username, password } = generateAccountData();
//      await model.addAccount(username,password);

//      let nonExistingUsername = "DarkLordTheThird";
//      let newName = "oldDarkLord";
//      let result = await model.updateOneUsername(nonExistingUsername, newName);

//     // validate updateOneUsername return value
//     await expect(result == false).toBe(true);

// });
// // Delete
// test("Can delete existing account", async () => {
     
//     // create account
//      const { username, password } = generateAccountData();
//      let filter = {username: username, password: password}

//      await model.addAccount(username,password);

//      let accountCollection = await model.getCollection();
//      let result = await accountCollection.deleteOne(filter,true); // true = delete just one

//     // validate deleteOne 
//     await expect(result.deletedCount == 1).toBe(true);
//     await expect(result.acknowledged == true).toBe(true);

// });
// test("Can delete existing account using model", async () => {
     
//     // create account
//      const { username, password } = generateAccountData();

//      await model.addAccount(username,password);

//      let result = await model.deleteOneAccount(username,password);

//     // validate model result
//     await expect(result.username.toLowerCase() == username.toLowerCase() && result.password.toLowerCase() == password.toLowerCase()).toBe(true);

// });
// test("Can't delete an account that doesn't exist", async () => {
     
//     // create account
//      const { username, password } = generateAccountData();
//      await model.addAccount(username,password);

//      let nonExistingUsername = "DarkLordTheThird";
//      let filter = { username: nonExistingUsername, password:password };

//      let accountCollection = await model.getCollection();
//      let result = await accountCollection.deleteOne(filter,true); // true = delete just one

//      // check that no documents were deleted
//      await expect(result.deletedCount == 0).toBe(true);

// });

// test("Can't delete an account that doesn't exist using model", async () => {
     
//     // create account
//      const { username, password } = generateAccountData();
//      await model.addAccount(username,password);

//      let nonExistingUsername = "DarkLordTheThird";
//      // expect model method to throw
//      await expect(()=> model.deleteOneAccount(nonExistingUsername, password)).rejects.toThrow(DatabaseError);
// });


// test("Can't delete an account with non-matching password", async () => {
     
//     // create account
//      const { username, password } = generateAccountData();
//      await model.addAccount(username,password);

//      let wrongPassword = "oldDarkLord";
//      let filter = {username: username, password: wrongPassword}

//      let accountCollection = await model.getCollection();
//      let result = await accountCollection.deleteOne(filter,true);

//     // check that no documents were deleted
//     await expect(result.deletedCount == 0).toBe(true);

// });

// test("Can't delete an account with non-matching username", async () => {
     
//     // create account
//     const { username, password } = generateAccountData();
//     await model.addAccount(username,password);

//     let nonExistingUsername = "DarkLordTheThird";
//     let filter = {username: nonExistingUsername, password: password}

//     let accountCollection = await model.getCollection();
//     let result = await accountCollection.deleteOne(filter,true);

//    // check that no documents were deleted
//    await expect(result.deletedCount == 0).toBe(true);

// });

