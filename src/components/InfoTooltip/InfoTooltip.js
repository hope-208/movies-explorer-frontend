import React from 'react';
import './InfoTooltip.css';
import Button from '../Button/Button';

function InfoTooltip(props) {
  return (
    <section className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <Button
          buttonClassName="button-close"
          type="button"
          name="close"
          onClick={props.onClose}
        />
        <div className="popup__info-container">
          <img className="popup__icon" src={props.src} alt="Иконка статуса действий пользователя." />
          <h2 className="popup__title">{props.title}</h2>
        </div>
      </div>
    </section>
  );
}

export default InfoTooltip;
