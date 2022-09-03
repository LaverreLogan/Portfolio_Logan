const defaultLocale = "fr";
const supportedLocales = ["en", "fr"];
let locale;
let translations = {};
document.addEventListener("DOMContentLoaded", () => {
    const initialLocale = supportedOrDefault(browserLocales(true));
    setLocale(initialLocale);
    bindLocaleSwitcher(initialLocale);
    setImg(initialLocale);
    translatePh();
    isMobile();
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

function translatePh() {
    const formName = document.getElementById('formName').getAttribute('placeholder');
    const formMail = document.getElementById('formMail').getAttribute('placeholder');
    const formMsg = document.getElementById('formMsg').getAttribute('placeholder');
    if (locale === "fr") {
        this.formName.setAttribute('placeholder', 'Nom');
        this.formMail.setAttribute('placeholder', 'Mail');
        this.formMsg.setAttribute('placeholder', 'Votre message');
    } else if (locale === "en") {
        this.formName.setAttribute('placeholder', 'Name');
        this.formMail.setAttribute('placeholder', 'Email');
        this.formMsg.setAttribute('placeholder', 'Your message');
    }
}

function bindLocaleSwitcher(initialValue) {
    const switcher = 
        document.querySelector("[data-i18n-switcher]");
    switcher.value = initialValue;
    switcher.onchange = (e) => {
        setLocale(e.target.value);
        changeImgs();
    };
}

const switchEn = document.getElementById('switchEn');
const switchFr = document.getElementById('switchFr');

function isMobile() {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0) <= 768;
}
window.addEventListener('resize', () => {
    if (locale === 'fr') {
        translateFr();
    } else {
        translateEn();
    }
});


async function translateFr() {
    setLocale('fr');
    document.body.classList.remove('localeEn');
    document.body.classList.add('localeFr');
    switchEn.classList.remove('activeLink');
    switchFr.classList.add('activeLink');
}

async function translateEn() {
    setLocale('en');
    document.body.classList.remove('localeFr');
    document.body.classList.add('localeEn');
    switchFr.classList.remove('activeLink');
    switchEn.classList.add('activeLink');
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
        document.body.classList.remove('localeEn');
        document.body.classList.add('localeFr');
        switchEn.classList.remove('activeLink');
        switchFr.classList.add('activeLink');
    } else if (initialLocale === "en") {
        document.body.classList.remove('localeFr');
        document.body.classList.add('localeEn');
        switchFr.classList.remove('activeLink');
        switchEn.classList.add('activeLink');
    } else {
        document.body.classList.remove('localeFr');
        document.body.classList.add('localeEn');
        switchEn.classList.remove('activeLink');
        switchFr.classList.add('activeLink');
    }
}