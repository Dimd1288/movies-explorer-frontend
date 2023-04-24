import './Login.css';
import Form from '../Form/Form';

function Login(props) {
    return (
        <main>
            <Form
                title="Рады видеть!"
                button="Войти"
                caption="Ещё не зарегистрированы? "
                linkText="Регистрация"
                link='/signup'>
                <label className='login__label'>E-mail</label>
                <input type='email' className='login__input' />
                <label className='login__label'>Пароль</label>
                <input type='password' className='login__input' />
            </Form>
        </main>
    )
}

export default Login;