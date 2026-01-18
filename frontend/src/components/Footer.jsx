import React from "react";
import { useLanguage } from "../context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer id="contact">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="logo">
              <img
                src="/logo.jpg"
                alt="Shree Rajpokhari Logo"
                style={{
                  height: "50px",
                  marginRight: "10px",
                  borderRadius: "5px",
                }}
              />
              <h5 style={{ margin: 0, color: "#fff" }}>{t("navodaya")}</h5>
            </div>
            <p style={{ marginTop: "1rem" }}>{t("footer_desc")}</p>
          </div>
          <div className="footer-col">
            <h5>{t("nav_reports")}</h5>
            <ul>
              <li>
                <a href="#">{t("nav_home")}</a>
              </li>
              <li>
                <a href="#">{t("nav_about")}</a>
              </li>
              <li>
                <a href="#">{t("nav_services")}</a>
              </li>
              <li>
                <a href="#">{t("nav_contact")}</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>{t("nav_services")}</h5>
            <ul>
              <li>
                <a href="#">{t("serv_saving")}</a>
              </li>
              <li>
                <a href="#">{t("serv_loan")}</a>
              </li>
              <li>
                <a href="#">{t("serv_remit")}</a>
              </li>
              <li>
                <a href="#">{t("serv_mobile")}</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>{t("nav_contact")}</h5>
            <ul>
              <li>
                <i className="fa-solid fa-location-dot"></i> {t("address")}
              </li>
              <li>
                <i className="fa-solid fa-phone"></i> 010-520123
              </li>
              <li>
                <i className="fa-solid fa-envelope"></i> info@rajpokhari.com.np
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; 2026 {t("navodaya")} {t("coop_ltd")} All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
