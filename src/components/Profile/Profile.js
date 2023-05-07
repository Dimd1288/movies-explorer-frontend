import './Profile.css';
import { Link } from 'react-router-dom';
import { useValidation } from '../../hooks/useValidation';
import { useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile(props) {
    const { values, handleChange, errors, isValid, resetForm, setValues, setIsValid } = useValidation();
    const [failed, setFailed] = useState(false);
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        resetForm();
        setValues({ name:currentUser.name, email: currentUser.email });
    }, [currentUser])

    function handleSubmit(e) {
        const { name, email } = values;
        e.preventDefault();
        
        props.onUpdate(name, email)
            .then(res => {
                if (res) {
                    props.onEdit()
                } else {
                    setFailed(true);
                    setIsValid(false);
                }
                
            })
            .catch(err => console.log(err))
    }

    return (
        <main className='profile'>
            <h1 className='profile__title'>Привет, {currentUser.name}!</h1>
            <form onSubmit={handleSubmit} className='profile__form' noValidate>
                <fieldset className='profile__fieldset'>
                    <label className='profile__input__label'>Имя</label>
                    <input onChange={handleChange} type="text" name='name' className='profile__input' value={values.name || ''} placeholder='Имя' disabled={!props.edit} minLength="2"
                    maxLength="30" required/>
                    <span className='profile__error'>{errors.name}</span>
                </fieldset>
                <hr className='profile__line'></hr>
                <fieldset className='profile__fieldset'>
                    <label className='profile__input__label'>E-mail</label>
                    <input onChange={handleChange} type="email" name='email' className='profile__input' value={values.email || ''} placeholder='E-mail' disabled={!props.edit} minLength="2"
                    maxLength="30" required/>
                    <span className='profile__error'>{errors.email}</span>
                </fieldset>
                <nav className={`profile__edit-wrapper ${props.edit ? 'profile__edit-wrapper_hidden' : ''}`}>
                    <ul className='profile__menu'>
                        <li onClick={props.onEdit} className='profile__edit'>Редактировать</li>
                        <li><Link onClick={props.onLogOut} className='profile__link' to='/'>Выйти из аккаунта</Link></li>
                    </ul>
                </nav>
                {failed && <span className='profile__form-error'>При обновлении профиля произошла ошибка</span>}
                {props.edit && <button className={`profile__save ${!isValid ? 'proile_save_disabled' : ''}`} type='submit' disabled={!isValid}>Сохранить</button>}
            </form>
        </main>
    )
}

export default Profile;