import React, { useState } from 'react';
import Form from '../Form/Form';
import Input from '../Form/Input/Input';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';

function Profile(isLoggedIn) {

    const [isEdit, setIsEdit] = useState(false);

    const handleEdit = () => {
        setIsEdit(!isEdit);
    };

    return (
        <>
            <Form formName="profile" isLoggedIn={isLoggedIn} >
                <Input name="name" type="text" title="Имя" minLength="2" maxLength="30" value="Виталий" isLoggedIn={isLoggedIn} disabled={!isEdit} placeholder="Введите имя." />
                <Input name="email" type="email" title="E-mail" value="pochta@yandex.ru" isLoggedIn={isLoggedIn} disabled={!isEdit} placeholder="Введите электронную почту." />
                <div className='form__footer form__footer-edit'>
                    <Button buttonClassName="button-edit" buttonName="edit" buttonTitle={isEdit === false ? 'Редактировать' : 'Сохранить'} onClick={handleEdit} />
                    <p className="form__span">
                        <Link to="/signin" className="form__link form__link_out" replace>Выйти из аккаунта</Link>
                    </p>
                </div>
            </Form>
        </>
    );
};

export default Profile;
