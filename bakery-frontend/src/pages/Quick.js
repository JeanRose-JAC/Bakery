import { GetAllQuickRecipes } from "components/GetAllQuickRecipes";

/**
 * Displays all the recipes
 * 
 * @returns Element for getting all the Quick recipes
 */
function Quick(){

    return (
        <div id="wrapper">
            <GetAllQuickRecipes/>
        </div>
        );
}

export {Quick};