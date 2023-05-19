import { useState} from "react";
import { useNavigate } from "react-router-dom";
import './style.css';

/**
 * Displays the form for updating a recipe
 * 
 * @param {*} props function for keeping track of the updated recipe
 * @returns Element that contains the update form
 */
function DeleteUserAccountForm(props){
    const navigate = useNavigate();
    const [password, setUserPassword] = useState(null);
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        const requestOptions = {
            method: "DELETE",
            credentials: "include",
            body: JSON.stringify({
                password:password,
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
        }

        const response = await fetch ("http://localhost:1339/account/", requestOptions)
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
    
        <form onSubmit={handleSubmit} className="recipeForm">
             <h1>Delete Account</h1>
        <label htmlFor="Name" column sm="2">Enter Your Password to delete account</label>
        <input type="text" placeholder="current password..." onChange={(e) => setUserPassword(e.target.value)}></input> 
        {<button type="submit">DeleteAccount</button>}
        </form> 
       
      
    );
}

export {DeleteUserAccountForm};