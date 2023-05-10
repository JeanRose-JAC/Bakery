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
            <h3>{props.recipe.title}</h3>
            <p>Published by {props.recipe.userId}</p>
            
            <p>Type: {props.recipe.type}</p>

            <p>Ingredients: {props.recipe.ingredients}</p>
            
            <p>Servings: {props.recipe.servings}</p>
            
            <p>Instructions: {props.recipe.instructions}</p>

        </Card>
    )

}

export {DisplayRecipe};