// Translations
const translations = {
  en: {
    navodaya: "Shree Rajpokhari",
    coop_ltd: "Agriculture Multiple Co-operative Ltd.",
    nav_home: "Home",
    nav_about: "About Us",
    nav_services: "Services",
    nav_reports: "Reports",
    nav_contact: "Contact",
    hero_tagline: "Your Partner in Agriculture & Finance",
    hero_title: "Harvesting Prosperity Together",
    hero_desc: "Empowering farmers and community members through sustainable agriculture and financial services.",
    hero_btn_member: "Become a Member",
    hero_btn_services: "Our Services",
    stats_assets: "Total Assets (NPR)",
    stats_shareholders: "Shareholders",
    stats_branches: "Branches",
    stats_staff: "Dedicated Staff",
    about_title: "Cultivating Trust",
    about_p1: "Shree Rajpokhari Agriculture Multiple Co-operative Ltd. is dedicated to the economic upliftment of Neelakantha.",
    about_p2: "We focus on modern agricultural practices and accessible financial services to support our members.",
    about_btn: "Read More About Us",
    services_title: "Our Services",
    services_subtitle: "Integrated agricultural and financial solutions.",
    serv_saving: "Savings Schemes",
    serv_saving_desc: "Secure your future with our attractive saving plans.",
    serv_loan: "Loan Services",
    serv_loan_desc: "Fair loans for agriculture and business.",
    serv_mobile: "Mobile Banking",
    serv_mobile_desc: "Bank on the go with our secure mobile app.",
    serv_remit: "Remittance",
    serv_remit_desc: "Fast and reliable money transfer services.",
    serv_scholar: "Scholarships",
    serv_scholar_desc: "Supporting education for member's children.",
    serv_agri: "Agriculture Support",
    serv_agri_desc: "Providing seeds, fertilizers, and market access.",
    address: "Neelakantha 4, Dhading",
    footer_desc: "A trusted agriculture multiple cooperative organization committed to the prosperity of its members."
  },
  np: {
    navodaya: "श्री राजपोखरी",
    coop_ltd: "कृषि बहुउद्देश्यीय सहकारी संस्था लि.",
    nav_home: "गृहपृष्ठ",
    nav_about: "हाम्रो बारेमा",
    nav_services: "सेवाहरू",
    nav_reports: "प्रतिवेदन",
    nav_contact: "सम्पर्क",
    hero_tagline: "कृषि र वित्तमा तपाईंको साझेदार",
    hero_title: "समृद्धि सँगै भित्र्याऔं",
    hero_desc: "दिगो कृषि र वित्तीय सेवाहरू मार्फत किसानहरू र समुदायका सदस्यहरूलाई सशक्त बनाउँदै।",
    hero_btn_member: "सदस्य बन्नुहोस्",
    hero_btn_services: "हाम्रा सेवाहरू",
    stats_assets: "कुल सम्पत्ति (रु)",
    stats_shareholders: "शेयर सदस्यहरू",
    stats_branches: "शाखाहरू",
    stats_staff: "कर्मचारीहरू",
    about_title: "विश्वासको खेती",
    about_p1: "श्री राजपोखरी कृषि बहुउद्देश्यीय सहकारी संस्था लि. नीलकण्ठको आर्थिक उन्नतिका लागि समर्पित छ।",
    about_p2: "हामी हाम्रा सदस्यहरूलाई सहयोग गर्न आधुनिक कृषि अभ्यासहरू र सुलभ वित्तीय सेवाहरूमा ध्यान केन्द्रित गर्छौं।",
    about_btn: "थप पढ्नुहोस्",
    services_title: "हाम्रा सेवाहरू",
    services_subtitle: "एकीकृत कृषि र वित्तीय समाधानहरू।",
    serv_saving: "बचत योजनाहरू",
    serv_saving_desc: "आकर्षक बचत योजनाहरूसँग भविष्य सुरक्षित गर्नुहोस्।",
    serv_loan: "ऋण सेवाहरू",
    serv_loan_desc: "कृषि र व्यवसायका लागि उचित ऋण।",
    serv_mobile: "मोबाइल बैंकिङ",
    serv_mobile_desc: "हाम्रो सुरक्षित एपमार्फत जहाँबाट पनि बैंकिङ।",
    serv_remit: "रेमिट्यान्स",
    serv_remit_desc: "छिटो र भरपर्दो पैसा पठाउने सेवा।",
    serv_scholar: "छात्रवृत्ति",
    serv_scholar_desc: "सदस्यका बालबालिकाको शिक्षामा सहयोग।",
    serv_agri: "कृषि सहयोग",
    serv_agri_desc: "बीउ, मल, र बजार पहुँच प्रदान गर्दै।",
    address: "नीलकण्ठ ४, धादिङ",
    footer_desc: "सदस्यहरूको समृद्धिका लागि प्रतिबद्ध एक विश्वसनीय कृषि बहुउद्देश्यीय सहकारी संस्था।"
  }
};

let currentLang = 'en';
const langToggle = document.querySelector('.lang-toggle');
const langText = document.querySelector('#lang-text');

langToggle.addEventListener('click', (e) => {
  e.preventDefault();
  currentLang = currentLang === 'en' ? 'np' : 'en';
  langText.innerText = currentLang === 'en' ? 'NEP' : 'ENG';

  updateLanguage();
});

function updateLanguage() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[currentLang][key]) {
      element.innerText = translations[currentLang][key];
    }
  });

  // Font switching for Nepali if needed (optional)
  if (currentLang === 'np') {
    document.body.style.fontFamily = "'Mukta', sans-serif"; // You might need to import this font, or just use default sans
  } else {
    document.body.style.fontFamily = "var(--font-body)";
  }
}

// Mobile Menu Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  const icon = mobileToggle.querySelector('i');
  if (navMenu.classList.contains('active')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-xmark');
  } else {
    icon.classList.remove('fa-xmark');
    icon.classList.add('fa-bars');
  }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    mobileToggle.querySelector('i').classList.remove('fa-xmark');
    mobileToggle.querySelector('i').classList.add('fa-bars');
  });
});

// Number Counter Animation
const stats = document.querySelectorAll('.stat-number');

const animateStats = () => {
  stats.forEach(stat => {
    const updateCount = () => {
      const target = +stat.getAttribute('data-target');
      // Remove non-numeric chars for calculation but strictly keep integer parsing safe
      const count = +stat.innerText.replace(/,/g, '');

      // Calculate increment based on difference to ensure they finish roughly at same time
      // or just use fixed divisor for uniform speed.
      // Using target / 50 ensures it finishes in ~50 frames (approx 1 sec at 60fps)
      const increment = target / 100;

      if (count < target) {
        // Use Math.ceil to ensure we always move up at least 1
        stat.innerText = Math.ceil(count + increment).toLocaleString();
        setTimeout(updateCount, 20);
      } else {
        stat.innerText = target.toLocaleString();
      }
    };
    updateCount();
  });
};

// Trigger animation when stats section is in view
let statsAnimated = false;
const statsSection = document.querySelector('.stats');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsAnimated) {
      animateStats();
      statsAnimated = true;
    }
  });
}, { threshold: 0.5 });

observer.observe(statsSection);

// Header Scroll Effect
const header = document.querySelector('.header-main');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
    header.style.padding = '0.5rem 0';
  } else {
    header.style.boxShadow = 'var(--shadow-sm)';
    header.style.padding = '1rem 0';
  }
});
