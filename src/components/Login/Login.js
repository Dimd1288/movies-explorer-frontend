import './Login.css';
import Form from '../Form/Form';
import { useValidation } from '../../hooks/useValidation';

function Login(props) {
    const { values, handleChange, errors, isValid } = useValidation();

    return (
        <main>
            <Form
                title="Рады видеть!"
                button="Войти"
                caption="Ещё не зарегистрированы? "
                linkText="Регистрация"
                link='/signup'
                isValid = {isValid}
                >
                <label className='login__label'>E-mail</label>
                <input onChange={handleChange} type='email' name='email' className={`login__input ${errors.email ? 'login__input_error' : ''}`} value={values.email || ''} required />
                <span className='login__error'>{errors.email}</span>
                <label className='login__label'>Пароль</label>
                <input onChange={handleChange} type='password' name='password' className={`login__input ${errors.password ? 'login__input_error' : ''}`} value={values.password || ''} required minLength='6' />
                <span className='login__error'>{errors.password}</span>
            </Form>
        </main>
    )
}

export default Login;