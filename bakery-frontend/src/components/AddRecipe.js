import {useState} from "react";
import { AddRecipeForm } from "./AddRecipeForm";
import { DisplayRecipe } from "./DisplayRecipe";

/**
 * Displays the form and card for adding a recipe
 * 
 * @returns Element that represents the form and card for adding a recipe
 */
function AddRecipe(){
    const [added, setAdded] = useState({});

    return(
        <div className="center">
            <AddRecipeForm setAdded={setAdded}/>
            <DisplayRecipe recipe={added}/> 
        </div>
    )
}

export {AddRecipe};