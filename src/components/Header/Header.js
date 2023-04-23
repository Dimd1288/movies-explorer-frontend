import './Header.css';
import Navigation from '../Navigation/Navigation';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import headerLogo from '../../images/header-logo.svg';
import { useState } from 'react';

function Header(props) {
    const location = useLocation(); 

    return (
        <header className={`header ${location.pathname === '/' ? 'header_page_main' : ''}`}>
            <Link to="/"><img src={headerLogo} alt="Логотип страницы" className='header__link' /></Link>
            {props.loggedIn && <Navigation pieClick = {props.onPieClick}/>}
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