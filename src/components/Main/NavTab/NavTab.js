import React from 'react';
import { Link } from 'react-router-dom';
import './NavTab.css';
import { LINK_ABOUT_PROJECT, LINK_TECHS, LINK_ABOUT_ME } from '../../../utils/utils.js';

function NavTab() {
    return (
        <nav className="nav-tab">
            <ul className="nav-tab__list">
                <li className="nav-tab__item">
                    <Link className="nav-tab__link" reloadDocument to={LINK_ABOUT_PROJECT}>О проекте</Link>
                </li>
                <li className="nav-tab__item">
                    <Link className="nav-tab__link" reloadDocument to={LINK_TECHS}>Технологии</Link>
                </li>
                <li className="nav-tab__item">
                    <Link className="nav-tab__link" reloadDocument to={LINK_ABOUT_ME}>Студент</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavTab;