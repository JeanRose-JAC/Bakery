import './style.css';
import { Route, Routes, Navigate} from "react-router-dom";
import { MainLayout } from 'layouts/MainLayout';
import { Home } from 'pages/Home';
import { About } from 'pages/About';
import { Contact } from 'pages/Contact';
import { Inventory } from 'pages/Inventory';
import { Admin } from 'pages/Admin';
import { UserError } from 'pages/UserError';
import { SystemError } from 'pages/SystemError';
import { Quick } from 'pages/Quick';
import { Breakfast } from 'pages/Breakfast';
import { Snack } from 'pages/Snack';
import { Dinner } from 'pages/Dinner';
import { Dessert } from 'pages/Dessert';
import { Profile } from 'pages/Profile';
import { Favorite } from 'pages/Favorite';
import { Culture } from 'pages/Culture';
import { Search } from 'pages/Search';
import { Recipe } from 'pages/Recipe';
import { RecipeCreation } from 'pages/RecipeCreation';


/**
 * Determines the list of routes in the website
 * 
 * @returns A list of routes
 */
function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<MainLayout/>}>
            <Route index element={<Home/>}/> 
            <Route path="about" element={<About/>}/>
            <Route path="contact" element={<Contact/>}/>
            <Route path="inventory" element={<Inventory/>}/>
            <Route path="admin" element={<Admin/>}/>
            <Route path="usererror" element={<UserError/>}/>
            <Route path="systemerror" element={<SystemError/>}/>
            <Route path="quick" element={<Quick/>}/>
            <Route path="breakfast" element={<Breakfast/>}/>
            <Route path="snack" element={<Snack/>}/>
            <Route path="dinner" element={<Dinner/>}/>
            <Route path="dessert" element={<Dessert/>}/>
            <Route path="culture" element={<Culture/>}/>
            <Route path="search" element={<Search/>}/>
            <Route path="profile" element={<Profile/>}/>
            <Route path="favorite" element={<Favorite/>}/>    
            <Route path="recipe" element={<Recipe/>}/>  
            <Route path="recipe/creation" element={<RecipeCreation/>}/>    
          </Route>
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
    </div>
  );
}

export default App;
