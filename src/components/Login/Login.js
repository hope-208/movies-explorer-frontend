import React, { useState } from 'react';
import Form from '../Form/Form';
import Input from '../Form/Input/Input';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';

function Login(props) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValue({
            ...formValue,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { password, email } = formValue;

        if (!password || !email) {
            return;
        }
        props.onSignIn(formValue);
    };

    return (
        <Form formName="login" isLoggedIn={props.isLoggedIn} onSubmit={handleSubmit}>
            <Input name="email" type="email" title="E-mail" isLoggedIn={props.isLoggedIn} placeholder="Введите электронную почту." value={formValue.email} onChange={handleChange} />
            <Input name="password" type="password" title="Пароль" minLength="6" isLoggedIn={props.isLoggedIn} placeholder="Введите пароль." value={formValue.password} onChange={handleChange} />
            <div className='form__footer'>
                <Button buttonClassName="button-sign button-sign-in" type="submit" buttonName="signin" buttonTitle={props.isLoading.isLoading ? 'Вход...' : 'Войти'} />
                <p className="form__span">Ещё не зарегистрированы?
                    <Link to="/signup" className="form__link" replace>Регистрация</Link>
                </p>
            </div>
        </Form>
    );
};

export default Login;
