import './Profile.css';
import { Link } from 'react-router-dom';
import { useValidation } from '../../hooks/useValidation';
import { useEffect, useState, useContext, useCallback } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile(props) {
    const { values, handleChange, errors, isValid, resetForm, setValues, setIsValid, failed, setFailed, checkIsChanged } = useValidation();
    const currentUser = useContext(CurrentUserContext);
    const [message, setMessage] = useState('');

    useEffect(() => {
        resetForm();
        setValues(currentUser);
    }, [currentUser]);

    useEffect(() => {
        checkIsChanged(currentUser);
    })

    function handleSubmit(e) {
        const { name, email } = values;
        e.preventDefault();

        props.onUpdate(name, email)
            .then(res => {
                if (res.status === 200) {
                    props.onPopupVisibility();
                    props.handleMessage("Данные успешно изменены");
                    props.onEdit();
                } 
                    return res.json()
            }
            )
            .then((res) => {
                if (res.message) {
                    setMessage(res.message)
                    setFailed(true);
                    setIsValid(false);
                    setValues(currentUser);
                } else {
                    props.onSetUser(res)
                }
                    
                
            }
            )
            .catch(err => console.log(err))
    }

    function handleProfileChange(e) {
        handleChange(e);
        
    }

    return (
        <main className='profile'>
            <h1 className='profile__title'>Привет, {currentUser.name}!</h1>
            <form onSubmit={handleSubmit} className='profile__form' noValidate>
                <fieldset className='profile__fieldset'>
                    <label className='profile__input__label'>Имя</label>
                    <input onChange={handleProfileChange} type="text" name='name' className='profile__input' value={values.name || ''} placeholder='Имя' disabled={!props.edit} minLength="2"
                        maxLength="30" required />
                    <span className='profile__error'>{errors.name}</span>
                </fieldset>
                <hr className='profile__line'></hr>
                <fieldset className='profile__fieldset'>
                    <label className='profile__input__label'>E-mail</label>
                    <input onChange={handleProfileChange} type="email" name='email' className='profile__input' value={values.email || ''} placeholder='E-mail' disabled={!props.edit} minLength="2"
                        maxLength="30" required />
                    <span className='profile__error'>{errors.email}</span>
                </fieldset>
                <nav className={`profile__edit-wrapper ${props.edit ? 'profile__edit-wrapper_hidden' : ''}`}>
                    <ul className='profile__menu'>
                        <li onClick={props.onEdit} className='profile__edit'>Редактировать</li>
                        <li><Link onClick={props.onLogOut} className='profile__link' to='/'>Выйти из аккаунта</Link></li>
                    </ul>
                </nav>
                {failed && <span className='profile__form-error'>{message}</span>}
                {props.edit && <button className={`profile__save ${!isValid ? 'proile_save_disabled' : ''}`} type='submit' disabled={!isValid}>Сохранить</button>}
            </form>
        </main>
    )
}

export default Profile;