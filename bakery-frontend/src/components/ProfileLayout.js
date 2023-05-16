import { useState } from "react";
import { ListRecipes } from "./ListRecipes";
import { UpdatePassword } from "./UpdatePassword";

/**
 * Displays all of the recipes in the database
 * 
 * @returns A list of all the recipes
 */
function ProfileLayout(){
   


    return(
        <div className="center">
            <h1>My Profile</h1>
            <h4>Current Email</h4>
            <input  type="text" placeholder="No email detected"></input>
            <UpdatePassword/>
            <h4>Vegan
            <button className="buttonIngredients">True</button>
            <button className="buttonBook">False</button>
            </h4>
        </div>
    );

}

export {ProfileLayout};