import { GetAllDessertRecipes } from "components/GetAllDessertRecipes";

/**
 * Displays all the recipes
 * 
 * @returns Element for getting all the Dessert recipes
 */
function Dessert(){

    return (
        <div id="wrapper">
            <GetAllDessertRecipes/>
        </div>
        );
}

export {Dessert};