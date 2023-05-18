import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn
  } from 'mdb-react-ui-kit';

/**
 * Displays a list of all recipes with username and title 
 * 
 * @param {*} param An array of recipes 
 * @returns A list of recipes formatted in a card
 */
function ListRecipesFromSearch({recipes}){

    return(
        <div>
            {recipes.map((recipe)=>(
            <MDBCard>
                <MDBCardBody>
                    <MDBCardTitle>{recipe.title}</MDBCardTitle>
                        <MDBCardText>
                            {recipe.instructions}
                        </MDBCardText>
                    <MDBBtn>Read More</MDBBtn>
                    <MDBBtn>Add to recipe book</MDBBtn>
                </MDBCardBody>
            </MDBCard>
         ))}

        </div>
    );
}

export {ListRecipesFromSearch};