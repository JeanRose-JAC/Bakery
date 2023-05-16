import { GetAllSnackRecipes } from "components/GetAllSnackRecipes";

/**
 * Displays all the recipes
 * 
 * @returns Element for getting all the Lunch recipes
 */
function Snack(){

    return (
        <div id="wrapper">
            <GetAllSnackRecipes/>
        </div>
        );
}

export {Snack};