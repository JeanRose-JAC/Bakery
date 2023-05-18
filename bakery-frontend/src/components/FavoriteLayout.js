import { useContext } from 'react';
import { LoggedInContext } from './App';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function FavoriteLayout(){
    const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);
    const navigate = useNavigate();

    return(
        <div>
            {isLoggedIn ? 
            <div>
                <p>youre register</p>
            </div> : 
            <div>
                You must be logged in to access this page
                <p></p>
                <Link to="/login">Log In</Link>    
            </div>}
        </div>
    )
}

export {FavoriteLayout}