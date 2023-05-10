import {useState} from "react";
import { DisplayRecipe } from "./DisplayRecipe";
import { GetSingleRecipeForm } from "./GetSingleRecipeForm";

/**
 * Displays the form and card for getting a recipe
 * 
 * @returns Element that represents the form and card for getting a recipe
 */
function GetSingleRecipe(){
    const [added, setAdded] = useState({});

    return(
        <div className="center">
            <GetSingleRecipeForm setAdded={setAdded}/>
            <DisplayRecipe recipe={added}/>
        </div>
    )
}

export {GetSingleRecipe};