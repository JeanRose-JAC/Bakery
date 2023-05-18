import { LoginForm } from './LoginForm';
import { UserSettings } from './UserSettings';
import { useContext } from 'react';
import { LoggedInContext } from './App';

/**
 * Displays all of the recipes in the database
 * 
 * @returns A list of all the recipes
 */
function ProfileLayout(){
    const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);

    return(
        <div>
            {isLoggedIn ? <UserSettings/> : <LoginForm/>}
        </div>
    );

}

export {ProfileLayout};