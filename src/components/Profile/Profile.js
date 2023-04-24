import './Profile.css';
import { Link } from 'react-router-dom';
import { useValidation } from '../../hooks/useValidation';
import { useEffect } from 'react';
import { useState } from 'react';

function Profile(props) {
    const { values, handleChange, errors, isValid, resetForm, setValues, setIsValid } = useValidation();
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        resetForm();
        setFailed(false);
        setValues({name:'Дмитрий', email: 'pochta@fddf.ee'})
    }, [props.edit])

    function handleSubmit(e) {
        e.preventDefault();
        setIsValid(false);
        setFailed(true);
    }

    return (
        <main className='profile'>
            <h1 className='profile__title'>Привет, Дмитрий!</h1>
            <form onSubmit={handleSubmit} className='profile__form' noValidate>
                <fieldset className='profile__fieldset'>
                    <label className='profile__input__label'>Имя</label>
                    <input onChange={handleChange} type="text" name="name" className='profile__input' value={values.name || ''} placeholder='Имя' disabled={!props.edit} minLength="2"
                    maxLength="30" required/>
                    <span className='profile__error'>{errors.name}</span>
                </fieldset>
                <hr className='profile__line'></hr>
                <fieldset className='profile__fieldset'>
                    <label className='profile__input__label'>E-mail</label>
                    <input onChange={handleChange} type="email" name="email" className='profile__input' value={values.email || ''} placeholder='E-mail' disabled={!props.edit} minLength="2"
                    maxLength="30" required/>
                    <span className='profile__error'>{errors.email}</span>
                </fieldset>
                <nav className={`profile__edit-wrapper ${props.edit ? 'profile__edit-wrapper_hidden' : ''}`}>
                    <ul className='profile__menu'>
                        <li onClick={props.onEdit} className='profile__edit'>Редактировать</li>
                        <li><Link className='profile__link' to='/'>Выйти из аккаунта</Link></li>
                    </ul>
                </nav>
                {failed && <span className='profile__form-error'>При обновлении профиля произошла ошибка</span>}
                {props.edit && <button className={`profile__save ${!isValid ? 'proile_save_disabled' : ''}`} type='submit' disabled={!isValid}>Сохранить</button>}
            </form>
        </main>
    )
}

export default Profile;