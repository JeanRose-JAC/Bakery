import { useLocation } from "react-router-dom"
import { ListRecipeObjects } from "components/ListRecipeObjects"
import { useState } from "react";
import { NavLink } from "react-router-dom";

function RecipeBook(){
    const state = useLocation();
    const [recipes, setRecipes] = useState([]);

    const callGetRecipes = async() => {
        let recipesData =[];

        const requestOptions = {
            method: "GET",
            credentials: "include", 
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }

        for(let count = 0; count < state.book.SavedRecipes.length; count++) {
            const response = await fetch ("http://localhost:1339/recipe/user/id/" + state.book.SavedRecipes[count], requestOptions);
            const result = await response.json();
            recipesData.push(result);
        }

        setRecipes(recipesData);
    }
    
    return(
        <div className="center">
            {state && <h1>Recipes from {state.book.name}</h1>}
            <NavLink to="/book/addition" state={{book:state.book}}><button>Add Recipes</button></NavLink>
            <p></p>
            <button onClick={callGetRecipes}>Get Recipes</button>
            {recipes[0] && state.book && <ListRecipeObjects recipes={recipes} name={state.book.name} book={state.book}/>}
        </div>
    )
}

export {RecipeBook}