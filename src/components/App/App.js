import './App.css';
import Header from '../Header/Header';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const location = useLocation();
  const headerAndFooter = location.pathname === '/' || location.pathname === '/movies' || location.pathname === '/saved-movies' || location.pathname === '/profile';

  function handleSidebarOpen() {
    setSidebarOpened(!sidebarOpened);
  }

  return (
    <div className="app">
      <div className="app-page">
        {headerAndFooter && <Header loggedIn={loggedIn} onPieClick={handleSidebarOpen}/>}
        <Routes>
          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Main />} />
        </Routes>
        {headerAndFooter && <Footer />}
        <Sidebar opened={sidebarOpened} onClose={handleSidebarOpen}/>
      </div>
    </div>
  );
}

export default App;
