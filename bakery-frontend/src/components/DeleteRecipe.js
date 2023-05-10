import {useState} from "react";
import { DeleteRecipeForm } from "./DeleteRecipeForm";

/**
 * Displays the form for deleting a recipe
 * 
 * @returns Element that represents the form for deleting a recipe
 */
function DeleteRecipe(){
    const [added, setAdded] = useState(null);

    return(
        <div className="center">
            <DeleteRecipeForm setAdded={setAdded}/>
            <p>{added}</p>
        </div>
    )
}

export {DeleteRecipe};