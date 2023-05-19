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
    const [password, setUserPassword] = useState(null);
    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        const requestOptions = {
            method: "PUT",
            body: JSON.stringify({
                password:password, }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
        }

        const response = await fetch ("http://localhost:1339/recipe/" + password)
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
        <h4 className="flex">
        Change Your password
        <form onSubmit={handleSubmit} className="recipeForm">
        <input type="text" placeholder="New password..." onChange={(e) => setUserPassword(e.target.value)}></input>
        {password  && <button type="submit">Update Password</button>}
        <p/>
        </form> 
        </h4>   
    );
}

export {UpdateRecipeForm};