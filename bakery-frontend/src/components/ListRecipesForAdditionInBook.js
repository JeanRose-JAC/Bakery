import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
  } from 'mdb-react-ui-kit';

function ListRecipesForAdditionInBook({recipes, book}){

    return(
        <div>
            {recipes.map((recipe)=>(
            <MDBCard>
                <MDBCardBody>
                    <MDBCardTitle>{recipe.title}</MDBCardTitle>
                    <button onClick={addToBook(recipe, book)}>Add</button>
                </MDBCardBody>
            </MDBCard>
         ))}

        </div>
    );

}

async function addToBook(recipe, book){
    const requestOptions = {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify({
            recipeId: recipe._id,
            name: book.name
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
    }

    const response = await fetch ("http://localhost:1339/book/content/new", requestOptions)
    const result = await response.json();
    if(response.status === 400){
        alert(result.errMessage);
    }
    else if (response.status === 500){
        alert(result.errMessage);
    }
    else{
        alert("Recipe added")
    }
}

export {ListRecipesForAdditionInBook};