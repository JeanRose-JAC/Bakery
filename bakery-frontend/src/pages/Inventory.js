import { GetAllRecipes } from "components/GetAllRecipes";

/**
 * Displays all the recipes
 * 
 * @returns Element for getting all the recipes
 */
function Inventory(){

    return (
        <div id="wrapper">
            <GetAllRecipes/>
        </div>
        );
}

export {Inventory};