import { useState } from "react";
import { ListRecipes } from "./ListQuickRecipes";

/**
 * Displays all of the recipes in the database
 * 
 * @returns A list of all the recipes
 */
function GetAllQuickRecipes(){
    const[recipe, setRecipe] = useState([]);


    const GetAllQuickRecipes  = async () => {
        const response = await fetch ("http://localhost:1339/recipe/", {method: "GET"})
        const result = await response.json();
        setRecipe(result);

    }
    

    return(
        <div className="center">
            <h1>Recipes</h1>
            <button onClick={GetAllQuickRecipes}>Get Quick Recipes</button>
            {recipe[0] && <ListRecipes recipes={recipe}/>}
        </div>
    );

}

export {GetAllQuickRecipes};