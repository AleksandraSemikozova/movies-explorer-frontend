import "./InfoTooltip.css";

function InfoTooltip(props) {
  return (
    <section
      className={`info-tooltip__popup
    ${props.isOpen ? "info-tooltip__popup_opened" : ""} `}>
      <div className="info-tooltip__container">
        <button
          className="info-tooltip__close-icon"
          onClick={props.onClose}></button>
        <img alt="Иконка результата" className="info-tooltip__result-icon" />
        <h2 className="info-tooltip__result-title">{props.message}</h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
