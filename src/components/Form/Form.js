import './Form.css';
import { Link } from 'react-router-dom';
import logo from '../../images/header-logo.svg';

function Form(props) {

    return (
        <div className='auth-page'>
            <Link to='/'><img src={logo} className='auth-page__logo' /></Link>
            <h1 className='auth-page__title'>{props.title}</h1>

            <form className='auth-page__form'>
                <fieldset className='auth-page__fieldset'>
                    {props.children}
                </fieldset>
                <div className='auth-page__button-wrapper'>
                    <button className='auth-page__button'>{props.button}</button>
                    <span className='auth-page__caption'>{props.caption}<Link className='auth-page__link' to={props.link}>{props.linkText}</Link></span>
                </div>
            </form>
        </div>
    )
}

export default Form;