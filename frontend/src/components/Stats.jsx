import React from "react";
import { useLanguage } from "../context/LanguageContext";

const Stats = () => {
  const { t } = useLanguage();
  return (
    <section className="stats">
      <div className="container">
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">109,395,123</span>
            <span className="stat-label">{t("stats_assets")}</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">3000</span>
            <span className="stat-label">{t("stats_shareholders")}</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">4</span>
            <span className="stat-label">{t("stats_branches")}</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">37</span>
            <span className="stat-label">{t("stats_staff")}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
