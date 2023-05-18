import { useContext } from "react";
import { useNavigate } from "react-router";
import { LoggedInContext } from "./App";

function LogoutButton(){
    const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);
    const navigate = useNavigate();

    const performLogout = async () =>{
        try{
            const requestOptions = {
                method: "GET",
                credentials: "include",
            };
            
            const response = await fetch("http://localhost:1339/session/logout", requestOptions);

            if(response.status === 401){
                alert("Already logged out on server. Will log out on front-end as well.");
                setIsLoggedIn(false);
                navigate("/");
                return;
            }
            else if (response.status === 200){
                alert("Hope you had a good session.");
                setIsLoggedIn(false);
                navigate("/");
            }
            else{
                alert("Something went wrong. Will log out on front-end.");
                setIsLoggedIn(false);
                navigate("/");
            }
        }
        catch(error){
            alert("Something went wrong. Logging out.");
            setIsLoggedIn(false);
            navigate("/");
        }
    }

    return(
        <button onClick={performLogout}>Logout</button>
    )
}

export {LogoutButton};