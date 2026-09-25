const translations = {
  en: {
    badge: "✦ HAUTE PARFUMERIE · 365 DAYS OF LUXURY ✦",
    hero_title: "FRAGRANCE, worn quietly.",
    hero_desc: "A small Pakistani perfume house focused on considered scent and clean presentation. Three fragrances, made to be worn — not shouted about.",
    shop_btn: "SHOP COLLECTION",
    whatsapp_btn: "ORDER ON WHATSAPP",
    collection_tag: "THE COLLECTION",
    collection_title: "THREE FRAGRANCES.",
    collection_desc: "Every bottle in the XYAAL 365 collection is built around a distinct character — from first spray to final drydown."
  },
  ur: {
    badge: "✦ اعلیٰ خوشبویات · سال کے ۳۶۵ دن کا لگژری احساس ✦",
    hero_title: "خوشبو، جو دل میں اتر جائے۔",
    hero_desc: "ایک نفیس پاکستانی پرفیوم ہاؤس جو باوقار خوشبو اور شاندار انداز پر یقین رکھتا ہے۔ تین خاص پرفیومز، جو پکارنے کے لیے نہیں بلکہ محسوس کرنے کے لیے بنے ہیں۔",
    shop_btn: "کلیکشن دیکھیں",
    whatsapp_btn: "واٹس ایپ پر آرڈر کریں",
    collection_tag: "ہمارا کلیکشن",
    collection_title: "تین منفرد پرفیومز۔",
    collection_desc: "خیال ۳۶۵ کے ہر پرفیوم کا ایک منفرد مزاج ہے — پہلی اسپرے سے لے کر دیرپا خوشبو تک۔"
  }
};

let currentLang = localStorage.getItem("site_lang") || "en";

function applyLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  const langBtn = document.getElementById("lang-toggle");
  if (langBtn) {
    langBtn.textContent = lang === "en" ? "اردو" : "EN";
  }

  // RTL setup for Urdu
  if (lang === "ur") {
    document.body.setAttribute("dir", "rtl");
    document.body.classList.add("urdu-mode");
  } else {
    document.body.setAttribute("dir", "ltr");
    document.body.classList.remove("urdu-mode");
  }

  localStorage.setItem("site_lang", lang);
  currentLang = lang;
}

function toggleLanguage() {
  const nextLang = currentLang === "en" ? "ur" : "en";
  applyLanguage(nextLang);
}

document.addEventListener("DOMContentLoaded", () => {
  applyLanguage(currentLang);
  const langBtn = document.getElementById("lang-toggle");
  if (langBtn) {
    langBtn.addEventListener("click", (e) => {
      e.preventDefault();
      toggleLanguage();
    });
  }
});

