import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn
  } from 'mdb-react-ui-kit';

  import { Link } from 'react-router-dom';

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
                        <Link  to="/recipe" state={ {recipe: recipe, fromSearch: true}}>
                            Read More
                        </Link>
                        <p></p>
                        <Link to="/recipe/creation" state={ {recipe: recipe, fromSearch: true}}>
                            Add to recipe book
                        </Link>
                </MDBCardBody>
            </MDBCard>
         ))}

        </div>
    );
}

export {ListRecipesFromSearch};