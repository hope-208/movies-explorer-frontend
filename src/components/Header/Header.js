import React from 'react';
import logoSmile from '../../images/logo-smile.svg';
import './Header.css';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Header() {
    return (
        <header className="header">
            <section className="header__container">
                <Link className="header__link" to="/">
                    <img className="header__logo" src={logoSmile} alt="Логотип: Movies Explorer." />
                </Link>
                <Navigation />
            </section>
        </header>
    );
}

export default Header;