import { useEffect,useState } from "react";
import { ListRecipes } from "./ListDessertRecipes";

/**
 * Displays all of the recipes in the database
 * 
 * @returns A list of all the recipes
 */
function GetAllDessertRecipes(){
    const[recipe, setRecipe] = useState([]);
    useEffect(()=> {
        GetAllDessertRecipesControl(setRecipe)

    },[recipe])
    return(
        <div className="center">
            <h1> recipes</h1>
            {recipe[0] && <ListRecipes recipes={recipe}/>}
        </div>
    );
}
async function GetAllDessertRecipesControl(setRecipe){
    const response = await fetch ("http://localhost:1339/recipe/", {method: "GET"})
    const result = await response.json();
    setRecipe(result);

}

export {GetAllDessertRecipes};