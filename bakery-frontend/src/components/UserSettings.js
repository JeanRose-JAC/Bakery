import { DeleteAccount } from "./DeleteAccount";
import { UpdatePassword } from "./UpdatePassword";


function UserSettings(){


   return <div className="center">
    <h1>User settings</h1>
    <UpdatePassword/>
    <DeleteAccount/>
   </div>

}

export {UserSettings}