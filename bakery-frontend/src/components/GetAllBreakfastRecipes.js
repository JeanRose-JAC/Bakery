import { useState } from "react";
import { ListRecipes } from "./ListBreakfastRecipes ";

/**
 * Displays all of the recipes in the database
 * 
 * @returns A list of all the recipes
 */

function GetAllBreakfastRecipes(){



    
    const[recipe, setRecipe] = useState([]);


    const GetAllBreakfastRecipes  = async () => {
        const response = await fetch ("http://localhost:1339/recipe/", {method: "GET"})
        const result = await response.json();
        setRecipe(result);

    }
    

    return(
        <div className="center">
            <h1> recipes</h1>
            <button onClick={GetAllBreakfastRecipes}>Get All Breakfast Recipes</button>
            {recipe[0] && <ListRecipes recipes={recipe}/>}
        </div>
    );

}

export {GetAllBreakfastRecipes};