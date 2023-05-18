import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function AddRecipesToBookForm(){
    const {state} = useLocation();
    const [title, setTitle] = useState(state.recipe.title);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const requestOptions = {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify({
                recipeId: state.recipe._id,
                name: state.book.name
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
        }
    
        const response = await fetch ("http://localhost:1339/book/content/new", requestOptions)
        const result = await response.json();
        if(response.status === 400){
            alert(result.errMessage);
        }
        else if (response.status === 500){
            alert(result.errMessage);
        }
        else{
            navigate("/favorite");
        }
    
    }

    return(
        <div className="center">
            <h1>Add Recipe</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="Title" column sm="2">Title</label>
                <input value={title} type="text" placeholder="Title..." onChange={(e) => setTitle(e.target.value)}></input>
                <p></p>
                {title && <button type="submit">Add Recipe</button>}
            </form>
        </div>
    )
}

export {AddRecipesToBookForm} 