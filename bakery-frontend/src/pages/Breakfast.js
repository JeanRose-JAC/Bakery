import { GetAllBreakfastRecipes } from "components/GetAllBreakfastRecipes";


/**
 * Displays all the recipes
 * 
 * @returns Element for getting all the recipes
 */
function Breakfast(){

    return (
        <div id="wrapper">
            <GetAllBreakfastRecipes/>
        </div>
        );
}

export {Breakfast};