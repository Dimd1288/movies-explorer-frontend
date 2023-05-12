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
import { getUser, register, authorize, updateUser, getSavedMovies, postSaveMovie, deleteMovie } from '../../utils/MainApi';

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
  const [savedMovies, setSavedMovies] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { sizeMode, handleSize } = useWindowSize();
  const navigate = useNavigate();

  useEffect(() => {
    handleSize()
  }, []);

  useEffect(() => {
    getUser(localStorage.getItem('jwt'))
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(err));
    checkToken();
  }, [loggedIn])


  useEffect(() => {
    getSavedMovies()
      .then(res => {
        setSavedMovies(res);
      })
  }, [loggedIn])

  function checkToken() {
    if (localStorage.getItem('jwt')) {
      setLoggedIn(true);
      navigate(location.pathname, { replace: true });
    }
  }

  function handleUserUpdate(name, email) {
    return updateUser(name, email)
  }

  function handleSavedMoviesLoading() {
    return getSavedMovies();
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

  function handleSaveMovie(params) {
    return postSaveMovie(params);
  }

  function handleDeleteMovie(movieId) {
    return deleteMovie(movieId)
    // .then((res) => {
    //   setSavedMovies((state) => state.filter((movie) => movie._id !== res._id));
    //   clearLocalSavedMovies();
    // });
  }

  function clearLocalSavedMovies() {
    localStorage.removeItem("saved-movies");
    localStorage.setItem("name", "");
    localStorage.removeItem("name-checked");
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
    localStorage.clear();
    navigate('/');
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <div className="app-page">
          {headerVisible && <Header loggedIn={loggedIn} onPieClick={handleSidebarOpen} escape={escapeProfileEditMode} />}
          <Routes>
            <Route path="/signup" element={
              <ProtectedRoute loggedIn={!loggedIn}>
                <Register
                  onPopupVisibility={handlePopupVisibility}
                  handleMessage={handlePopupMessage}
                  onLogin={setLoggedIn}
                  onRegister={handleRegisterUser}
                  onAuthorize={handleAuthorizeUser}
                />
              </ProtectedRoute>} />
            <Route path="/signin" element={
              <ProtectedRoute loggedIn={!loggedIn}>
                <Login
                  onPopupVisibility={handlePopupVisibility}
                  handleMessage={handlePopupMessage}
                  onAuthorize={handleAuthorizeUser}
                  onLogin={setLoggedIn} />
              </ProtectedRoute>} />
            <Route path="/movies" element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Movies
                  onLoading={handleMoviesCardsLoading}
                  onLoaded={setLoaded}
                  movies={moviesCards}
                  savedMovies={savedMovies}
                  onSetSavedMovies={setSavedMovies}
                  onSetMovies={setMoviesCards}
                  loaded={loaded}
                  size={sizeMode}
                  onSave={handleSaveMovie}
                  onDelete={handleDeleteMovie}
                />
              </ProtectedRoute>
            } />
            <Route path="/saved-movies" element={
              <ProtectedRoute loggedIn={loggedIn}>
                <SavedMovies
                  onLoading={handleSavedMoviesLoading}
                  onLoaded={setLoaded}
                  loaded={loaded}
                  movies={savedMovies}
                  onDelete={handleDeleteMovie}
                  onSetMovies={setSavedMovies}
                />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Profile
                  onUpdate={handleUserUpdate}
                  onEdit={handleProfileEditMode}
                  edit={editMode}
                  onLogOut={handleLogOut}
                  onSetUser={setCurrentUser}
                  onPopupVisibility={handlePopupVisibility}
                  handleMessage={handlePopupMessage}
                /></ProtectedRoute>} />
            <Route path="/" element={<Main />} />
            <Route path="/*" element={<NotFound />} />
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
