import { useSearchParams } from "react-router-dom";
import { AddRecipe } from "components/AddRecipe";
import { GetSingleRecipe } from "components/GetSingleRecipe";
import { ErrorBoundary } from "components/ErrorBoundary";


/**
 * Welcomes the users. Displays the form for adding and getting a recipe. 
 * Shows an error page if there are any errors.
 * 
 * @returns Elements for adding and getting a recipe
 */
function Home(){
    const [searchParams] = useSearchParams();

    return (
    <ErrorBoundary>
        <h1>Hi {searchParams.get("name")}!</h1>
        <h2>Welcome to Geek Gourmet</h2>
        <AddRecipe/>
        <GetSingleRecipe/>   
    </ErrorBoundary>
    );
    
}


export {Home};