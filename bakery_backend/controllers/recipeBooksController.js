const express = require('express');
const router = express.Router();
const routeRoot = '/book';
const logger = require('../logger.js');
const recipeBooksModel = require("../models/recipeBooksModel.js");
const model = require('../models/recipeBooksModel.js');
const DatabaseError  = require('../models/databaseError.js');
const  InvalidInputError  = require('../models/invalidInputError.js');



/**
 * Adds a recipe book into the database and sends a response status depending of the result
 * being positive or negative 
 * @param {*} response the response object from the server
 * @param {*} request the request object from the server
 */
router.post('/', add);
async function add(request, response) {
    try{
    const added = await model.addBook(request.body.userId, request.body.name,request.body.SavedRecipes)
    if(added){
    response.status("200");
    response.send(added)
    }
    else{
        response.status("400");
        response.send("failed to add recipe book");
    }
    }
    catch(err)
    {
        console.log("Failed to add a recipe book: " + err.message);
        if(err instanceof DatabaseError){
            response.status("500");
            response.send({ errMessage: "system error while trying to add recipe book: "+ err.message});
        }
        else if(err instanceof InvalidInputError){
            response.status("400");
            response.send({ errMessage: "Validation error while trying to add recipe book: "+ err.message});
        }
        else{
            response.status("500");
            response.send({ errMessage: "Unexpected error while trying to add recipe book: "+ err.message});
        }
        
    }
}


/**
 * gets a recipe book from the database and sends a response status depending of the result
 * being positive or negative
 * @param {*} response the response object from the server
 * @param {*} request the request object from the server
 */
router.get('/find/:userId/:name', find);
async function find(request, response) {
    try{

        let answer = await model.getSingleRecipeBook(request.params.userId, request.params.name)
    
        if(answer != null){
            response.status("200");
            response.send(answer)
            }
            else{
                response.status("400");
                response.send({ errMessage: "Validation error while trying to find recipe book: " + request.params.name + " does not exist"});
            }
    
        }
        catch(err)
        {
            console.log("Failed to delete a recipe: " + err.message);
            if(err instanceof DatabaseError){
                response.status("500");
                response.send({ errMessage: "system error while trying to find recipe book: "+ err.message});
            }
            else if(err instanceof InvalidInputError){
                response.status("400");
                response.send({ errMessage: "Validation error while trying to find recipe book: "+ err.message});
            }
            else{
                response.status("500");
                response.send({ errMessage: "Unexpected error while trying to find recipe book: "+ err.message});
            }
            
        }
}

/**
 * find all the recipe books from the database and sends a response status depending of the result
 * being positive or negative
 * @param {*} response the response object from the server
 * @param {*} request the request object from the server
 */
router.get('/', findAll);
async function findAll(request, response) {
    try{

    let answer = await model.getAllRecipeBooks()
 
    if(answer != null){
        response.status("200");
        response.send(answer)
    }

    else{
    response.send("There is no recipe book in the database currenctly");
    }

    }
    catch(err)
    {
        if(err instanceof DatabaseError){
            response.status("500");
            response.send("system error while trying to all recipes book: "+ err.message);
        }
        else if(err instanceof InvalidInputError){
            response.status("400");
            response.send("Validation error while trying to all find recipes book" + err.message);
        }
        else{
            response.status("500");
            response.send("unexpected error while trying to all find recipes book: "+ err.message);
        }
    }
}


/**
 * delete a recipe book into the database and sends a response status depending of the result
 * being positive or negative
 * @param {*} response the response object from the server
 * @param {*} request the request object from the server
 */
router.delete('/', deletes);
async function deletes(request, response) {
    try{

    let answer = await model.deleteRecipeBook(request.body.userId, request.body.name)

    if(answer.deletedCount == 1){
        response.status("200");
        response.send(answer)
        }
        else{
            response.status("400");
            response.send({ errMessage: "Validation error while trying to delete the recipe book: " + request.body.name + " because it does not exist"});
        }

    }
    catch(err)
    {
        console.log("Failed to delete a recipe book: " + err.message);
        if(err instanceof DatabaseError){
            response.status("500");
            response.send({ errMessage: "system error while trying to delete recipe book: "+ err.message});
        }
        else if(err instanceof InvalidInputError){
            response.status("400");
            response.send({ errMessage: "Validation error while trying to delete recipe book: "+ err.message});
        }
        else{
            response.status("500");
            response.send({ errMessage: "Unexpected error while trying to delete recipe book: "+ err.message});
        }
        
    }
}




/**
 * update a recipe book name into the database and sends a response status depending of the result
 * being positive or negative
 * @param {*} response the response object from the server
 * @param {*} request the request object from the server
 */
router.put('/name', updateName);
async function updateName(request, response) {
    try{

    let answer = await model.updateRecipeBoookName(request.body.userId, request.body.name,request.body.newName)

    if(answer.modifiedCount != 0){
        response.status("200");
        const recipe =  {userId: request.body.userId, name: request.body.name, type: request.body.SavedRecipes}
        response.send(recipe);
    }

    else{
        response.status("400");
        response.send({ errMessage: "Validation error while trying to update recipe book: " + request.body.name + " does not exist or the new name is invalid"});
    }

    }
    catch(err)
    {
        console.log("Failed to delete a recipe: " + err.message);
        if(err instanceof DatabaseError){
            response.status("500");
            response.send({ errMessage: "system error while trying to update recipe book: "+ err.message});
        }
        else if(err instanceof InvalidInputError){
            response.status("400");
            response.send({ errMessage: "Validation error while trying to update recipe book: "+ err.message});
        }
        else{
            response.status("500");
            response.send({ errMessage: "Unexpected error while trying to update recipe book: "+ err.message});
        }
    }
}

/**
 * update a recipe book content into the database and sends a response status depending of the result
 * being positive or negative
 * @param {*} response the response object from the server
 * @param {*} request the request object from the server
 */
router.put('/content', updateContent);
async function updateContent(request, response) {
    try{

    let answer = await model.updateRecipeBoookContent(request.body.userId, request.body.name,request.body.content)

    if(answer.modifiedCount != 0){
        response.status("200");
        const recipe =  {userId: request.body.userId, name: request.body.name, SavedRecipes: request.body.SavedRecipes}
        response.send(recipe);
    }

    else{
        response.status("400");
        response.send({ errMessage: "Validation error while trying to update recipe book : " + request.body.name + " does not exist or the new content is invalid"});
    }

    }
    catch(err)
    {
        console.log("Failed to delete a recipe: " + err.message);
        if(err instanceof DatabaseError){
            response.status("500");
            response.send({ errMessage: "system error while trying to update recipe book: "+ err.message});
        }
        else if(err instanceof InvalidInputError){
            response.status("400");
            response.send({ errMessage: "Validation error while trying to update recipe book: "+ err.message});
        }
        else{
            response.status("500");
            response.send({ errMessage: "Unexpected error while trying to update recipe book: "+ err.message});
        }
    }
}



module.exports = {
    router,
    routeRoot,
}