import { GetAllRecipes } from "components/GetAllRecipes";

/**
 * Displays all the recipes
 * 
 * @returns Element for getting all the Dessert recipes
 */
function Dessert(){

    return (
        <div id="wrapper">
            <GetAllRecipes/>
        </div>
        );
}

export {Dessert};