import React from 'react';
import './Portfolio.css';
import { MY_STATIC_WEBSITE, MY_ADAPYIVE_WEBSITE, MY_SPA_WEBSITE } from '../../../utils/utils.js';

function Portfolio() {
    return (
        <section className="portfolio" aria-label="Портфолио.">
            <h3 className="portfolio__title">Портфолио</h3>
            <ul className="portfolio__list">
                <li className="portfolio__item">
                    <a className="portfolio__link" href={MY_STATIC_WEBSITE} target="_blank" rel="noopener noreferrer">Статичный сайт</a>
                </li>
                <li className="portfolio__item portfolio__item-middle">
                    <a className="portfolio__link" href={MY_ADAPYIVE_WEBSITE} target="_blank" rel="noopener noreferrer">Адаптивный сайт</a>
                </li>
                <li className="portfolio__item">
                    <a className="portfolio__link" href={MY_SPA_WEBSITE} target="_blank" rel="noopener noreferrer">Одностраничное приложение</a>
                </li>
            </ul>
        </section>
    );
}

export default Portfolio;