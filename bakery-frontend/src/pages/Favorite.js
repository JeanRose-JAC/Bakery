// import { GetAllRecipes } from "components/FavoriteLayout";
import {FavoriteLayout} from "components/FavoriteLayout"

/**
 * Displays all the recipes
 * 
 * @returns Element for getting all the Quick recipes
 */
function Favorite(){

    return (
        <div id="wrapper">
            <FavoriteLayout/>
        </div>
        );
}

export {Favorite};