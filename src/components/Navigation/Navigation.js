import React from 'react';
import avatar from '../../images/avatar.svg';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
    return (
        <nav className="nav">
            <ul className="nav__list">
                <article className="nav__container after-auth">
                    <li className="nav__item">
                        <Link className="nav__link" to="/movies">Фильмы</Link>
                    </li>
                    <li className="nav__item">
                        <Link className="nav__link" to="/movies">Сохранённые фильмы</Link>
                    </li>
                </article>
                <article className="nav__container before-auth">
                    <li className="nav__item">
                        <Link className="nav__link" to="/signup">Регистрация</Link>
                    </li>
                    <li className="nav__item">
                        <Link className="nav__link nav__link-in" to="/signin">Войти</Link>
                    </li>
                </article>
                <li className="nav__item">
                    <Link className="nav__link nav__link_account" to="/movies">
                        <p className="nav__link_text">Аккаунт</p>
                        <img className="nav__link_icon" src={avatar} alt="Иконка аватара профиля." />
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;