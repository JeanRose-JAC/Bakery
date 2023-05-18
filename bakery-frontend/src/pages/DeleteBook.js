import { useLocation } from "react-router-dom"
import { DeleteBookForm } from "components/DeleteBookForm"

function DeleteBook(){
    const {state} = useLocation();

    return(
        <div>
            {state && state.book && <DeleteBookForm book={state.book}/>}
        </div>
    );
}

export {DeleteBook}