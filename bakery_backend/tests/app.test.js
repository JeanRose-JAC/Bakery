const model = require('../models/UserModelMongoDb');
require('dotenv').config();
let dbFile = `pokemontesting`;
jest.setTimeout(10000);
let mongod;
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app");
const supertest = require("supertest");
const testRequest = supertest(app);



beforeAll(async () => {

    mongod = await MongoMemoryServer.create();
    console.log("Mock Database started");
});

afterAll(async () => {
    await mongod.stop();
    console.log("Mock Database stopped");

})



var userData = [
    { name: 'Albert', Password: 'Password123', vegan: true },
    { name: 'Benjamin', Password: 'Password123', vegan: true },
    { name: 'Charlie', Password: 'Password123', vegan: true },
    { name: 'Dominique', Password: 'Password123', vegan: true },
    { name: 'Emanuelle', Password: 'Password123', vegan: true },
    { name: 'Fred', Password: 'Password123', vegan: true },
    { name: 'Gilles', Password: 'Password123', vegan: true },
]



beforeEach(async () => {
    try {
        const url = mongod.getUri();
        console.log(url)
        await model.initialize(url, dbFile, true)

    } catch (err) {
        console.error("error with before each " + err);
    }

});

afterEach(async () => {
    await model.close()
});


/**
 * Thess tests consists of verifying if the proper user can be addedd to the database
 * depending of their name and password
 */


test("GET finding a user", async () => {
    try {
        await model.addUser(userData[0].name, userData[0].Password);
        const testResponse = await testRequest.get("/control/find/" + userData[0].name);
        expect(testResponse.status).toBe(200);
    }
    catch (err) {
        console.error(err)
    }
});
test("GET not finding a user", async () => {
    const testResponse = await testRequest.get("/control/find/" + userData[0].name);
    let isIt = testResponse.text.includes('not')
    expect(isIt).toBe(true);

});
test("POST  /Adding proper user", async () => {
    const testResponse = await testRequest.post("/control/add/" + userData[0].name + "/" + userData[0].Password)
    expect(testResponse.status).toBe(200);
    const cursor = await model.getCollection().find();
    const results = await cursor.toArray();
    expect(results.length).toBe(1);
    expect(results[0].name.toLowerCase() == userData[0].name.toLowerCase()).toBe(true);
    expect(results[0].password.toLowerCase() == userData[0].Password.toLowerCase()).toBe(true);
});

test("POST  /Not adding proper user due to wrong name", async () => {
    const testResponse = await testRequest.post("/control/add/" + "za" + "/" + userData[0].Password)
    expect(testResponse.status).toBe(400);
    const cursor = await model.getCollection().find();
    const results = await cursor.toArray();
    expect(results.length).toBe(0);
});
test("POST  /Not adding proper user due to repeated name", async () => {
    await testRequest.post("/control/add/" + userData[0].name + "/" + userData[0].Password)
    let testResponse = await testRequest.post("/control/add/" + userData[0].name + "/" + userData[0].Password)
    expect(testResponse.status).toBe(400);
    const cursor = await model.getCollection().find();
    const results = await cursor.toArray();
    expect(results.length).toBe(1);
});
test("POST  /Not adding proper user due to poor password", async () => {
    let testResponse = await testRequest.post("/control/add/" + userData[0].name + "/" + "kaslkdjlkasjl")
    expect(testResponse.status).toBe(400);
    const cursor = await model.getCollection().find();
    const results = await cursor.toArray();
    expect(results.length).toBe(0);
});

