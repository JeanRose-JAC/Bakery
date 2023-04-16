require("dotenv").config();
const app = require('./app.js');
const port = 1339;
const url = process.env.URL_PRE + process.env.MONGODB_PWD + process.env.URL_POST;

//models
const userAccountsModel = require("./models/userAccountsModel.js");
const recipesModel = require("./models/recipesModel.js");
const recipeBooksModel = require("./models/recipeBooksModel.js");

userAccountsModel.initialize(url, "bakery_db", false)
.then(() => {
    recipesModel.initialize(url, "bakery_db", false)
})
.then(() => {
    recipeBooksModel.initialize(url, "bakery_db", false)
})
.then(
    app.listen(port) // Run the server
);
