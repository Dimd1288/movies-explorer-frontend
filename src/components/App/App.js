import './App.css';
import Header from '../Header/Header';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import { Route, Routes, useLocation } from "react-router-dom";
import { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import NotFound from '../NotFound/NotFound';
import Popup from '../Popup/Popup';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const location = useLocation();
  const headerVisible = location.pathname === '/' || location.pathname === '/movies' || location.pathname === '/saved-movies' || location.pathname === '/profile';
  const footerVisible = location.pathname === '/' || location.pathname === '/movies' || location.pathname === '/saved-movies';
  const [editMode, setEditMode] = useState(false);
  const [popupVisibility, setPopupVisibility] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const messageSuccess = {
    'status': true,
    'message': 'Вы успешно зарегистрированы!'
  };
  const messageError = {
    'status': false,
    'message': 'Что-то пошло не так...'
  }

  function handleProfileEditMode() {
    setEditMode(true);
  }

  function handlePopupVisibility(status) {
    setPopupMessage(status ? messageSuccess : messageError);
    setPopupVisibility(true);
  }

  function escapeProfileEditMode() {
    setEditMode(false);
  }

  function handleSidebarOpen() {
    setSidebarOpened(!sidebarOpened);
  }

  return (
    <div className="app">
      <div className="app-page">
        {headerVisible && <Header loggedIn={loggedIn} onPieClick={handleSidebarOpen} escape={escapeProfileEditMode} />}
        <Routes>
          <Route path="/signup" element={<Register onRegister={handlePopupVisibility} />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/profile" element={<Profile onEdit={handleProfileEditMode} edit={editMode} />} />
          <Route path="/" element={<Main />} />
          <Route path="/404" element={<NotFound />} />
        </Routes>
        {footerVisible && <Footer />}
        <Sidebar onEditClose={escapeProfileEditMode} opened={sidebarOpened} onClose={handleSidebarOpen} />
        {popupVisibility && <Popup message={popupMessage} handleVisibility={setPopupVisibility} />}
      </div>
    </div>
  );
}

export default App;
