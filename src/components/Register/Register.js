import './Register.css';
import Form from '../Form/Form';

function Register(props) {
    return (
        <main>
            <Form title="Добро пожаловать!"
                button="Зарегистрироваться"
                caption="Уже зарегистрированы? "
                linkText="Войти"
                link='/signin'
            >
                <label className='register__label'>Имя</label>
                <input type='text' className='register__input' />
                <label className='register__label'>E-mail</label>
                <input type='email' className='register__input' />
                <label className='register__label'>Пароль</label>
                <input type='password' className='register__input' />
            </Form>
        </main>
    );
}

export default Register;