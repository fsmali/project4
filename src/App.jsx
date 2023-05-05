// import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import Header from './header/Header';
import Footer from './components/footer/Footer';
import HomePage from './components/homePage/Homepage';
import DeveloperPage from './components/developers/developers';
import ProfilePage from './components/profile_page/profile';
import RegisterPage from './components/register/Register';
import LoginPage from './components/login_page/login';
import CreateDeveloper from './components/create_developer/Create_developer';
// import LandingPage from './components/landing/LandingPage';
import Logout from './components/logout/logout';
// import SkillForm from './components/create_developer/SkillForm';





function App() {
  return (
    <div>
      <Header />

      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/developers" element={<DeveloperPage />} />
        <Route path="/developers/:id" element={<ProfilePage />} />
        <Route path="/register/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="logout" element={<Logout />} />
        <Route path="/create-developer" element={<CreateDeveloper />} />
        {/* <Route path="/skill" element={<SkillForm />} /> */}


      </Routes>

      <Footer />
    </div>
  );
}

export default App;
