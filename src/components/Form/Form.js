import './Form.css';
import { Link } from 'react-router-dom';
import logo from '../../images/header-logo.svg';

function Form(props) {

    return (
        <div className='auth-page'>
            <Link to='/' className='auth-page__logo'><img alt="Логотип страницы" src={logo} /></Link>
            <h1 className='auth-page__title'>{props.title}</h1>
            <form onSubmit={props.handleSubmit} className='auth-page__form' noValidate>
                <fieldset className='auth-page__fieldset'>
                    {props.children}
                </fieldset>
                <div className='auth-page__button-wrapper'>
                    <button className={`auth-page__button ${!props.isValid ? 'auth-page__button_disabled' : ''}`} disabled={!props.isValid}>{props.button}</button>
                    <span className='auth-page__caption'>{props.caption}<Link className='auth-page__link' to={props.link}>{props.linkText}</Link></span>
                </div>
            </form>
        </div>
    )
}

export default Form;