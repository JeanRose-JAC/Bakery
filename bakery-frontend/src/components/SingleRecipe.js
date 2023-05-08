import { useState } from "react";
import { FindRecipeForm } from "./singleRecipeForm"
import { DisplayRecipe } from "./DisplayRecipe";
import "./style.css";

/**
 * Funtion used to get and display a simple recipe
 * @returns the result of the recipe added
 */
function SingleRecipe() {
    const [added, setAdded] = useState({});


    return (
        <div className="center">
            <h1>Finding a specific recipe by name</h1>
            <FindRecipeForm setAdded={setAdded} />
            <div className="centerCard">
            <DisplayRecipe Recipe={added} heading="The found Recipe is" />
            </div>
        </div>

    );
}

export { SingleRecipe };