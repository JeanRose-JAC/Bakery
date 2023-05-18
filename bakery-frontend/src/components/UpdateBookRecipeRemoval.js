import { useState } from "react"
import { useNavigate } from "react-router-dom"

function UpdateBookRecipeRemoval(props){
    const [title, setTitle] = useState(props.recipe.title);
    const navigate = useNavigate();

    const handleSubmit = async (event)=> {
        event.preventDefault();

        const requestOptions = {
            method: "PUT",
            body: JSON.stringify({
                recipeId: props.recipe._id,
                name: props.book.name
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
        }

        const response = await fetch ("http://localhost:1339/book/content/removal", requestOptions)
        const result = await response.json();
        if(response.status === 400){
            alert(result.errMessage);
        }
        else if (response.status === 500){
            alert(result.errMessage);
        }
        else{
            navigate("/book", {state:{book: props.book}})
        }
    }

    return(
        <div className="center">
            <h1>Remove Recipe From Book {props.book.name}</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="Title" column sm="2">Title</label>
                <input value={title} type="text" placeholder="Title..." onChange={(e) => setTitle(e.target.value)}></input>
                <p></p>
                {title && <button type="submit">Remove Recipe</button>}
            </form>
        </div>
    )

}

export {UpdateBookRecipeRemoval}