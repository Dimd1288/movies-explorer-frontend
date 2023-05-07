import './App.css';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import NotFound from '../NotFound/NotFound';
import Popup from '../Popup/Popup';
import { getMovies } from '../../utils/MoviesApi';
import { useWindowSize } from '../../hooks/useWindowSize';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { getUser, register, authorize, updateUser } from '../../utils/MainApi';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const location = useLocation();
  const headerVisible = location.pathname === '/' || location.pathname === '/movies' || location.pathname === '/saved-movies' || location.pathname === '/profile';
  const footerVisible = location.pathname === '/' || location.pathname === '/movies' || location.pathname === '/saved-movies';
  const [editMode, setEditMode] = useState(false);
  const [popupVisibility, setPopupVisibility] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [moviesCards, setMoviesCards] = useState({});
  const [loaded, setLoaded] = useState(false);
  const { sizeMode, handleSize } = useWindowSize();
  const navigate = useNavigate();

  useEffect(() => {
    handleSize()
  }, [window.innerWidth]);

  useEffect(() => {
    getUser(localStorage.getItem('jwt'))
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(err));
    checkToken();
  }, [loggedIn])

  function checkToken() {
    if (localStorage.getItem('jwt')) {
      setLoggedIn(true);
      navigate(location.pathname, { replace: true });
    }
  }

  function handleUserUpdate(name, email) {
    return updateUser(name, email).then(res => {
      setCurrentUser(res);
      return res;
    });
  }

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
    setEditMode(!editMode);
  }

  function handleRegisterUser(name, email, password) {
    return register(name, email, password);
  }

  function handleAuthorizeUser(email, password) {
    return authorize(email, password);
  }

  function handlePopupVisibility() {
    setPopupVisibility(true);
    setTimeout(() => {
      setPopupVisibility(false)
    }, 3000);
  }

  function handlePopupMessage(message) {
    setPopupMessage(message);
  }

  function escapeProfileEditMode() {
    setEditMode(false);
  }

  function handleSidebarOpen() {
    setSidebarOpened(!sidebarOpened);
  }

  function handleLogOut() {
    localStorage.removeItem('jwt');
    navigate('/');
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <div className="app-page">
          {headerVisible && <Header loggedIn={loggedIn} onPieClick={handleSidebarOpen} escape={escapeProfileEditMode} />}
          <Routes>
            <Route path="/signup" element={<Register onPopupVisibility={handlePopupVisibility} handleMessage={handlePopupMessage} onRegister={handleRegisterUser} />} />
            <Route path="/signin" element={<Login onPopupVisibility={handlePopupVisibility} handleMessage={handlePopupMessage} onAuthorize={handleAuthorizeUser} onLogin={setLoggedIn} />} />
            <Route path="/movies" element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Movies
                  onLoading={handleMoviesCardsLoading}
                  onLoaded={setLoaded}
                  movies={moviesCards}
                  onSetMovies={setMoviesCards}
                  loaded={loaded}
                  size={sizeMode}
                />
              </ProtectedRoute>
            } />
            <Route path="/saved-movies" element={
              <ProtectedRoute loggedIn={loggedIn}>
                <SavedMovies />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Profile
                  onUpdate={handleUserUpdate}
                  onEdit={handleProfileEditMode}
                  edit={editMode}
                  onLogOut={handleLogOut}
                /></ProtectedRoute>} />
            <Route path="/" element={<Main />} />
            <Route path="/404" element={<NotFound />} />
          </Routes>
          {footerVisible && <Footer />}
          <Sidebar onEditClose={escapeProfileEditMode} opened={sidebarOpened} onClose={handleSidebarOpen} />
          <Popup message={popupMessage} visible={popupVisibility} handleVisibility={setPopupVisibility} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
