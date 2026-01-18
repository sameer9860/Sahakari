import React from "react";
import { useLanguage } from "../context/LanguageContext";

const Stats = () => {
  const { t } = useLanguage();
  return (
    <section className="stats">
      <div className="container">
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">109,395,157</span>
            <span className="stat-label">{t("stats_assets")}</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">17,531</span>
            <span className="stat-label">{t("stats_shareholders")}</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">12</span>
            <span className="stat-label">{t("stats_branches")}</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">76</span>
            <span className="stat-label">{t("stats_staff")}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
