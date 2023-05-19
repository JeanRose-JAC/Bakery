import { UpdatePasswordForm } from "./UpdatePasswordForm";

/**
 * Displays the form and card for updating a recipe
 * 
 * @returns Element that represents the form and card for updating a recipe
 */
function UpdatePassword(){

    return(
        <div className="centerUpdate">

            <UpdatePasswordForm/>
        </div>
    )
}

export {UpdatePassword};