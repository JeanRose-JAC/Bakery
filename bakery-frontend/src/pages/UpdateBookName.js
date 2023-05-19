import { useLocation } from "react-router-dom"
import { UpdateBookNameForm } from "components/UpdateBookNameForm";

function UpdateBookName(){
    const {state} = useLocation();

    return(
        <div>
            {state && state.book && <UpdateBookNameForm book={state.book}/>}
        </div>
    );
}

export {UpdateBookName}