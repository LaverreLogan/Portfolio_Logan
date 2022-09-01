/*------------------- Navbar highlight -------------------*/

const sections = document.querySelectorAll('section');
const navList = document.querySelectorAll('nav .menu ul li');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach( section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    })
    navList.forEach(li => {
        li.classList.remove('active');
        if (li.classList.contains(current)) {
            li.classList.add('active')
        }
    })
})


/*------------------ Section height ------------------*/

let homePage = document.getElementById('page1');
function setVh() {
    let vH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    homePage.setAttribute("style", "min-height:" + vH + "px");
}
    setVh();
window.addEventListener('resize', setVh, true);

/*------------------------ Pagination ------------------------*/

// let pagination = document.getElementById('pagination');
// function paginationHeight() {
//     let height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
//     pagination.setAttribute("style", "bottom:" + height / 48 + "%")
// }
//     paginationHeight();
// window.addEventListener('resize', paginationHeight, true);

/*-------------- Pagination and arrows behavior --------------*/

function extendSlider() {
    document.getElementsByClassName('carousel__pagination')[0].style.opacity = "0";
    document.getElementsByClassName('carousel__prev')[0].style.opacity = "0";
    document.getElementsByClassName('carousel__next')[0].style.opacity = "0";
}


function closeExtend() {
    document.getElementsByClassName('carousel__pagination')[0].style.opacity = "100";
    document.getElementsByClassName('carousel__prev')[0].style.opacity = "100";
    document.getElementsByClassName('carousel__next')[0].style.opacity = "100";
}


/*-------------------------- Form --------------------------*/

const form = document.getElementById('messageForm');
const formName = document.getElementById('formName');
const formEmail = document.getElementById('formMail');
const formMsg = document.getElementById('formMsg');
const body = document.body;
form.addEventListener('submit', (e) => {
    const formNameValue = formName.value.trim();
    const formEmailValue = formEmail.value.trim();
    const formMsgValue = formMsg.value.trim();

    if (formNameValue === '') {
        e.preventDefault();
        if (body.classList.contains('localeEn')) {
            setErrorFor(formName, 'Username cannot be blank');
        } else if (body.classList.contains('localeFr')) {
            setErrorFor(formName, 'Le nom ne peut être vide');
        } else {
            setErrorFor(formName, 'Username cannot be blank');
        }
    } else {
        setSuccesFor(formName);
    }

    if (formEmailValue === '') {
        e.preventDefault();
        if (body.classList.contains('localeEn')) {
            setErrorFor(formEmail, 'Mail cannot be blank')
        } else if (body.classList.contains('localeFr')) {
            setErrorFor(formEmail, 'L\'email ne peut être vide');
        } else {
            setErrorFor(formEmail, 'Mail cannot be blank');
        }
    } else if (!isEmail(formEmailValue)) {
        e.preventDefault();
        if (body.classList.contains('localeEn')) {
            setErrorFor(formEmail, 'Mail is not valid')
        } else if (body.classList.contains('localeFr')) {
            setErrorFor(formEmail, 'L\'email n\'est pas valide');
        } else {
            setErrorFor(formEmail, 'Mail is not valid');
        }
    }else {
        setSuccesFor(formEmail);
    }

    if (formMsgValue === '') {
        e.preventDefault();
        if (body.classList.contains('localeEn')) {
            setErrorFor(formMsg, 'Message cannot be blank')
        } else if (body.classList.contains('localeFr')) {
            setErrorFor(formMsg, 'Le message ne peut être vide');
        } else {
            setErrorFor(formMsg, 'Message cannot be blank');
        }
    }else {
        setSuccesFor(formMsg);
    }
})
// function checkInputs() {
    
// }

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    small.innerText = message;
    formControl.classList.add('error');
}
function setSuccesFor(input) {
    const formControl = input.parentElement;
    formControl.classList.remove('error');
}
function isEmail(formEmailValue) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(formEmailValue);
}
