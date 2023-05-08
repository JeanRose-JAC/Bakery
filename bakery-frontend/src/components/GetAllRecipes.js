import { useState } from "react";
import { ListRecipes } from "./ListRecipes";

/**
 * Displays all of the recipes in the database
 * 
 * @returns A list of all the recipes
 */
function GetAllRecipes(){
    const[recipe, setRecipe] = useState([]);

    const callGetAllRecipe  = async () => {
        const response = await fetch ("http://localhost:1339/recipe/", {method: "GET"})
        const result = await response.json();
        setRecipe(result);

    }

    return(
        <div className="center">
            <h1>All recipes</h1>
            <button onClick={callGetAllRecipe}>Get All Recipes</button>
            {recipe[0] && <ListRecipes recipes={recipe}/>}
        </div>
    );

}

export {GetAllRecipes};