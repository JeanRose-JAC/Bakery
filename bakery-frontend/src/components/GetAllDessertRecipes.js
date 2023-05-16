import { useState } from "react";
import { ListRecipes } from "./ListDessertRecipes";

/**
 * Displays all of the recipes in the database
 * 
 * @returns A list of all the recipes
 */
function GetAllDessertRecipes(){
    const[recipe, setRecipe] = useState([]);


    const GetAllDessertRecipes  = async () => {
        const response = await fetch ("http://localhost:1339/recipe/", {method: "GET"})
        const result = await response.json();
        setRecipe(result);

    }
    

    return(
        <div className="center">
            <h1>Recipes</h1>
            <button onClick={GetAllDessertRecipes}>Get All Breakfast Recipes</button>
            {recipe[0] && <ListRecipes recipes={recipe}/>}
        </div>
    );

}

export {GetAllDessertRecipes};