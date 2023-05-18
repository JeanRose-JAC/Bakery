import { DisplayRecipe } from "components/DisplayRecipe";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { LoggedInContext } from "components/App";

/**
 * Displays all the recipes
 * 
 * @returns Element for getting all the recipes
 */
function Recipe(){
    const {state} = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);

    return(
        <div id="wrapper">
            {state && state.recipe && <DisplayRecipe recipe={state.recipe}/>}
            {state.fromSearch && isLoggedIn ? <Link to="/recipe/creation" state={ {recipe: state.recipe}}> Save </Link> : null}
        </div>
    );
}

export {Recipe};