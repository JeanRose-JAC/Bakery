import { useState } from "react"
import { ListRecipesForAdditionInBook } from "./ListRecipesForAdditionInBook";

function UpdateBookRecipeAddition({book}){
    const [recipes, setRecipes] = useState([]);

    const getAllRecipes = async()=>{
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }
    
        const response = await fetch ("http://localhost:1339/recipe/recipe", requestOptions);
        const result = await response.json();
        setRecipes(result);
    }

    return(
        <div className="center">
            <h1>Add Recipe to Book {book.name}</h1>
            <button onClick={getAllRecipes}View All recipes></button>
            {recipes[0] && <ListRecipesForAdditionInBook book={book} recipes={recipes}/>}
        </div>
    );
}

export {UpdateBookRecipeAddition}