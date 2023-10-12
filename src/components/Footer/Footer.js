import React from 'react';
import './Footer.css';
import { WEBSITE_OF_YA_PRACTICUM, REPOSITORY_OF_THIS_WEBSITE } from '../../utils/utils.js';

function Footer() {
    return (
        <footer className="footer">
            <p className="footer__description">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__container">
                <p className="footer__copyright">© 2023</p>
                <ul className="footer__list">
                    <li className="footer__item">
                        <a className="footer__link" href={WEBSITE_OF_YA_PRACTICUM} target="_blank" rel="noopener noreferrer">Яндекс.Практикум</a>
                    </li>
                    <li className="footer__item">
                        <a className="footer__link" href={REPOSITORY_OF_THIS_WEBSITE} target="_blank" rel="noopener noreferrer">Github</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;