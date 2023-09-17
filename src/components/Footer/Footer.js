import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer">
            <p className="footer__description">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__container">
                <p className="footer__copyright">© 2023</p>
                <ul className="footer__list">
                    <li className="footer__item">
                        <Link className="footer__link" to="https://practicum.yandex.ru">Яндекс.Практикум</Link>
                    </li>
                    <li className="footer__item">
                        <Link className="footer__link" to="https://github.com/hope-208/movies-explorer-frontend">Github</Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;