const translations = {
  en: {
    nav_home: "Home",
    nav_collection: "Collection",
    nav_story: "Our Story",
    nav_contact: "Contact",
    badge: "✦ HAUTE PARFUMERIE · 365 DAYS OF LUXURY ✦",
    hero_title: "Fragrance, <em>crafted for distinction.</em>",
    hero_desc: "A Pakistani perfume house crafting signature fragrances with considered notes and understated luxury. Discover Aura, Vibe, and Crush.",
    shop_btn: "Shop Collection",
    wa_btn: "Order on WhatsApp"
  },
  ur: {
    nav_home: "ہوم",
    nav_collection: "کلیکشن",
    nav_story: "ہماری کہانی",
    nav_contact: "رابطہ",
    badge: "✦ اعلیٰ خوشبویات · سال کے ۳۶۵ دن کا لگژری احساس ✦",
    hero_title: "خوشبو، <em>جو منفرد پہچان بنا دے۔</em>",
    hero_desc: "ایک نفیس پاکستانی پرفیوم ہاؤس جو باوقار خوشبو اور شاندار انداز پر یقین رکھتا ہے۔ دریافت کریں Aura، Vibe اور Crush۔",
    shop_btn: "کلیکشن دیکھیں",
    wa_btn: "واٹس ایپ پر آرڈر کریں"
  }
};

let currentLang = localStorage.getItem("site_lang") || "en";

function applyLanguage(lang) {
  // 1. Navbar Links
  const navLinks = document.querySelectorAll(".nav-links a, .mobile-menu a");
  navLinks.forEach((link) => {
    const text = link.textContent.trim().toLowerCase();
    if (text === "home" || text === "ہوم") link.textContent = translations[lang].nav_home;
    if (text === "collection" || text === "کلیکشن") link.textContent = translations[lang].nav_collection;
    if (text === "our story" || text === "ہماری کہانی") link.textContent = translations[lang].nav_story;
    if (text === "contact" || text === "رابطہ") link.textContent = translations[lang].nav_contact;
  });

  // 2. Hero Eyebrow / Badge
  const eyebrow = document.querySelector(".hero-eyebrow");
  if (eyebrow) eyebrow.innerHTML = translations[lang].badge;

  // 3. Hero Main Heading
  const heroH1 = document.querySelector("section.hero h1, .hero-grid h1");
  if (heroH1) heroH1.innerHTML = translations[lang].hero_title;

  // 4. Hero Description
  const heroDesc = document.querySelector("section.hero p, .hero-grid p");
  if (heroDesc) heroDesc.textContent = translations[lang].hero_desc;

  // 5. Buttons
  const shopBtn = document.querySelector(".btn-primary");
  if (shopBtn) shopBtn.textContent = translations[lang].shop_btn;

  const waBtn = document.querySelector(".btn-wa");
  if (waBtn) {
    const icon = waBtn.querySelector("svg");
    waBtn.innerHTML = "";
    if (icon) waBtn.appendChild(icon);
    waBtn.append(" " + translations[lang].wa_btn);
  }

  // 6. Language Switch Button Label
  const toggleBtn = document.getElementById("lang-toggle");
  if (toggleBtn) {
    toggleBtn.textContent = lang === "en" ? "اردو" : "EN";
  }

  // 7. Page Direction & Font Styling
  if (lang === "ur") {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "ur");
  } else {
    document.documentElement.setAttribute("dir", "ltr");
    document.documentElement.setAttribute("lang", "en");
  }

  localStorage.setItem("site_lang", lang);
  currentLang = lang;
}

// Button Click Event
document.addEventListener("DOMContentLoaded", () => {
  applyLanguage(currentLang);
  const toggleBtn = document.getElementById("lang-toggle");
  if (toggleBtn) {
    toggleBtn.onclick = (e) => {
      e.preventDefault();
      const next = currentLang === "en" ? "ur" : "en";
      applyLanguage(next);
    };
  }
});
