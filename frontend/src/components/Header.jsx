import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <>
      {/* TOP BAR */}
      <div className="top-bar">
        <div className="container">
          <div>
            <i className="fa-solid fa-phone me-2"></i> 023-475186 &nbsp;|&nbsp;
            <i className="fa-solid fa-envelope me-2"></i> info@rajpokhari.com.np
          </div>
          <div>
            <a
              href="#"
              className="lang-toggle"
              onClick={(e) => {
                e.preventDefault();
                toggleLanguage();
              }}
              style={{
                color: "var(--white)",
                fontWeight: 600,
                textDecoration: "none",
                marginRight: "15px",
              }}
            >
              <span id="lang-text">{language === "en" ? "NEP" : "ENG"}</span>{" "}
              <i className="fa-solid fa-globe"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-facebook"></i>
            </a>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="header-main">
        <div
          className="container nav-container"
          style={{ position: "relative" }}
        >
          <div className="logo">
            <img
              src="/logo.jpg"
              alt="Shree Rajpokhari Logo"
              style={{ height: "60px", marginRight: "10px" }}
            />
            <div>
              <h1 style={{ margin: 0, fontSize: "1.2rem", lineHeight: 1.2 }}>
                {t("navodaya")}
              </h1>
              <small
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  fontSize: "0.7rem",
                  color: "var(--text-light)",
                }}
              >
                {t("coop_ltd")}
              </small>
            </div>
          </div>

          <div
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className="fa-solid fa-bars"></i>
          </div>

          <nav>
            <ul className={`nav-menu ${mobileMenuOpen ? "active" : ""}`}>
              <li>
                <a href="#" className="nav-link">
                  {t("nav_home")}
                </a>
              </li>
              <li>
                <a href="#about" className="nav-link">
                  {t("nav_about")}
                </a>
              </li>
              <li>
                <a href="#services" className="nav-link">
                  {t("nav_services")}
                </a>
              </li>
              <li>
                <a href="#reports" className="nav-link">
                  {t("nav_reports")}
                </a>
              </li>
              <li>
                <a href="#contact" className="nav-link">
                  {t("nav_contact")}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
