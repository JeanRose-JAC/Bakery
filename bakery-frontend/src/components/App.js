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
            <Route path="Quick" element={<Quick/>}/>
            <Route path="Breakfast" element={<Breakfast/>}/>
            <Route path="Snack" element={<Snack/>}/>
            <Route path="Dinner" element={<Dinner/>}/>
            <Route path="Dessert" element={<Dessert/>}/>
            <Route path="Culture" element={<Culture/>}/>
            <Route path="Search" element={<Search/>}/>
            <Route path="Profile" element={<Profile/>}/>
            <Route path="Favorite" element={<Favorite/>}/>     
          </Route>
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
    </div>
  );
}

export default App;
