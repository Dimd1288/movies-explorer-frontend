import './App.css';
import Header from '../Header/Header';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  
  return (
    <div className="app">
      <div className="app-page">

        <Routes>
          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/movies" element={<><Header loggedIn={loggedIn} /><Movies /><Footer /></>} />
          <Route path="/saved-movies" element={<><Header loggedIn={loggedIn}/><SavedMovies /><Footer /></>} />
          <Route path="/profile" element={<><Header loggedIn={loggedIn}/><Profile /><Footer /></>} />
          <Route path="/" element={<><Header mainPage="true" loggedIn={loggedIn}/><Main /><Footer /></>} />
        </Routes>

      </div>
    </div>
  );
}

export default App;
