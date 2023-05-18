// import { useState } from "react";
// import { ListRecipes } from "./ListRecipes";

// /**
//  * Displays all of the recipes in the database
//  * 
//  * @returns A list of all the recipes
//  */
// function GetAllRecipes(){
//     const[recipe, setRecipe] = useState([]);


//     const callGetAllRecipe  = async () => {
//         const response = await fetch ("http://localhost:1339/recipe/", {method: "GET"})
//         const result = await response.json();
//         setRecipe(result);

//     }
    

//     return(
//         <div className="center">
//             <h1>Saved Recipes</h1>
//             <button onClick={callGetAllRecipe} className="buttonIngredients">Get Saved Recipes</button>
//             <button onClick={callGetAllRecipe} className="buttonBook">Get All ingredients</button>
//             <button onClick={callGetAllRecipe} className="buttonBook">My recipes</button>  
//             {recipe[0] && <ListRecipes recipes={recipe}/>}
//         </div>
//     );

// }

// export {GetAllRecipes};

import { useContext } from 'react';
import { LoggedInContext } from './App';
import { Link } from 'react-router-dom';
import { GetUsersRecipeBooks } from './GetUsersRecipeBooks';

function FavoriteLayout(){
    const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);

    setIsLoggedIn(true);

    return(
        <div>
            {isLoggedIn ? 
            <div>
                <GetUsersRecipeBooks/>
            </div> : 
            <div>
                You must be logged in to access this page
                <p></p>
                <Link to="/login">Log In</Link>    
            </div>}
        </div>
    )
}

export {FavoriteLayout}