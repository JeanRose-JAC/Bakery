import { useRef } from "react";
import { useNavigate } from "react-router-dom";
/** component that lets the user enter the name of pokemon to add and their type
 *  and then calls the backend to add it.
 * Side-Effect: Passes the added pokemon using setAdded
 * Return JSX containing the form
 */


function FindRecipeForm(props) {
    const nameRef = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();


        const response = await fetch("http://localhost:1339/recipe/find/"+nameRef.current.value,{method: "GET"});
        const result = await response.json();
        if(response.status === 400) {
            navigate("/UserError",{ state: { errorMessage: result.errMessage}});
        }
        else if(response.status === 500) {
            navigate("/systemerror",{ state: { errorMessage: result.errMessage}});
        }
        else{
        props.setAdded(result);
        }

    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" placeholder="Name..." ref={nameRef} required />

            <button type="submit">find Recipe</button>
        </form>
    );

}

export { FindRecipeForm }