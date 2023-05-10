import "./wrapper.css";
import { Card } from "./Card";

/**
 * Displays a list of all recipes with username and title 
 * 
 * @param {*} param An array of recipes 
 * @returns A list of recipes formatted in a card
 */
function ListRecipes({recipes}){
    return(
        <div>
        <div className="flex-container">
        {recipes.map((recipe)=>(
            <div className="child">
                <Card>
                    <div>
                        <p>{recipe.title}</p>
                        <p>by {recipe.userId}</p>
                    </div>
                </Card>
            </div>  
        ))}
        </div>
        </div>

    );
}

export {ListRecipes};