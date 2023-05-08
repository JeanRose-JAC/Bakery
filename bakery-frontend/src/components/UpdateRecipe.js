import {useState} from "react";
import { UpdateRecipeForm } from "./UpdateRecipeForm";
import { DisplayRecipe } from "./DisplayRecipe";

/**
 * Displays the form and card for updating a recipe
 * 
 * @returns Element that represents the form and card for updating a recipe
 */
function UpdateRecipe(){
    const [added, setAdded] = useState({});

    return(
        <div className="center">

            <UpdateRecipeForm setAdded={setAdded}/>
            <DisplayRecipe recipe={added}/> 
        </div>
    )
}

export {UpdateRecipe};