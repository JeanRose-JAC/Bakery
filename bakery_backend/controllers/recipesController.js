const express = require('express');
const router = express.Router();
const routeRoot = '/';
const logger = require('../logger.js');
const recipesModel = require("../models/recipesModel.js");

const InvalidInputError = require('../models/invalidInputError.js');
const DatabaseError = require('../models/databaseError.js');


router.post('/recipe', createRecipe);
/**
 * Handles the creation of a new recipe
 * 
 * @param {object} req request object with body containing : userId, title, ingredients, serving and instructions 
 * @param {object} res response object with body containing the recipe object
 * 
 */
async function createRecipe(req, res){
    let output;

    try{
        let userId = req.body.userId;
        let title = req.body.title;
        let ingredients = req.body.ingredients;
        let servings = req.body.servings;
        let instructions = req.body.instructions;

        let result = await recipesModel.addNewRecipe(userId, title, ingredients, servings, instructions);

        if(result == null){
            output = "Something went wrong with user input. Recipe was not created.";
            logger.info(output);
            throw new InvalidInputError(output);
        }

        res.status("200");
        output = "Successfully created recipe : " + title;
        logger.info(output);
        res.send(result);
    }
    catch(error){
        if(error instanceof DatabaseError){
            output = "***A database error occurred: " + error.message;
            res.status("500");
            logger.error(output);
            res.send({errorMessage: output});
        }
        else if(error instanceof InvalidInputError){
            output = "***An input error occurred: " + error.message;
            res.status("400");
            logger.error(output);
            res.send({errorMessage: output});
        }
        else{
            output = "***Unexpected error encountered: " + error.message;
            res.status("500");
            logger.error(output);
            res.send({errorMessage: output});
        }
    }

}

router.get('/recipe', showRecipes);
/**
 * Handles the retrieving of all the recipes 
 * 
 * @param {object} req request object 
 * @param {object} res response object with body containing an array of recipe objects
 */
async function showRecipes(req, res){
    let output;

    try{

        let result = await recipesModel.getRecipes();

        if(result == null){
            output = "Failed to retrieve recipes"
            logger.info(output);
            throw new InvalidInputError(output);
        }

        res.status("200");
        output = "Successfully retrieved all recipes";
        logger.info(output);
        res.send(result);
    }
    catch(error){
        if(error instanceof DatabaseError){
            output = "***A database error occurred: " + error.message;
            res.status("500");
            logger.error(output);
            res.send({errorMessage: output});
        }
        else if(error instanceof InvalidInputError){
            output = "***An input error occurred: " + error.message;
            res.status("400");
            logger.error(output);
            res.send({errorMessage: output});
        }
        else{
            output = "***Unexpected error encountered: " + error.message;
            res.status("500");
            logger.error(output);
            res.send({errorMessage: output});
        }
    }
}

router.get('/recipe/:userId/', showRecipesOfOneUser);
/**
 * Handles the retrieving of all recipes of one user
 * 
 * @param {object} req request object with the parameters containing the userId 
 * @param {object} res response object with the body containing an array of the user's recipes
 */
async function showRecipesOfOneUser(req, res){
    let output;

    try{
        let userId = req.params.userId;

        let result = await recipesModel.getRecipesOfOneUser(userId);

        if(result == null){
            output = userId + " does not have any recipes.";
            logger.info(output);
            throw new InvalidInputError(output);
        }
        else{
            output = "Successfully retrieved all recipes of : " + userId;
            res.status("200");
            logger.info(output);
            res.send(result);
        }

    }
    catch(error){
        if(error instanceof DatabaseError){
            output = "***A database error occurred: " + error.message;
            res.status("500");
            logger.error(output);
            res.send({errorMessage: output});
        }
        else if(error instanceof InvalidInputError){
            output = "***An input error occurred: " + error.message;
            res.status("400");
            logger.error(output);
            res.send({errorMessage: output});
        }
        else{
            output = "***Unexpected error encountered: " + error.message;
            res.status("500");
            logger.error(output);
            res.send({errorMessage: output});
        }
    }
}


router.get('/recipe/:userId/:title', showOneRecipe);
/**
 * Handles the retrieving of a recipe
 * 
 * @param {object} req request object with the parameters containing the userId and title
 * @param {object} res response object with the body containing the specified recipe object 
 */
