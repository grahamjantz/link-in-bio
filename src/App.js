import React from 'react';
import { Route, Routes } from 'react-router';
import './App.css';
import Admin from './features/Admin/Admin';

import Home from './features/Home/Home';
import Login from './features/Login/Login';
// import SignUp from './features/SignUp/SignUp';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        {/* <Route path='/sign-up' element={<SignUp />}></Route> */}
        <Route path='/admin' element={<Admin />}></Route>
      </Routes> 
    </div>
  );
}

export default App;
