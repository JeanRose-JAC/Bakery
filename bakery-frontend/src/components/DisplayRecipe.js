import { Card } from "./Card";

/**
 * Displays the formatted recipe card
 * 
 * @param {*} props recipe object
 * @returns A formatted recipe card with its information
 */
function DisplayRecipe(props){

    return(
        <Card id="recipeCard">
            <h1>{props.recipe.title}</h1>
            <h3>Published by {props.recipe.userId}</h3>
            
            <h2>Ingredients: {props.recipe.ingredients}</h2>
            
            <h2>Servings: {props.recipe.servings}</h2>
            
            <h2>Instructions: {props.recipe.instructions}</h2>

        </Card>
    )

}

export {DisplayRecipe};