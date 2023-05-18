import { DisplayRecipe } from "components/DisplayRecipe";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

/**
 * Displays all the recipes
 * 
 * @returns Element for getting all the recipes
 */
function Recipe(){
    const {state} = useLocation();

    return(
        <div id="wrapper">
            {state && state.recipe && <DisplayRecipe recipe={state.recipe}/>}
            {state.fromSearch ? <Link to="/recipe/creation" state={ {recipe: state.recipe}}> Add to recipe book </Link> : null}
        </div>
    );
}

export {Recipe};