import { useState} from "react";
import { useNavigate } from "react-router-dom";
import './style.css';

/**
 * Displays the form for adding a recipe
 * 
 * @param {*} props function for keeping track of the added recipe
 * @returns Element that contains the add form
 */
function AddRecipeForm(props){
    const [title, setTitle] = useState(props.recipe.title);
    const [type, setType] = useState(props.recipe.type);
    const [ingredients, setIngredient] = useState(props.recipe.ingredients);
    const [servings, setServings] = useState(props.recipe.servings);
    const [instructions, setInstructions] = useState(props.recipe.instructions);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const requestOptions = {
            method: "POST",
            body: JSON.stringify({
                title: title, 
                type: type, 
                ingredients: ingredients, 
                servings: servings, 
                instructions: instructions}),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
        }

        const response = await fetch ("http://localhost:1339/recipe", requestOptions)
        const result = await response.json();
        if(response.status === 400){
            navigate("/", {state: {errorMessage: result.errorMessage, link: "/", linkLabel:"Home"}});
        }
        else if (response.status === 500){
            navigate("/", {state: {errorMessage: result.errorMessage, link: "/", linkLabel:"Home"}});
        }
        else{
            navigate("/recipe", {state:{recipe: result, fromSearch: false}})
        }
    }

    return(
        <>
        <h1>Add your own recipe!</h1>
        <h3>Fill up all the fields to add a new recipe.</h3>
        <form onSubmit={handleSubmit} className="recipeForm">

        <label htmlFor="Title" column sm="2">Title</label>
        <input value={title} type="text" placeholder="Title..." onChange={(e) => setTitle(e.target.value)}></input>

        <p/>

        <label htmlFor="Type" column sm="2">Type</label>
        <input value={type} type="text" placeholder="Type..." onChange={(e) => setType(e.target.value)}></input>

        <p/>

        <label htmlFor="Ingredients" column sm="2">Ingredients</label>
        <textarea value={ingredients}  as="textarea" rows={3} type="text" placeholder="Ingredients..." onChange={(e) => setIngredient(e.target.value)}></textarea>

        <p/>

        <label htmlFor="Number of servings" column sm="2">Number of Servings</label>
        <input value={servings} type="text" placeholder="Servings..." onChange={(e) => setServings(e.target.value)}></input>

        <p/>

        <label htmlFor="Instructions" column sm="2">Instructions</label>
        <textarea value={instructions} as="textarea" rows={3} type="text" placeholder="Instructions..." onChange={(e) => setInstructions(e.target.value)}></textarea>

        <p/>

        {title && ingredients && servings && instructions && <button type="submit">Add Recipe</button>}
        </form> 
        </>   
    );
}

export {AddRecipeForm};