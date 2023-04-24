import './Sidebar.css';
import { useLocation, Link } from 'react-router-dom';
import profileLogo from '../../images/profile-icon.svg';

function Sidebar(props) {
    const location = useLocation();
    const moviesRoute = '/movies';
    const savedMoviesRoute = '/saved-movies';

    function handleLinkClick(e) {
        if (e.target.classList.contains('sidebar__link') ||
            e.target.classList.contains('sidebar_opened')) {
            props.onClose();
        }
    }

    return (
        <section onClick={handleLinkClick} className={`sidebar ${props.opened ? 'sidebar_opened' : ''}`}>
            <aside className={`sidebar__window ${props.opened ? 'sidebar__window_opened' : ''}`}>
                <button onClick={props.onClose} className='sidebar__close'></button>
                <nav className='sidebar__navigation'>
                    <ul className='sidebar__menu'>
                        <li><Link to='/' className={`sidebar__link ${location.pathname === '/' ? 'sidebar__link_active' : ''}`}>Главная</Link></li>
                        <li><Link to={moviesRoute} className={`sidebar__link ${location.pathname === moviesRoute ? 'sidebar__link_active' : ''}`}>Фильмы</Link></li>
                        <li><Link to={savedMoviesRoute} className={`sidebar__link ${location.pathname === savedMoviesRoute ? 'sidebar__link_active' : ''}`}>Сохраненные фильмы</Link></li>
                    </ul>
                    <Link onClick={props.onEditClose} to='/profile' className='sidebar__link sidebar__link_account'>Аккаунт<img src={profileLogo} alt="Иконка аккаунта" className='sidebar__icon' /></Link>
                </nav>
            </aside>
        </section>
    )
}

export default Sidebar;