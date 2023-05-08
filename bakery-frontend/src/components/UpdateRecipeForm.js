import { useState} from "react";
import { useNavigate } from "react-router-dom";
import './style.css';

/**
 * Displays the form for updating a recipe
 * 
 * @param {*} props function for keeping track of the updated recipe
 * @returns Element that contains the update form
 */
function UpdateRecipeForm(props){
    const [userId, setUserId] = useState(null);
    const [title, setTitle] = useState(null);
    const [newTitle, setNewTitle] = useState(null);
    const [newIngredients, setNewIngredient] = useState(null);
    const [newServings, setNewServings] = useState(null);
    const [newInstructions, setNewInstructions] = useState(null);
    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        const requestOptions = {
            method: "PUT",
            body: JSON.stringify({
                newTitle:newTitle, 
                newIngredients:newIngredients, 
                newServings:newServings, 
                newInstructions:newInstructions}),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
        }

        const response = await fetch ("http://localhost:1339/recipe/" + userId + "/" + title, requestOptions)
        const result = await response.json();
        if(response.status === 400){
            navigate("/usererror", {state: {errorMessage: result.errorMessage, link: "/admin", linkLabel:"Admin"}});
        }
        else if (response.status === 500){
            navigate("/systemerror", {state: {errorMessage: result.errorMessage, link: "/admin", linkLabel:"Admin"}});
        }
        else{
            props.setAdded(result);
        }
    }

    return(
        <>
        <h1>Update a Recipe</h1>
        <h3>Provide username and title to update a recipe. You can update one or more information.</h3>
        <form onSubmit={handleSubmit} className="recipeForm">
    
        <label htmlFor="Username" column sm="2">Username</label>
        <input type="text" placeholder="Username..." onChange={(e) => setUserId(e.target.value)}></input>
    
        <p/>
    
        <label htmlFor="Title" column sm="2">Title</label>
        <input type="text" placeholder="Title..." onChange={(e) => setTitle(e.target.value)}></input>

        <p/>

        <label htmlFor="New Title" column sm="2">New Title</label>
        <input type="text" placeholder="New Title..." onChange={(e) => setNewTitle(e.target.value)}></input>
        
        <p/>
    
        <label htmlFor="New Ingredients" column sm="2">New Ingredients</label>
        <textarea as="textarea" rows={3} type="text" placeholder="New Ingredients..." onChange={(e) => setNewIngredient(e.target.value)}></textarea>

        <p/>
    
        <label htmlFor="New Number of servings" column sm="2">New Number of Servings</label>
        <input type="text" placeholder="New Servings..." onChange={(e) => setNewServings(e.target.value)}></input>
        
        <p/>
    
        <label htmlFor="New Instructions" column sm="2">New Instructions</label>
        <textarea as="textarea" rows={3} type="text" placeholder="New Instructions..." onChange={(e) => setNewInstructions(e.target.value)}></textarea>
        
        <p/>

        {userId && title && (newTitle || newIngredients || newServings || newInstructions) && <button type="submit">Update Recipe</button>}
        </form> 
        </>   
    );
}

export {UpdateRecipeForm};