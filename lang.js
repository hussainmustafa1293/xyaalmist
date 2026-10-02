const translations = {
  en: {
    nav_home: "HOME",
    nav_collection: "COLLECTION",
    nav_experience: "THE SCENTS",
    nav_story: "OUR STORY",
    nav_launch: "LAUNCH OFFER",
    nav_contact: "CONTACT",
    badge: "✦ HAUTE PARFUMERIE · 365 DAYS OF LUXURY ✦",
    hero_title: "Fragrance, <em>crafted for distinction.</em>",
    hero_desc: "A Pakistani perfume house crafting signature fragrances with considered notes and understated luxury. Discover Aura, Vibe, and Crush.",
    shop_btn: "Shop Collection",
    wa_btn: "Order on WhatsApp",
    three_frag_title: "THREE FRAGRANCES.",
    three_frag_desc: "Every bottle in the XYAAL 365 collection is built around a distinct character — from first spray to final drydown."
  },
  ur: {
    nav_home: "ہوم",
    nav_collection: "کلیکشن",
    nav_experience: "خوشبوئیں",
    nav_story: "ہماری کہانی",
    nav_launch: "خصوصی آفر",
    nav_contact: "رابطہ",
    badge: "✦ اعلیٰ خوشبویات · سال کے ۳۶۵ دن کا لگژری احساس ✦",
    hero_title: "خوشبو، <em>جو منفرد پہچان بنا دے۔</em>",
    hero_desc: "ایک نفیس پاکستانی پرفیوم ہاؤس جو باوقار خوشبو اور شاندار انداز پر یقین رکھتا ہے۔ دریافت کریں Aura، Vibe اور Crush۔",
    shop_btn: "کلیکشن دیکھیں",
    wa_btn: "واٹس ایپ پر آرڈر کریں",
    three_frag_title: "تین منفرد خوشبوئیں۔",
    three_frag_desc: "XYAAL 365 کلیکشن کی ہر بوتل ایک باوقار پہچان کے گرد تیار کی گئی ہے — پہلے اسپرے سے آخری لمحے تک۔"
  }
};

function updatePageLanguage(lang) {
  // 1. Data-key wale tamam elements update karein
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  // 2. Direct Fallback Selectors (Navbar & Hero)
  const navLinks = document.querySelectorAll(".nav-menu a, .nav-links a, .mobile-nav a");
  navLinks.forEach((link) => {
    const txt = link.textContent.trim().toLowerCase();
    if (txt === "home" || txt === "ہوم") link.textContent = translations[lang].nav_home;
    if (txt === "collection" || txt === "کلیکشن") link.textContent = translations[lang].nav_collection;
    if (txt === "the scents" || txt === "experience" || txt === "خوشبوئیں") link.textContent = translations[lang].nav_experience;
    if (txt === "our story" || txt === "ہماری کہانی") link.textContent = translations[lang].nav_story;
    if (txt === "launch offer" || txt === "news" || txt === "خصوصی آفر") link.textContent = translations[lang].nav_launch;
    if (txt === "contact" || txt === "رابطہ") link.textContent = translations[lang].nav_contact;
  });

  // Hero section direct targets
  const eyebrow = document.querySelector(".hero-eyebrow");
  if (eyebrow) eyebrow.innerHTML = translations[lang].badge;

  const heroH1 = document.querySelector(".hero h1, .hero-grid h1");
  if (heroH1) heroH1.innerHTML = translations[lang].hero_title;

  const heroP = document.querySelector(".hero p, .hero-grid p");
  if (heroP) heroP.textContent = translations[lang].hero_desc;

  const shopBtn = document.querySelector(".hero-btns .btn-primary, a[href*='collection']");
  if (shopBtn && (shopBtn.textContent.includes("Shop") || shopBtn.textContent.includes("کلیکشن"))) {
    shopBtn.textContent = translations[lang].shop_btn;
  }

  // 3. Toggle button ka text
  const toggleBtn = document.getElementById("lang-toggle");
  if (toggleBtn) {
    toggleBtn.textContent = lang === "en" ? "اردو" : "EN";
  }

  // 4. Direction (RTL / LTR)
  if (lang === "ur") {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "ur");
  } else {
    document.documentElement.setAttribute("dir", "ltr");
    document.documentElement.setAttribute("lang", "en");
  }

  localStorage.setItem("site_lang", lang);
}

// Event Listeners setup
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("site_lang") || "en";
  updatePageLanguage(savedLang);

  const toggleBtn = document.getElementById("lang-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const current = localStorage.getItem("site_lang") || "en";
      const nextLang = current === "en" ? "ur" : "en";
      updatePageLanguage(nextLang);
    });
  }
});
