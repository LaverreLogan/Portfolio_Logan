const defaultLocale="en",supportedLocales=["en","fr"];let locale,translations={};async function setLocale(newLocale){var newTranslations;newLocale!==locale&&(newTranslations=await fetchTranslationsFor(newLocale),locale=newLocale,translations=newTranslations,translatePage())}async function fetchTranslationsFor(newLocale){const response=await fetch(`lang/${newLocale}.json`);return console.log(response),response.json()}function translatePage(){document.querySelectorAll("[data-i18n-key]").forEach(translateElement),document.querySelectorAll("[data-i18n-ph]").forEach(translatePh)}function translateElement(element){var key=element.getAttribute("data-i18n-key"),key=translations[key];element.innerHTML=key,console.log(key)}function translatePh(){document.getElementById("formName").getAttribute("placeholder"),document.getElementById("formMail").getAttribute("placeholder"),document.getElementById("formMsg").getAttribute("placeholder");"fr"===locale?(this.formName.setAttribute("placeholder","Nom"),this.formMail.setAttribute("placeholder","Mail"),this.formMsg.setAttribute("placeholder","Votre message")):"en"===locale&&(this.formName.setAttribute("placeholder","Name"),this.formMail.setAttribute("placeholder","Email"),this.formMsg.setAttribute("placeholder","Your message"))}function bindLocaleSwitcher(initialValue){const switcher=document.querySelector("[data-i18n-switcher]");switcher.value=initialValue,switcher.onchange=e=>{setLocale(e.target.value)}}document.addEventListener("DOMContentLoaded",()=>{var initialLocale=supportedOrDefault(browserLocales(!0));bindLocaleSwitcher(initialLocale),setLang(initialLocale),translatePh()});const switchEn=document.getElementById("switchEn"),switchFr=document.getElementById("switchFr"),switchEnMobile=document.getElementById("switchEnMobile"),switchFrMobile=document.getElementById("switchFrMobile");function isMobile(){return Math.max(document.documentElement.clientWidth,window.innerWidth||0)<=768}function translateFr(){setLocale("fr"),document.body.classList.remove("localeEn"),document.body.classList.add("localeFr"),switchEn.classList.remove("activeLink"),switchFr.classList.add("activeLink"),switchEnMobile.classList.remove("activeLink"),switchFrMobile.classList.add("activeLink")}function translateEn(){setLocale("en"),document.body.classList.remove("localeFr"),document.body.classList.add("localeEn"),switchFr.classList.remove("activeLink"),switchEn.classList.add("activeLink"),switchFrMobile.classList.remove("activeLink"),switchEnMobile.classList.add("activeLink")}function isSupported(locale){return-1<supportedLocales.indexOf(locale)}function supportedOrDefault(locales){return locales.find(isSupported)||defaultLocale}function browserLocales(languageCodeOnly=!1){return navigator.languages.map(locale=>languageCodeOnly?locale.split("-")[0]:locale)}function setLang(initialLocale){("fr"===initialLocale?translateFr:translateEn)()}const sections=document.querySelectorAll("section, footer"),navList=document.querySelectorAll("nav .menu ul li");window.addEventListener("scroll",()=>{let current="";sections.forEach(section=>{var sectionTop=section.offsetTop,sectionHeight=section.clientHeight;scrollY>=sectionTop-sectionHeight/3&&(current=section.getAttribute("id"))}),navList.forEach(li=>{li.classList.remove("active"),li.classList.contains(current)&&li.classList.add("active")})});let homePage=document.getElementById("page1");function setVh(){var vH=Math.max(document.documentElement.clientHeight,window.innerHeight||0);homePage.setAttribute("style","min-height:"+vH+"px")}function extendSlider(){document.getElementsByClassName("carousel__pagination")[0].style.opacity="0",document.getElementsByClassName("carousel__prev")[0].style.opacity="0",document.getElementsByClassName("carousel__next")[0].style.opacity="0"}function closeExtend(){document.getElementsByClassName("carousel__pagination")[0].style.opacity="100",document.getElementsByClassName("carousel__prev")[0].style.opacity="100",document.getElementsByClassName("carousel__next")[0].style.opacity="100"}setVh(),window.addEventListener("resize",setVh,!0);const randomBetween=(min,max)=>Math.floor(Math.random()*(max-min)+min),animateText=(element,index=0)=>{var text=element.parentElement.dataset.animate;-1===index&&(element.textContent="",index=0),index===text.length?setTimeout(()=>animateText(element,-1),3e3):(element.insertAdjacentText("beforeend",text[index]),setTimeout(()=>animateText(element,index+1),randomBetween(50,200)))};Array.from(document.querySelectorAll("[data-animate]")).forEach(element=>{var cursor=element.dataset.animateCursor;element.insertAdjacentHTML("beforeend",`<span class="content"></span><span class="cursor">${cursor}</span>`),setTimeout(()=>animateText(element.querySelector(".content")),0)});class Carousel{constructor(element){this.element=element;let children=[].slice.call(element.children);this.currentSlide=0,this.moveCallbacks=[],this.root=this.createDivWithClass("carousel"),this.container=this.createDivWithClass("carousel__container"),this.main=document.getElementById("portfolioContainer"),this.root.setAttribute("tabindex","0"),this.element.appendChild(this.root),this.root.appendChild(this.container),this.items=children.map(child=>{let item=this.createDivWithClass("carousel__item");return item.appendChild(child),this.container.appendChild(item),item}),this.setStyle(),this.createNavigation(),this.createPagination(),this.moveCallbacks.forEach(cb=>cb(0)),this.root.addEventListener("keyup",e=>{"ArrowRight"===e.key||"Right"===e.key?this.next():"ArrowLeft"!==e.key&&"Left"!==e.key||this.prev()})}setStyle(){let itemsLength=this.items.length;this.container.style.width=100*itemsLength+"%",this.items.forEach(item=>item.style.width=100/itemsLength+"%")}createDivWithClass(className){let div=document.createElement("div");return div.setAttribute("class",className),div}createNavigation(){let nextButton=this.createDivWithClass("carousel__next"),prevButton=this.createDivWithClass("carousel__prev");this.root.appendChild(nextButton),this.root.appendChild(prevButton),nextButton.addEventListener("click",this.next.bind(this)),prevButton.addEventListener("click",this.prev.bind(this))}createPagination(){let pagination=this.createDivWithClass("carousel__pagination"),buttons=(pagination.setAttribute("id","pagination"),[]);this.root.appendChild(pagination);for(let i=0;i<this.items.length;i+=1){let button=this.createDivWithClass("carousel__pagination--button");button.addEventListener("click",()=>this.gotoSlide(i)),pagination.appendChild(button),buttons.push(button)}this.onMove(index=>{let activeButton=buttons[index];activeButton&&(buttons.forEach(button=>button.classList.remove("carousel__pagination--button--active")),activeButton.classList.add("carousel__pagination--button--active"))})}gotoSlide(index){index<0?index=this.items.length-1:index>=this.items.length&&(index=0);var translateX=-100*index/this.items.length;this.container.style.transform="translate3d("+translateX+"%, 0, 0)",this.currentSlide=index,this.moveCallbacks.forEach(cb=>cb(index))}next(){this.gotoSlide(this.currentSlide+1)}prev(){this.gotoSlide(this.currentSlide-1)}onMove(cb){this.moveCallbacks.push(cb)}}let onReady=()=>{new Carousel(document.querySelector("#portfolioContainer"))};"loading"!==document.readyState&&onReady(),document.addEventListener("DOMContentLoaded",onReady);