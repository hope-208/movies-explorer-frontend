import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';
import Input from '../Form/Input/Input';
import Error from '../Form/Error/Error';
import Button from '../Button/Button';
// import { useFormWithValidation } from "../../utils/validate";

function Register(props) {
    // const { values, handleChange, errors, isValid, resetForm } =
    //     useFormWithValidation();

    // const { props.name, props.email, props.password } = values;

    const [formValue, setFormValue] = useState({
        userName: '',
        password: '',
        email: '',
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
        const data = { name: formValue.userName, password: formValue.password, email: formValue.email };
        props.onSignUp(data);
    };

    return (
        <Form
            formName="register"
            isLoggedIn={props.isLoggedIn}
            onSubmit={handleSubmit} >
            <Input name="userName"
                type="text"
                title="Имя"
                minLength="2"
                maxLength="30"
                isLoggedIn={props.isLoggedIn}
                value={formValue.userName}
                onChange={handleChange}
                placeholder="Введите имя." />
            <Input name="email" type="email" title="E-mail" isLoggedIn={props.isLoggedIn} value={formValue.email}
                onChange={handleChange} placeholder="Введите электронную почту." />
            <Input name="password" type="password" title="Пароль" minLength="6" isLoggedIn={props.isLoggedIn} value={formValue.password}
                onChange={handleChange} placeholder="Введите пароль." />
            <Error textError="Что-то пошло не так..." />
            <div className='form__footer'>
                <Button buttonClassName="button-sign button-sign-up" type="submit" buttonName="signup" buttonTitle={props.isLoading.isLoading ? 'Регистрация...' : 'Зарегистрироваться'} />
                <p className="form__span">Уже зарегистрированы?
                    <Link to="/signin" className="form__link" replace>Войти</Link>
                </p>
            </div>
        </Form>
    );
};

export default Register;
