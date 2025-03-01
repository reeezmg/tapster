import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import Landing from './pages/Landing';
import Login from './pages/Login';
import DLogin from './pages/Direct/Login';
import DRegistration from './pages/Direct/Registration';
import Registration from './pages/Registration';
import './App.css';
import ForgotPassword from './pages/ForgotPassword';
import Sidebar from './components/Sidebar';
import Settings from './pages/Settings';
import EditCardPage from './pages/Cardedit/EditCard';
import DesignSelectionPage from './pages/Cardedit/DesignSelection';
import CardDetails from './pages/Cardedit/CardDetails';
import HomePage from './pages/HomePage';
import Step2 from './pages/CardLanding/Step2';
import Step3 from './pages/CardLanding/Step3';
import Edit2 from './pages/CardLanding/Edit2';
import Edit3 from './pages/CardLanding/Edit3';
import Response from './pages/Response';
import Pay from './pages/Pay';
import LinkForms from './pages/Direct/LinkForms';
import Links from './pages/Direct/Links';


function App() {
  // Check if there is a token

  const token = Cookies.get('token');
  console.log(token)
  let userType = null;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userType = decodedToken.userType;
      console.log(decodedToken)
    } catch (error) {
      console.error('Invalid token:', error);
      Cookies.remove('token'); 
    }
  }

  // Public Routes (Accessible to everyone)
  let readyRoute = (
    <Routes>
          <Route path="/direct/edit/:id" element={<LinkForms />} />
          <Route path="/direct/profile/:id" element={<Links />} />
          <Route path="/direct/login" element={<DLogin />} />
           <Route path="/direct/register/:id" element={<DRegistration />} />
    </Routes>
  );



  

  // Authentication Routes (For unauthenticated users)
  let authRoute = (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/response/:uname" element={<Response />} />
      <Route path="/login" element={<Login />} />
      <Route path="/direct/login" element={<DLogin />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
      <Route path="/direct/profile/:id" element={<Links />} />
          <Route path="/direct/login" element={<DLogin />} />
           <Route path="/direct/register/:id" element={<DRegistration />} />
    </Routes>
  );

  // Client Routes (For authenticated users)
  let clientRoute = (
    <Routes>
     <Route path="/response/:uname" element={<Response />} />
      <Route path="/" element={<Landing />} />
      <Route path="/client" element={<HomePage />} />
      <Route path="/client/design" element={<DesignSelectionPage />} />
      <Route path="/client/step1/:id" element={<EditCardPage />} />
      <Route path="/client/step2/:id" element={<Step2 />} />
      <Route path="/client/edit2/:id" element={<Edit2 />} />
      <Route path="/client/step3/:id" element={<Step3 />} />
      <Route path="/client/edit3/:id" element={<Edit3 />} />
      <Route path="/client/settings" element={<Settings />} />
      <Route path="/client/pay/:id" element={<Pay />} />
      <Route path="*" element={<Navigate to="/client" replace />} />
      <Route path="/direct/profile/:id" element={<Links />} />
          <Route path="/direct/login" element={<DLogin />} />
           <Route path="/direct/register/:id" element={<DRegistration />} />
    </Routes>
  );

   if(userType === 'custom'){
    return(
      <div>
        <Sidebar/>
        <div className=' mt-14'>
        {clientRoute}
        </div>
        
      </div>
    )
  }else if (userType === 'ready')
  {
    return(
      <div>
    {readyRoute}
  </div>)
    }else{
      return(
        <div>
      {authRoute}
    </div>)
    }
    
}

export default App;
