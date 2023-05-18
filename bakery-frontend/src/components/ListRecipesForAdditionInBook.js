import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
  } from 'mdb-react-ui-kit';
import { NavLink } from 'react-router-dom';

function ListRecipesForAdditionInBook({recipes, book}){

    return(
        <div>
            {recipes.map((recipe)=>(
            <MDBCard>
                <MDBCardBody>
                    <MDBCardTitle>{recipe.title}</MDBCardTitle>
                    <NavLink to="/book/addition/form" state={{recipe: recipe, book:book}}><button>Add</button></NavLink>
                </MDBCardBody>
            </MDBCard>
         ))}

        </div>
    );

}

export {ListRecipesForAdditionInBook};