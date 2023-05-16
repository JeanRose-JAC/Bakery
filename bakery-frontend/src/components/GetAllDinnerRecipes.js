import { useEffect,useState } from "react";
import { ListRecipes } from "./ListDinnerRecipes";

/**
 * Displays all of the recipes in the database
 * 
 * @returns A list of all the recipes
 */
function GetAllDinnerRecipes(){
    const[recipe, setRecipe] = useState([]);
    useEffect(()=> {
        GetAllDinnerRecipesControl(setRecipe)

    },[recipe])
    return(
        <div className="center">
            <h1> recipes</h1>
            {recipe[0] && <ListRecipes recipes={recipe}/>}
        </div>
    );
}
async function GetAllDinnerRecipesControl(setRecipe){
    const response = await fetch ("http://localhost:1339/recipe/", {method: "GET"})
    const result = await response.json();
    setRecipe(result);

}

export {GetAllDinnerRecipes};