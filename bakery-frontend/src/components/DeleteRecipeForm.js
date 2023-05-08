import { useState} from "react";
import { useNavigate } from "react-router-dom";
import './style.css';

/**
 * Displays the form for deleting a recipe
 * 
 * @param {*} props function that sets the success message
 * @returns Element that contains the delete form
 */
function DeleteRecipeForm(props){
    const [userId, setUserId] = useState(null);
    const [title, setTitle] = useState(null);
    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        const requestOptions = {
            method: "DELETE",
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
            props.setAdded("Recipe deleted successfully.");
        }
    }

    return(
        <>
        <h1>Delete a Recipe</h1>
        <h3>Provide the username and title to delete a recipe.</h3>
        <form onSubmit={handleSubmit} className="recipeForm">
        
        <label htmlFor="Username" column sm="2">Username</label>
        <input type="text" placeholder="Username..." onChange={(e) => setUserId(e.target.value)}></input>
        
        <p/>
        
        <label htmlFor="Title" column sm="2">Title</label>
        <input type="text" placeholder="Title..." onChange={(e) => setTitle(e.target.value)}></input>

        <p/>

        {userId && title  && <button type="submit">Delete Recipe</button>}
        </form>  
        </>  
    );
}

export {DeleteRecipeForm};