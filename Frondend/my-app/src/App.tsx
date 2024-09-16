import React from 'react';
import { Routes, Route } from 'react-router-dom'
import UserSignup from './componants/User/UserSignup';
import UserLogin from './componants/User/UserLogin';
import AdminLogin from './componants/Admin/AdminLogin';
import Home from './componants/User/Home';
import DashBoard from './componants/Admin/DashBoard';
import EditUser from './componants/Admin/EditUSer';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/" element={<UserLogin />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/dashboard" element={<DashBoard/>} />
        <Route path="/edit-user/:id" element={<EditUser/>} />
      </Routes>
    </div>
  );
}

export default App;
