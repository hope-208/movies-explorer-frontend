import React from 'react';
import Form from '../Form/Form';
import Input from '../Form/Input/Input';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';

function Login(isLoggedIn) {

    return (
        <Form formName="login" isLoggedIn={isLoggedIn} >
            <Input name="email" type="email" title="E-mail" value="pochta@yandex.ru" isLoggedIn={isLoggedIn} placeholder="Введите электронную почту." />
            <Input name="password" type="password" title="Пароль" value="••••••••••••••" isLoggedIn={isLoggedIn} placeholder="Введите пароль." />
            <div className='form__footer'>
                <Button buttonClassName="button-sign" buttonName="signin" buttonTitle="Войти" />
                <p className="form__span">Ещё не зарегистрированы?
                    <Link to="/signup" className="form__link" replace>Регистрация</Link>
                </p>
            </div>
        </Form>
    );
};

export default Login;
