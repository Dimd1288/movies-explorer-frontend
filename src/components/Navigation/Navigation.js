import './Navigation.css';
import { Link, useLocation } from 'react-router-dom';
import profileLogo from '../../images/profile-icon.svg';

function Navigation(props) {
    const location = useLocation();
    const moviesRoute = '/movies';
    const savedMoviesRoute = '/saved-movies';

    return (
        <nav className='navigation'>
            <ul className='navigation__menu'>
                <li><Link to={moviesRoute} className={`navigation__link ${location.pathname === moviesRoute ? 'navigation__link_active' : ''}`}>Фильмы</Link></li>
                <li><Link to={savedMoviesRoute} className={`navigation__link ${location.pathname === savedMoviesRoute ? 'navigation__link_active' : ''}`}>Сохраненные фильмы</Link></li>
            </ul>
            <Link to='/profile' className='navigation__link navigation__link_active'>Аккаунт<img src={profileLogo} alt="Иконка аккаунта" className='navigation__icon'/></Link>
        </nav>
    )
}

export default Navigation;