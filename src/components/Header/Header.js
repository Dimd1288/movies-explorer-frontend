import './Header.css';
import Navigation from '../Navigation/Navigation';
import { Link, useNavigate } from 'react-router-dom';
import headerLogo from '../../images/header-logo.svg';

function Header(props) {

    return (
        <header className={`header ${props.mainPage ? 'header_page_main' : ''}`}>
            <Link to="/"><img src={headerLogo} alt="Логотип страницы" className='header__link' /></Link>
            {props.loggedIn && <Navigation />}
            {
                !props.loggedIn &&
                <div className='header__menu'>
                    <Link to="/signin" className='header__link'>Регистрация</Link>
                    <Link to="/signup" className='header__link header__link_type_button'>Войти</Link>
                </div>
            }

        </header>
    )
}

export default Header;