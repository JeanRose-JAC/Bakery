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
    const [title, setTitle] = useState(props.recipe.title);
    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        const requestOptions = {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
        }

        const response = await fetch ("http://localhost:1339/recipe/" + title, requestOptions)
        const result = await response.json();
        if(response.status === 400){
            alert(result.errorMessage);
        }
        else if (response.status === 500){
            alert(result.errorMessage);
        }

        const requestOptions2 = {
            method: "PUT",
            credentials : "include",
            body: JSON.stringify({
                recipeId: props.recipe._id,
                name: props.book.name
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
        }

        const response2 = await fetch ("http://localhost:1339/book/content/removal", requestOptions)
        const result2 = await response.json();
        if(response2.status === 400){
            alert(result2.errMessage);
        }
        else if (response2.status === 500){
            alert(result2.errMessage);
        }
        else{
            navigate("/favorite")        
        }

    }

    return(
        <div className="center">
        <h1>Delete a Recipe</h1>
        <form onSubmit={handleSubmit} className="recipeForm">
        
        <label htmlFor="Title" column sm="2">Title</label>
        <input type="text" placeholder="Title..." onChange={(e) => setTitle(e.target.value)}></input>

        <p/>

        {title && <button type="submit">Delete Recipe</button>}
        </form>  
        </div> 
    );
}

export {DeleteRecipeForm};