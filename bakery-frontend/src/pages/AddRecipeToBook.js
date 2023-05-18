import { useLocation } from "react-router-dom"
import { UpdateBookRecipeAddition } from "components/UpdateBookRecipeAddition";

function AddRecipeToBook(){
    const {state} = useLocation();

    return(
        <div>
        {state && state.book && <UpdateBookRecipeAddition recipe={state.recipe}/>}
        </div>
    )
}

export {AddRecipeToBook}