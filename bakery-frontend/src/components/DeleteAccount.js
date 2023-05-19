import { DeleteUserAccountForm } from "./DeleteAccountForm";

/**
 * Displays the form and card for updating a recipe
 * 
 * @returns Element that represents the form and card for updating a recipe
 */
function DeleteAccount(){

    return(
        <div className="centerUpdate">

            <DeleteUserAccountForm/>
        </div>
    )
}

export {DeleteAccount};