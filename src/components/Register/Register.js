import React from 'react';
import Form from '../Form/Form';
import Input from '../Form/Input/Input';
import Error from '../Form/Error/Error';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';

function Register(isLoggedIn) {

    return (
        <Form formName="register" isLoggedIn={isLoggedIn} >
            <Input name="name" type="text" title="Имя" minLength="2" maxLength="30" value="Виталий" isLoggedIn={isLoggedIn} placeholder="Введите имя." />
            <Input name="email" type="email" title="E-mail" value="pochta@yandex.ru" isLoggedIn={isLoggedIn} placeholder="Введите электронную почту." />
            <Input name="password" type="password" title="Пароль" value="" isLoggedIn={isLoggedIn} placeholder="Введите пароль." />
            <Error textError="Что-то пошло не так..." />
            <div className='form__footer'>
                <Button buttonClassName="button-sign" buttonName="signup" buttonTitle="Зарегистрироваться" />
                <p className="form__span">Уже зарегистрированы?
                    <Link to="/signin" className="form__link" replace>Войти</Link>
                </p>
            </div>
        </Form>
    );
};

export default Register;