test("PUT  User password updated", async () => {
    model.addUser(userData[0].name, userData[0].Password)
    const testResponse = await testRequest.put("/control/update/" + userData[0].name + "/" + "newpasssssssword12324");
    let isIt = testResponse.text.includes('not')
    expect(isIt).toBe(false);
});
test("PUT  User password not updated due the new password wrong", async () => {
    model.addUser(userData[0].name, userData[0].Password)
    const testResponse = await testRequest.put("/control/update/" + userData[0].name + "/" + "ne");
    let isIt = testResponse.text.includes('not')
    expect(isIt).toBe(true);
});
test("PUT  User password not updated due the new password being the same as the old one", async () => {
    model.addUser(userData[0].name, userData[0].Password)
    const testResponse = await testRequest.put("/control/update/" + userData[0].name + "/" + "Password123");
    let isIt = testResponse.text.includes('not')
    expect(isIt).toBe(true);
});

test("PUT  User password not updated due the user not found", async () => {
    const testResponse = await testRequest.put("/control/update/" + userData[0].name + "/" + "Password123");
    let isIt = testResponse.text.includes('not')
    expect(isIt).toBe(true);
});
test("GET All users", async () => {
    try {
        for (let i = 0; i < userData.length; i++) {
            await model.addUser(userData[i].name, userData[i].Password);
        }
        const testResponse = await testRequest.get("/control/findall");
        const lines = (testResponse.text.match(/\n/g) || '').length + 1
        console.log(lines-1)
        console.log(userData.length)
        expect(lines-1 == userData.length).toBe(true);
    }
    catch (err) {
        console.error(err)
    }
});

test("DELETE a user", async () => {
    try {
        await model.addUser(userData[0].name, userData[0].Password);
        await model.addUser(userData[1].name, userData[1].Password);       
        await testRequest.delete("/control/delete/"+userData[0].name);
        const cursor = await model.getCollection().find();
        const results = await cursor.toArray();
        expect(results.length).toBe(1);
    }
    catch (err) {
        console.error(err)
    }
});
test("DELETE fail to delete user because of wrong name", async () => {
    try {
        await model.addUser(userData[0].name, userData[0].Password);
        await model.addUser(userData[1].name, userData[1].Password);       
        const testResponse = await testRequest.delete("/control/delete/"+"jasdlhasjhdjshakj");
        expect(testResponse.status).toBe(200);
        const cursor = await model.getCollection().find();
        const results = await cursor.toArray();
        expect(results.length).toBe(2);
    }
    catch (err) {
        console.error(err)
    }
});

test("POST fail case user 400", async () => {
    const testResponse = await testRequest.post("/control/")
    expect(testResponse.status).toBe(404);

});


test("POST fail case add error 500", async () => {
    await model.close()
    const testResponse = await testRequest.post("/control/add/" + userData[0].name + "/" + userData[0].Password)
    expect(testResponse.status).toBe(500);

});

test("POST fail case get a user error 500", async () => {
    await model.addUser(userData[0].name, userData[0].Password);
    await model.close()
    const testResponse = await testRequest.get("/control/find/" + userData[0].name);
    expect(testResponse.status).toBe(500);

});

test("POST fail case get all user error 500", async () => {
    let status = 0;
    try {
        for (let i = 0; i < userData.length; i++) {
            await model.addUser(userData[i].name, userData[i].Password);
        }
        await model.close()
        const status = await testRequest.get("/control/findall");
        expect(status.status).toBe(500);
    }
    catch (err) {
        expect(status.status).toBe(500);
    }
});

test("DELETE a user fail error 500", async () => {
    let status = 0;
    try {
        await model.addUser(userData[0].name, userData[0].Password);
        await model.addUser(userData[1].name, userData[1].Password);       
        await model.close()
        status = await testRequest.delete("/control/delete/"+userData[0].name);
        expect(status.status).toBe(500);
    }
    catch (err) {
        expect(status.status).toBe(500);
    }
});

test("PUT  User password updated error 500", async () => {
    let status = 0;
    try {
    await model.addUser(userData[0].name, userData[0].Password)
    await model.close()
    status =  await testRequest.put("/control/update/" + userData[0].name + "/" + "nesword123245");
    expect(status.status).toBe(500);
}
catch (err) {
    expect(status.status).toBe(500);
}
});



