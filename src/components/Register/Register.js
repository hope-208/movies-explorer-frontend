import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Form from '../Form/Form';
import Input from '../Form/Input/Input';
import Error from '../Form/Error/Error';
import Button from '../Button/Button';
import { useFormWithValidation } from "../../utils/useFormWithValidation.js";
import { checkRegexEmail, checkRegexName } from "../../utils/utils.js";


function Register(props) {

    const navigate = useNavigate();

    useEffect(() => {
        if (props.isLoggedIn) {
            navigate("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.isLoggedIn]);

    const { values, handleChange, errors, isValid } =
        useFormWithValidation();

    const { userName, password, email } = values;


    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { name: userName, password: password, email: email };
        props.onSignUp(data);
    };

    return (
        <Form
            formName="register"
            isLoggedIn={props.isLoggedIn}
            onSubmit={handleSubmit}
            formTitle="Добро пожаловать!" >
            <Input name="userName"
                type="text"
                title="Имя"
                minLength="2"
                maxLength="30"
                isLoggedIn={props.isLoggedIn}
                value={userName}
                onChange={handleChange}
                placeholder="Введите имя." />
            <Error textError={errors.userName || checkRegexName(userName).message} />
            <Input name="email" type="email" title="E-mail" isLoggedIn={props.isLoggedIn} value={email}
                onChange={handleChange} placeholder="Введите электронную почту." />
            <Error textError={errors.email || checkRegexEmail(email).message} />
            <Input name="password" type="password" title="Пароль" minLength="6" isLoggedIn={props.isLoggedIn} value={password}
                onChange={handleChange} placeholder="Введите пароль." />
            <Error textError={errors.password} />
            <div className='form__footer'>
                <Error textError={props.messageError} />
                <Button buttonClassName="button-sign button-sign-up" type="submit" buttonName="signup" buttonTitle={props.isLoading.isLoading ? 'Регистрация...' : 'Зарегистрироваться'} disabled={!isValid} />
                <p className="form__span">Уже зарегистрированы?
                    <Link to="/signin" className="form__link" replace>Войти</Link>
                </p>
            </div>
        </Form>
    );
};

export default Register;
