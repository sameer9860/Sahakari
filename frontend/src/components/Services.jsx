import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useLanguage } from "../context/LanguageContext";

const Services = () => {
  const { t, language } = useLanguage();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback services if API is empty or fails - update when language changes
  const fallbackServices = useMemo(
    () => [
      { icon: "💰", title: t("serv_saving"), desc: t("serv_saving_desc") },
      { icon: "🤝", title: t("serv_loan"), desc: t("serv_loan_desc") },
      { icon: "📱", title: t("serv_mobile"), desc: t("serv_mobile_desc") },
      { icon: "🌍", title: t("serv_remit"), desc: t("serv_remit_desc") },
      { icon: "🎓", title: t("serv_scholar"), desc: t("serv_scholar_desc") },
      { icon: "🌾", title: t("serv_agri"), desc: t("serv_agri_desc") },
    ],
    [t, language]
  );

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/services/");
        if (response.data && response.data.length > 0) {
          setServices(response.data);
        } else {
          // Keep fallback if no data
        }
      } catch (error) {
        console.error("Error fetching services, using fallback:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const displayServices = services.length > 0 ? services : fallbackServices;

  return (
    <section className="services" id="services">
      <div className="container">
        <div className="section-title">
          <h2>{t("services_title")}</h2>
          <p>{t("services_subtitle")}</p>
        </div>

        <div className="services-grid">
          {displayServices.map((service, index) => {
            // Choose title/desc based on current language, fallback to English/default
            const displayTitle =
              language === "np"
                ? service.title_np || service.title
                : service.title;
            const displayDesc =
              language === "np"
                ? service.description_np || service.desc || service.description
                : service.desc || service.description;

            return (
              <div className="service-card" key={service.id || index}>
                {/* Use API icon if available, else generic or fallback icon */}
                <span className="service-icon">{service.icon || "🛠️"}</span>
                <h4>{displayTitle}</h4>
                <p>{displayDesc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
