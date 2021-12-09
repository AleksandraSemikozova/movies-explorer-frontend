import React from "react";
import "./AboutProject.css";
import SectionTitle from "../SectionTitle/SectionTitle";
import FlexContainer from "../FlexContainer/FlexContainer";

function AboutProject(props) {
  return (
    <section className="about-project" id="about">
      <FlexContainer>
        <SectionTitle title="О проекте" />
        <ul className="about-project__description">
          <li className="about-project__description-item">
            <h3 className="about-project__subtitle">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="about-project__text">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </li>
          <li>
            <h3 className="about-project__subtitle">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="about-project__text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <div className="about-project__duration">
          <div className="about-project__duration_stage_one">
            <p className="about-project__duration-text about-project__text_stage_one">
              1 неделя
            </p>
            <span className="about-project__duration-text">Back-end</span>
          </div>

          <div className="about-project__duration_stage_two">
            <p className="about-project__duration-text about-project__text_stage_two">
              4 недели
            </p>
            <span className="about-project__duration-text">Front-end</span>
          </div>
        </div>
      </FlexContainer>
    </section>
  );
}

export default AboutProject;
