import { useState } from "react";
import { DeleteRecipeForm } from "./DeleteRecipeForm"
import { DisplayRecipe } from "./DisplayRecipe";

/**
 * Function made for deleting a recipe
 * @returns Information about the function and the placeholders to use the form
 */
function DeleteRecipes() {
    const [added, setAdded] = useState({});


    return (
        <div className="center">
            <h1>Delete a certain recipe by its name</h1>
            <h5>Enter the name of the recipe that has to be deleted</h5>
            <DeleteRecipeForm setAdded={setAdded} />
        </div>

    );
}

export { DeleteRecipes };