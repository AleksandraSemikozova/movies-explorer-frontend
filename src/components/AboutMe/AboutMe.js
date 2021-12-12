import React from "react";
import "./AboutMe.css";
import photo from "../../images/profile-photo.jpg";
import FlexContainer from "../FlexContainer/FlexContainer";
import SectionTitle from "../SectionTitle/SectionTitle";
import Portfolio from "../Portfolio/Portfolio";

function AboutMe() {
  return (
    <section className="about-me" id="student">
      <FlexContainer>
        <SectionTitle title="Студент" />
        <div className="about-me__wrap">
          <div className="about-me__description">
            <h4 className="about-me__title">Александра</h4>
            <p className="about-me__subtitle">Фронтенд-разработчик, 30 лет</p>
            <p className="about-me__description-text">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У
              меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
              бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
              Контур». После того, как прошёл курс по веб-разработке, начал
              заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <p className="about-me__links">
              <a className="about-me__link" href="https://www.facebook.com/">
                Facebook
              </a>
              <a
                className="about-me__link"
                href="https://github.com/AleksandraSemikozova">
                GitHab
              </a>
            </p>
          </div>
          <img className="about-me__photo" src={photo} alt="Фото" />
        </div>
      </FlexContainer>
      <Portfolio />
    </section>
  );
}

export default AboutMe;
