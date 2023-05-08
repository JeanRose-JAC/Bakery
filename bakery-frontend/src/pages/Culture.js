import { GetAllRecipes } from "components/GetAllRecipes";

/**
 * Displays all the recipes
 * 
 * @returns Element for getting all the Culture recipes
 */
function Culture(){

    return (
        <div id="wrapper">
            <GetAllRecipes/>
        </div>
        );
}

export {Culture};