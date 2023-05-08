import { GetAllRecipes } from "components/GetAllRecipes";

/**
 * Displays all the recipes
 * 
 * @returns Element for getting all the Lunch recipes
 */
function Lunch(){

    return (
        <div id="wrapper">
            <GetAllRecipes/>
        </div>
        );
}

export {Lunch};