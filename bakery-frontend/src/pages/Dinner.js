import { GetAllRecipes } from "components/GetAllRecipes";

/**
 * Displays all the recipes
 * 
 * @returns Element for getting all the Dinner recipes
 */
function Dinner(){

    return (
        <div id="wrapper">
            <GetAllRecipes/>
        </div>
        );
}

export {Dinner};