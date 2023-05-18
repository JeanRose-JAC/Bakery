import { useLocation } from "react-router-dom";
import { AddRecipeForm } from "components/AddRecipeForm";

function RecipeCreation(){
    const {state} = useLocation();
    let emptyRecipe = {type: null, ingredients: null, servings: null, instructions: null}

    return(
        <div>
            {state && state.recipe ? <AddRecipeForm recipe={state.recipe}/> : <AddRecipeForm recipe={emptyRecipe}/>}
        </div>
    )
}

export {RecipeCreation};