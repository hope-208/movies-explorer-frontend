import React from 'react';
// import { Link } from 'react-router-dom';
// import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Promo from './Promo/Promo';
import NavTab from './NavTab/NavTab';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';
// import Card from './Card.js';
// import Footer from './Footer.js';

function Main() {
    // const currentUser = useContext(CurrentUserContext);

    return (
        <>
            <Promo />
            <NavTab />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
        </>
    );
}

export default Main;
