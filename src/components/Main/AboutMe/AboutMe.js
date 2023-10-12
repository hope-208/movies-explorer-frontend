import React from 'react';
import './AboutMe.css';
import myPhoto from '../../../images/my-photo.jpg';
import { MY_GITHUB } from '../../../utils/utils.js';

function AboutMe() {
    return (
        <section className="section about-me" id="about-me" aria-label="Студент.">
            <h2 className="section__title">Студент</h2>
            <div className="about-me__container">
                <div className="about-me__container-description">
                    <h3 className="about-me__title">Надежда</h3>
                    <p className="about-me__subtitle">Фронтенд-разработчик, 27 лет</p>
                    <span className="about-me__description">Я родилась и живу в Ульяновске, закончила Ульяновский филиал
                        РАНХиГС с двумя красными дипломами по направлениям подготовки «Государственное и муниципальное
                        управление» и «Юриспруденция». Чуть более 4х лет поработала по специальности в государственном
                        секторе. В прошлом году захотела развиваться в сфере web-разработки и стала студентом Яндекс
                        Практикума, о чём не жалею. В свободное время занимаюсь акройогой. Учусь играть на гитаре,
                        танцевать танго, бразильский зук и бачату.
                    </span>
                    <a className="about-me__link" href={MY_GITHUB} target="_blank" rel="noopener noreferrer">Github</a>
                </div>
                <img className="about-me__photo" src={myPhoto} alt="Фотография Надежды." />
            </div>
        </section>
    );
}

export default AboutMe;