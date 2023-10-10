import React from 'react';
import avatar from '../../images/avatar.svg';
import { Link, NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation(props) {

    return (
        <nav className="nav">
            <ul className="nav__list">
                {props.main && (
                    <div className="nav__container before-auth">
                        <li className="nav__item">
                            <Link className="nav__link nav__link-up" to="/signup">Регистрация</Link>
                        </li>
                        <li className="nav__item">
                            <Link className="nav__link nav__link-in" to="/signin">Войти</Link>
                        </li>
                    </div>
                )}

                {props.isLoggedIn && (
                    <>
                        <input className="hamburger-button" id="hamburger" type="checkbox"></input>

                        <label htmlFor="hamburger" className="hamburger">
                            <div className="hamburger__line hamburger__line-top"></div>
                            <div className="hamburger__line hamburger__line-middle"></div>
                            <div className="hamburger__line hamburger__line-bottom"></div>
                        </label>
                        <div className="nav__hamburger-container">
                            <div className="nav__hamburger-list">
                                <div className="nav__container after-auth">
                                    <li className="nav__item nav__item-main">
                                        <NavLink className="nav__link" to="/" style={({ isActive }) => ({ textDecoration: isActive ? 'underline' : 'none' })}>Главная</NavLink>
                                    </li>
                                    <li className="nav__item">
                                        <NavLink className="nav__link" to="/movies" style={({ isActive }) => ({ textDecoration: isActive ? 'underline' : 'none' })}>Фильмы</NavLink>
                                    </li>
                                    <li className="nav__item">
                                        <NavLink className="nav__link" to="/saved-movies" style={({ isActive }) => ({ textDecoration: isActive ? 'underline' : 'none' })}>Сохранённые фильмы</NavLink>
                                    </li>
                                </div>
                                <li className="nav__item">
                                    <Link className="nav__link nav__link_account" to="/users/me">
                                        <p className="nav__link_text">Аккаунт</p>
                                        <img className="nav__link_icon" src={avatar} alt="Иконка аватара профиля." />
                                    </Link>
                                </li>
                            </div>
                        </div>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navigation;