import React from 'react';
import './AboutProject.css';

function AboutProject() {
    return (
        <section className="section about-project" id="about-project" aria-label="О проекте.">
            <h2 className="section__title">О проекте</h2>
            <ul className="about-project__list">
                <li className="about-project__item">
                    <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
                    <p className="about-project__description">Составление плана, работу над бэкендом,
                        вёрстку, добавление функциональности и финальные доработки.</p>
                </li>
                <li className="about-project__item">
                    <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
                    <p className="about-project__description">У каждого этапа был мягкий и жёсткий дедлайн,
                        которые нужно было соблюдать, чтобы успешно защититься.</p>
                </li>
            </ul>
            <div className="table">
                <div className="table__container">
                    <p className="table__stage table__stage_span">1 неделя</p>
                    <span className="table__description">Back-end</span>
                </div>
                <div className="table__container">
                    <p className="table__stage">4 недели</p>
                    <span className="table__description">Front-end</span>
                </div>
            </div>
        </section>
    );
}

export default AboutProject;