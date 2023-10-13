import { BrowserRouter, Routes, Route } from "react-router-dom";

import {RequireToken} from './components/Auth.js'
 

import Home from "./pages/Home/home";
import Login from "./pages/Login/login.js";
import SignUp from "./pages/Signup/signup.js";
import AddVehicle from "./components/Addvehicle/addvehicle.js";
import Dashboard from "./components/Dashboard/dashboard.js";

 
function App() {
  return (
    <div className="app">
        <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
               
              <Route path='/' element={
                  <RequireToken>
                    <Dashboard />
                  </RequireToken>
                  }>
                  <Route path='' element={<Home />}></Route>
                  <Route path='/user' element={<Dashboard />}></Route>
                  <Route path='/create' element={<AddVehicle />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}
   
export default App;