import React, { useContext, useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import Header from '../Header/Header';
import Form from '../Form/Form';
import Input from '../Form/Input/Input';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';

function Profile(props) {
    //console.log(props);
    const [userName, setName] = useState('');
    const [userEmail, setEmail] = useState('');

    const currentUser = useContext(CurrentUserContext);

    const [isEditInactive, setIsEditInactive] = useState(true);

    useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email);
    }, [currentUser]);

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeEmail(evt) {
        setEmail(evt.target.value);
    }

    useEffect(() => {
        if ((userName !== currentUser.name) || (userEmail !== currentUser.email)) {
            setIsEditInactive(false);
        } else {
            setIsEditInactive(true);
        }
    }, [userName, userEmail]);

    function handleSubmit(e) {
        e.preventDefault();
        if ((userName !== currentUser.name) || (userEmail !== currentUser.email)) {
            props.onUpdateUser({
                name: userName,
                email: userEmail,
            });
            setIsEditInactive(true);
        }


    }

    return (
        <>
            <Header main={props.main} authForm={props.authForm} isLoggedIn={props.isLoggedIn} />
            <main className="main">
                <Form formName="profile" isLoggedIn={props.isLoggedIn} onSubmit={handleSubmit} >
                    <Input name="name" type="text" title="Имя" minLength="2" maxLength="30" isLoggedIn={props.isLoggedIn} placeholder="Введите имя." onChange={handleChangeName} value={userName} />
                    <Input name="email" type="email" title="E-mail" isLoggedIn={props.isLoggedIn} placeholder="Введите электронную почту." onChange={handleChangeEmail} value={userEmail} />
                    <div className='form__footer form__footer-edit'>
                        <Button buttonClassName="button-edit" type="submit" buttonName="edit" buttonTitle="Редактировать" disabled={isEditInactive} />
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
