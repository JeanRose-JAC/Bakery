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
    const [newPassword, setnewPassword] = useState(null);
    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        const requestOptions = {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify({
                password:password,
                newPassword:newPassword,
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
        }

        const response = await fetch ("http://localhost:1339/account/:username/editpassword", requestOptions)
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
             <h1>Update password</h1>
        <label htmlFor="Name" column sm="2">Current Password</label>
        <input type="text" placeholder="current password..." onChange={(e) => setUserPassword(e.target.value)}></input>    
        <p/>
        <label htmlFor="Name" column sm="2">New Passowrd</label>
        <input type="text" placeholder="New password..." onChange={(e) => setnewPassword(e.target.value)}></input>    
        <p/>
        {password  &&  newPassword &&<button type="submit">Update Password</button>}
        </form> 
       
      
    );
}

export {UpdateRecipeForm};