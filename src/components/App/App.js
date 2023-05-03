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
import { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import NotFound from '../NotFound/NotFound';
import Popup from '../Popup/Popup';
import { getMovies } from '../../utils/MoviesApi';
import { MESSAGE_ERROR, MESSAGE_SUCCESS } from '../../utils/constants'
import { useWindowSize } from '../../hooks/useWindowSize';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const location = useLocation();
  const headerVisible = location.pathname === '/' || location.pathname === '/movies' || location.pathname === '/saved-movies' || location.pathname === '/profile';
  const footerVisible = location.pathname === '/' || location.pathname === '/movies' || location.pathname === '/saved-movies';
  const [editMode, setEditMode] = useState(false);
  const [popupVisibility, setPopupVisibility] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [moviesCards, setMoviesCards] = useState({});
  const [loaded, setLoaded] = useState(false);
  const {sizeMode, handleSize} = useWindowSize();

  useEffect(() => {
    handleSize()
  }, [window.innerWidth])

  function handleMoviesCardsLoading() {
    return getMovies()
      .then((res) => {
        setMoviesCards(res);
        return res;
      })
      .catch(err => {
        console.log(err);
        handlePopupVisibility(false);
      });
  }

  function handleProfileEditMode() {
    setEditMode(true);
  }

  function handlePopupVisibility(status) {
    setPopupMessage(status ? MESSAGE_SUCCESS : MESSAGE_ERROR);
    setPopupVisibility(true);
    setTimeout(setPopupVisibility(false), 2000);
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
          <Route path="/movies" element={<Movies
            onLoading={handleMoviesCardsLoading}
            onLoaded={setLoaded}
            movies={moviesCards}
            onSetMovies={setMoviesCards}
            loaded={loaded}
            size={sizeMode}
          />
          } />
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
