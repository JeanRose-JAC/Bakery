import { GetAllRecipes } from "components/FavoriteLayout";

/**
 * Displays all the recipes
 * 
 * @returns Element for getting all the Quick recipes
 */
function Favorite(){

    return (
        <div id="wrapper">
            <GetAllRecipes/>
        </div>
        );
}

export {Favorite};