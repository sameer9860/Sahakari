import React from "react";
import { useLanguage } from "../context/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <span className="hero-tagline">{t("hero_tagline")}</span>
          <h2>{t("hero_title")}</h2>
          <p>{t("hero_desc")}</p>
          <div className="hero-buttons">
            <a href="#contact" className="btn btn-primary">
              {t("hero_btn_member")}
            </a>
            <a href="#services" className="btn btn-outline">
              {t("hero_btn_services")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
