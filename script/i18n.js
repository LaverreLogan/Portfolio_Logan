const defaultLocale = "fr";
const supportedLocales = ["en", "fr"];
let locale;
let translations = {};
document.addEventListener("DOMContentLoaded", () => {
    const initialLocale = supportedOrDefault(browserLocales(true));
    setLocale(initialLocale);
    bindLocaleSwitcher(initialLocale);
    // selectedLang();
    setImg(initialLocale);
    translatePh();
});
async function setLocale(newLocale) {
    if (newLocale === locale) return;

    const newTranslations = 
        await fetchTranslationsFor(newLocale);

    locale = newLocale;
    translations = newTranslations;

    translatePage();
}

async function fetchTranslationsFor(newLocale) {
    const response = await fetch(`lang/${newLocale}.json`);
    return await response.json();
}

function translatePage() {
    document
        .querySelectorAll("[data-i18n-key]")
        .forEach(translateElement);
    document
        .querySelectorAll("[data-i18n-ph]")
        .forEach(translatePh);
}

function translateElement(element) {
    const key = element.getAttribute("data-i18n-key");
    const translation = translations[key];
    element.innerHTML = translation;
}

// function translatePh(initialLocale) {
//     const formName = document.getElementById('formName').getAttribute('placeholder');
//     const formMail = document.getElementById('formMail').getAttribute('placeholder');
//     const formMsg = document.getElementById('formMsg').getAttribute('placeholder');
//     if (initialLocale === "fr") {
//         this.formName.setAttribute('placeholder', 'Nom');
//         this.formMail.setAttribute('placeholder', 'Mail');
//         this.formMsg.setAttribute('placeholder', 'Votre message');
//         console.log(formName, formMail, formMsg);
//     } else if (initialLocale === "en") {
//         this.formName.setAttribute('placeholder', 'Name');
//         this.formMail.setAttribute('placeholder', 'Email');
//         this.formMsg.setAttribute('placeholder', 'Your message');
//         console.log(formName, formMail, formMsg);
//     }
// }

function bindLocaleSwitcher(initialValue) {
    const switcher = 
        document.querySelector("[data-i18n-switcher]");
    switcher.value = initialValue;
    switcher.onchange = (e) => {
        setLocale(e.target.value);
        changeImgs();
    };
}

// function selectedLang() {
//     const en = document.getElementById('switchEn');
//     const fr = document.getElementById('switchFr');
//     if (newLocale = "fr") {
//         en.classList.remove('active');
//         fr.classList.add('active');
//     }
//     if (newLocale = "en") {
//         fr.classList.remove('active');
//         en.classList.add('active');
//     }
// }

async function translateFr() {
    setLocale('fr');
    document.getElementById('desktopSkillsFr').style.display = "block";
    document.getElementById('desktopSkillsEn').style.display = "none";
}

async function translateEn() {
    setLocale('en');
    document.getElementById('desktopSkillsEn').style.display = "block";
    document.getElementById('desktopSkillsFr').style.display = "none";
}  

function isSupported(locale) {
    return supportedLocales.indexOf(locale) > -1;
}

function supportedOrDefault(locales) {
    return locales.find(isSupported) || defaultLocale;
}

function browserLocales(languageCodeOnly = false) {
    return navigator.languages.map((locale) =>
languageCodeOnly ? locale.split("-")[0] : locale,);
}

function setImg(initialLocale) {
    if(initialLocale === "fr") {
        document.getElementById('desktopSkillsFr').style.display = "block";
        document.getElementById('desktopSkillsEn').style.display = "none";
    } else if (initialLocale === "en") {
        document.getElementById('desktopSkillsEn').style.display = "block";
        document.getElementById('desktopSkillsFr').style.display = "none";
    } else {
        document.getElementById('desktopSkillsFr').style.display = "block";
        document.getElementById('desktopSkillsEn').style.display = "none";
    }
}