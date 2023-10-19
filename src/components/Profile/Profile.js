import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import Header from '../Header/Header';
import Form from '../Form/Form';
import Input from '../Form/Input/Input';
import Error from '../Form/Error/Error.js';
import Button from '../Button/Button';
import { useFormWithValidation } from "../../utils/useFormWithValidation.js";
import { checkRegexEmail, checkRegexName } from "../../utils/utils.js";

function Profile(props) {
    const { values, handleChange, errors, isValid, resetForm, setValues } =
        useFormWithValidation();

    const { name, email } = values;

    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        resetForm();
        setValues({
            name: currentUser.name,
            email: currentUser.email,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name: name,
            email: email,
        });
    }
    console.log(!isValid ||
        checkRegexEmail(email).invalid ||
        checkRegexName(name).invalid || ((currentUser.name === values.name) && (currentUser.email === values.email)));
    return (
        <>
            <Header main={props.main} authForm={props.authForm} isLoggedIn={props.isLoggedIn} />
            <main className="main">
                <Form formName="profile" isLoggedIn={props.isLoggedIn} onSubmit={handleSubmit} formTitle={`Привет, ${currentUser.name}!`} >
                    <Input name="name" type="text" title="Имя" minLength="2" maxLength="30" isLoggedIn={props.isLoggedIn} placeholder="Введите имя." onChange={handleChange} value={values.name} />
                    <Error classNameError="form__error form__error-edit" textError={errors.name || checkRegexName(name).message} />
                    <Input name="email" type="email" title="E-mail" isLoggedIn={props.isLoggedIn} placeholder="Введите электронную почту." onChange={handleChange} value={values.email} />
                    <Error classNameError="form__error form__error-edit" textError={errors.email || checkRegexEmail(email).message} />
                    <div className='form__footer form__footer-edit'>
                        <Error textError={props.messageError} />
                        <Button
                            buttonTitle={(!isValid ||
                                checkRegexEmail(email).invalid ||
                                checkRegexName(name).invalid) || ((currentUser.name === values.name) && (currentUser.email === values.email)) ? "Редактировать" : "Сохранить"}
                            type="submit" buttonName="edit" buttonClassName="button-edit" onClick={handleSubmit} disabled={!isValid ||
                                checkRegexEmail(email).invalid ||
                                checkRegexName(name).invalid || ((currentUser.name === values.name) && (currentUser.email === values.email)) ? true : false} />
                        <p className="form__span">
                            <Link to="/" className="form__link form__link_out" replace onClick={props.onSignOut}>Выйти из аккаунта</Link>
                        </p>
                    </div>
                </Form>
            </main>
        </>
    );
};

export default Profile;
