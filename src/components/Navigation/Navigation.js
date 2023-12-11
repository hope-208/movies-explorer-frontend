import React from 'react';
import avatar from '../../images/avatar.svg';
import { Link, NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation(props) {
    return (
        <nav className="nav">
            {props.isLoggedIn ? (
                <>
                    <input className="hamburger-button" id="hamburger" type="checkbox"></input>

                    <label htmlFor="hamburger" className="hamburger">
                        <span className="hamburger__line hamburger__line-top"></span>
                        <span className="hamburger__line hamburger__line-middle"></span>
                        <span className="hamburger__line hamburger__line-bottom"></span>
                    </label>
                    <div className="nav__hamburger-container">
                        <div className="nav__hamburger-list">
                            <div className="nav__container after-auth">
                                <NavLink className="nav__link nav__link-main" to="/" style={({ isActive }) => ({ textDecoration: isActive ? 'underline' : 'none' })}>Главная</NavLink>
                                <NavLink className="nav__link" to="/movies" style={({ isActive }) => ({ textDecoration: isActive ? 'underline' : 'none' })}>Фильмы</NavLink>
                                <NavLink className="nav__link" to="/saved-movies" style={({ isActive }) => ({ textDecoration: isActive ? 'underline' : 'none' })}>Сохранённые фильмы</NavLink>

                            </div>
                            <Link className="nav__link nav__link-account" to="/users/me">
                                <p className="nav__link-text">Аккаунт</p>
                                <img className="nav__link-icon" src={avatar} alt="Иконка аватара профиля." />
                            </Link>
                        </div>
                    </div>
                </>
            ) : (
                <div className="nav__container before-auth">
                    <Link className="nav__link nav__link-up" to="/signup">Регистрация</Link>
                    <Link className="nav__link nav__link-in" to="/signin">Войти</Link>
                </div>
            )}
        </nav>
    );
}

export default Navigation;