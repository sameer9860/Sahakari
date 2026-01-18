import React from "react";
import { useLanguage } from "../context/LanguageContext";

const About = () => {
  const { t } = useLanguage();
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-text">
            <h3>{t("about_title")}</h3>
            <p>{t("about_p1")}</p>
            <p>{t("about_p2")}</p>
            <a
              href="#"
              className="btn btn-primary"
              style={{
                background: "var(--primary-color)",
                color: "var(--white)",
              }}
            >
              {t("about_btn")}
            </a>
          </div>
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
              alt="Office Environment"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
