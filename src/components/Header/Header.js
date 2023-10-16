import React from 'react';
import logoSmile from '../../images/logo-smile.svg';
import './Header.css';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Header(props) {
    const headerClassName = !props.main ? "header-auth" : "";
    const headerClassNameContainer = props.authForm ? "header__container-auth" : "";
    return (
        <header className={`header ${headerClassName}`}>
            <div className={`header__container ${headerClassNameContainer}`}>
                <Link className="header__link" to="/">
                    <img className="header__logo" src={logoSmile} alt="Логотип: Movies Explorer." />
                </Link>
                {(props.isLoggedIn || props.main) && (<Navigation main={props.main} isLoggedIn={props.isLoggedIn} />)}
            </div>
        </header>
    );
}

export default Header;