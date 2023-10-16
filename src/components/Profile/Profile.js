import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import Header from '../Header/Header';
import Form from '../Form/Form';
import Input from '../Form/Input/Input';
import Error from '../Form/Error/Error';
import Button from '../Button/Button';
import { useFormWithValidation } from "../../utils/useFormWithValidation.js";
import { checkRegexEmail, checkRegexName } from "../../utils/utils.js";

function Profile(props) {
    const currentUser = useContext(CurrentUserContext);

    const { values, handleChange, errors, isValid, resetForm, setValues } =
        useFormWithValidation();

    const { name, email } = values;

    // console.log(setValues());
    React.useEffect(() => {
        resetForm();
        setValues({
            name: currentUser.name,
            email: currentUser.email,
        });
    }, [currentUser, setValues]);

    // useEffect(() => {
    //     setValues({
    //         name: currentUser.userName,
    //         email: currentUser.userEmail,
    //     });
    // }, [currentUser, setValues]);

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const data = { name: userName,  email: email };
    //     props.onSignUp(data);
    // };
    // useEffect(() => {
    //     if (currentUser) {
    //         resetForm(currentUser);
    //     }
    // }, [currentUser, resetForm]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name: name,
            email: email,
        });
    }

    return (
        <>
            <Header main={props.main} authForm={props.authForm} isLoggedIn={props.isLoggedIn} />
            <main className="main">
                <Form formName="profile" isLoggedIn={props.isLoggedIn} onSubmit={handleSubmit} >
                    <Input name="name" type="text" title="Имя" minLength="2" maxLength="30" isLoggedIn={props.isLoggedIn} placeholder="Введите имя." onChange={handleChange} value={name} />
                    <Error textError={errors.name || checkRegexName(name).message} />
                    <Input name="email" type="email" title="E-mail" isLoggedIn={props.isLoggedIn} placeholder="Введите электронную почту." onChange={handleChange} value={email} />
                    <Error textError={errors.email || checkRegexEmail(email).message} />
                    <div className='form__footer form__footer-edit'>
                        <Error textError={props.messageError} />
                        <Button buttonClassName="button-edit" type="submit" buttonName="edit" buttonTitle="Редактировать" disabled={!isValid} />
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
