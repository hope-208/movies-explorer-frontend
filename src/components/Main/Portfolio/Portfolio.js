import React from 'react';
import './Portfolio.css';
import { Link } from 'react-router-dom';

function Portfolio() {
    return (
        <section className="portfolio" aria-label="Портфолио.">
            <h3 className="portfolio__title">Портфолио</h3>
            <ul className="portfolio__list">
                <li className="portfolio__item">
                    <Link className="portfolio__link" to="">Статичный сайт</Link>
                </li>
                <li className="portfolio__item portfolio__item-middle">
                    <Link className="portfolio__link" to="">Адаптивный сайт</Link>
                </li>
                <li className="portfolio__item">
                    <Link className="portfolio__link" to="">Одностраничное приложение</Link>
                </li>
            </ul>
        </section>
    );
}

export default Portfolio;