import { GetAllDinnerRecipes } from "components/GetAllDinnerRecipes";

/**
 * Displays all the recipes
 * 
 * @returns Element for getting all the Dinner recipes
 */
function Dinner(){

    return (
        <div id="wrapper">
            <GetAllDinnerRecipes/>
        </div>
        );
}

export {Dinner};