async function showOneRecipe(req, res){
    let output;

    try{
        let userId = req.params.userId;
        let title = req.params.title;

        let result = await recipesModel.getOneRecipe(userId, title);

        if(result == null){
            output = "Inexistent recipe by "+ userId +": " + title;
            logger.info(output);
            throw new InvalidInputError(output);
        }
        else{
            output = "Successfully retrieved recipe: " + title;
            res.status("200");
            logger.info(output);
            res.send(result);
        }

    }
    catch(error){
        if(error instanceof DatabaseError){
            output = "***A database error occurred: " + error.message;
            res.status("500");
            logger.error(output);
            res.send({errorMessage: output});
        }
        else if(error instanceof InvalidInputError){
            output = "***An input error occurred: " + error.message;
            res.status("400");
            logger.error(output);
            res.send({errorMessage: output});
        }
        else{
            output = "***Unexpected error encountered: " + error.message;
            res.status("500");
            logger.error(output);
            res.send({errorMessage: output});
        }
    }
}

router.put('/recipe/:userId/:title', updateRecipe);
/**
 * Handles the updating of a recipe
 * 
 * @param {object} req request object with the parameters containing the userId and title and the body containing
 * the new title, ingredients, servings and instructions
 * @param {object} res response object with the body containing the updated recipe object 
 */
async function updateRecipe(req, res){
    let output;

    try{
        let userId = req.params.userId;
        let title = req.params.title;

        let newTitle;
        let newIngredients;
        let newServings;
        let newInstructions;

        if(req.body.newTitle != null)
            newTitle= req.body.newTitle;
        else
            newTitle = "";

        if(req.body.newIngredients != null)
            newIngredients = req.body.newIngredients;

        else
            newIngredients = "";

        if(req.body.newServings != null)
            newServings = req.body.newServings;
        else
            newServings = "";

        if(req.body.newInstructions != null)
            newInstructions = req.body.newInstructions;
        else
            newInstructions = "";

        let result = await recipesModel.updateRecipe(userId, title, newTitle, newIngredients, newServings, newInstructions);

        if(result.modifiedCount > 0){
            output = "Successfully updated recipe: " + title;
            res.status("200");
            logger.info(output);

            if(newTitle != "")
                res.send(await recipesModel.getOneRecipe(userId, newTitle));
            else
                res.send(await recipesModel.getOneRecipe(userId, title));
        }
        else{
            output = "Failed to update recipe: " + title;
            logger.info(output);
            throw new InvalidInputError(output);
        }
    }
    catch(error){
        if(error instanceof DatabaseError){
            output = "***A database error occurred: " + error.message;
            res.status("500");
            logger.error(output);
            res.send({errorMessage: output});
        }
        else if(error instanceof InvalidInputError){
            output = "***An input error occurred: " + error.message;
            res.status("400");
            logger.error(output);
            res.send({errorMessage: output});
        }
        else{
            output = "***Unexpected error encountered: " + error.message;
            res.status("500");
            logger.error(output);
            res.send({errorMessage: output});
        }
    }
}

router.delete('/recipe/:userId/:title', deleteRecipe);
/**
 * Handles the deleting of a recipe
 * 
 * @param {object} req request object with the parameters containing the userId and title
 * @param {object} res response object with the body containing an object with a boolean acknowledged and integer deletedCount 
 */
async function deleteRecipe(req, res){
    let output;

    try{
        let userId = req.params.userId;
        let title = req.params.title;

        let result = await recipesModel.deleteRecipe(userId, title);

        if(result.deletedCount > 0){
            output = "Successfully deleted recipe: " + title;
            res.status("200");
            logger.info(output);
            res.send(result);
        }
        else{
            output = "Failed to delete recipe: " + title;
            logger.info(output);
            throw new InvalidInputError(output);
        }
        
    }
    catch(error){
        if(error instanceof DatabaseError){
            output = "***A database error occurred: " + error.message;
            res.status("500");
            logger.error(output);
            res.send({errorMessage: output});
        }
        else if(error instanceof InvalidInputError){
            output = "***An input error occurred: " + error.message;
            res.status("400");
            logger.error(output);
            res.send({errorMessage: output});
        }
        else{
            output = "***Unexpected error encountered: " + error.message;
            res.status("500");
            logger.error(output);
            res.send({errorMessage: output});
        }
    }
}

module.exports = {
    router,
    routeRoot
}