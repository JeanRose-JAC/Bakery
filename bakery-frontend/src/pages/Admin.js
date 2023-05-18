import { UpdateRecipe } from "components/UpdateRecipe";
import { DeleteRecipe } from "components/DeleteRecipe";
import { ErrorBoundary } from "components/ErrorBoundary";

/**
 * Displays the form for updating and deleting a recipe. Shows an error page if there are any errors.
 * 
 * @returns Elements for updating and deleting a recipe
 */
function Admin(){

    return (
        <ErrorBoundary>
        <div id="wrapper">
            <UpdateRecipe/>
            <DeleteRecipe/>
        </div>
        </ErrorBoundary>

        );
}

export {Admin};