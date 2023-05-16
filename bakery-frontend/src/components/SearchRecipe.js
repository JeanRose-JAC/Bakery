import { useState } from "react";
import { SearchRecipeForm } from "./SearchRecipeForm";
import { ListRecipesFromSearch } from "./ListRecipesFromSearch";

function SearchRecipe(){
    const [recipe, setAdded] = useState([]);

    return(
        <div>
            <SearchRecipeForm setAdded={setAdded}/>
            {recipe[0] && <ListRecipesFromSearch recipes={recipe}/>}
        </div>
    );

}

export {SearchRecipe};