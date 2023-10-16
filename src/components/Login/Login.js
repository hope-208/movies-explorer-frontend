import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';
import Input from '../Form/Input/Input';
import Error from '../Form/Error/Error';
import Button from '../Button/Button';
import { useFormWithValidation } from "../../utils/useFormWithValidation.js";
import { checkRegexEmail } from "../../utils/utils.js";

function Login(props) {

    const { values, handleChange, errors, isValid, resetForm } =
        useFormWithValidation();

    const { email, password } = values;

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const data = { email: email, password: password };
    //     props.onSignUp(data);
    // };



    const handleSubmit = (e) => {
        e.preventDefault();

        const data = { email: email, password: password };

        if (!password || !email) {
            return;
        }
        props.onSignIn(data);
    };

    return (
        <Form formName="login" isLoggedIn={props.isLoggedIn} onSubmit={handleSubmit}>
            <Input name="email" type="email" title="E-mail" isLoggedIn={props.isLoggedIn} placeholder="Введите электронную почту." value={email} onChange={handleChange} />
            <Error textError={errors.email || checkRegexEmail(email).message} />
            <Input name="password" type="password" title="Пароль" minLength="6" isLoggedIn={props.isLoggedIn} placeholder="Введите пароль." value={password} onChange={handleChange} />
            <Error textError={errors.password} />
            <div className='form__footer'>
                <Error textError={props.messageError} />
                <Button buttonClassName="button-sign button-sign-in" type="submit" buttonName="signin" buttonTitle={props.isLoading.isLoading ? 'Вход...' : 'Войти'} disabled={!isValid} />
                <p className="form__span">Ещё не зарегистрированы?
                    <Link to="/signup" className="form__link" replace>Регистрация</Link>
                </p>
            </div>
        </Form>
    );
};

export default Login;
