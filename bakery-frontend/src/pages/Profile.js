import { GetAllRecipes } from "components/GetAllRecipes";

/**
 * Displays all the recipes
 * 
 * @returns Element for getting all the Dinner recipes
 */
function Profile(){
    return (
       
        <div id="wrapper">
            <GetAllRecipes/>
        </div>
        );
}

export {Profile};