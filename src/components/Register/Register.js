import './Register.css';
import Form from '../Form/Form';
import { useValidation } from '../../hooks/useValidation';
import { useNavigate } from 'react-router-dom';

function Register(props) {
    const { values, handleChange, errors, isValid, setIsValid, resetForm } = useValidation();
    const navigate = useNavigate();

    function handleSubmit(e) {
        const { name, email, password } = values;
        e.preventDefault();
        props.onRegister(name, email, password)
            .then((res) => {
                if (res) {
                    props.handleMessage("Вы успешно зарегистрировались");
                    
                    props.onAuthorize(email, password).then((data) => {
                        localStorage.setItem('jwt', data.jwt);
                        props.onLogin(true); 
                        navigate('/movies', {replace: true});
                    });
                } else {
                    resetForm();
                    props.handleMessage("Что-то пошло не так");
                    setIsValid(false);
                }
            })
        .finally(() => {
            props.onPopupVisibility()
        });
    }

    return (
        <main>
            <Form title="Добро пожаловать!"
                button="Зарегистрироваться"
                caption="Уже зарегистрированы? "
                linkText="Войти"
                link='/signin'
                isValid={isValid}
                handleSubmit={handleSubmit}
            >
                <label className='register__label'>Имя</label>
                <input onChange={handleChange} type='text' name='name' className={`register__input ${errors.name ? 'register__input_error' : ''}`} value={values.name || ''} required />
                <span className='register__error'>{errors.name}</span>
                <label className='register__label'>E-mail</label>
                <input onChange={handleChange} type='email' name='email' className={`register__input ${errors.email ? 'register__input_error' : ''}`} value={values.email || ''} required />
                <span className='register__error'>{errors.email}</span>
                <label className='register__label'>Пароль</label>
                <input onChange={handleChange} type='password' name='password' className={`register__input ${errors.password ? 'register__input_error' : ''}`} value={values.password || ''} minLength='6' required />
                <span className='register__error'>{errors.password}</span>
            </Form>
        </main>
    );
}

export default Register;