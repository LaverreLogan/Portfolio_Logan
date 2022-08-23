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


/* Pagination and arrows behavior */

onclick="closeExtend()"
onclick="extendSlider()"

function extendSlider() {
    console.log("open");
    document.getElementsByClassName('carousel__pagination')[0].style.opacity = "0";
    document.getElementsByClassName('carousel__prev')[0].style.opacity = "0";
    document.getElementsByClassName('carousel__next')[0].style.opacity = "0";
}


function closeExtend() {
    console.log("close");
    document.getElementsByClassName('carousel__pagination')[0].style.opacity = "100";
    document.getElementsByClassName('carousel__prev')[0].style.opacity = "100";
    document.getElementsByClassName('carousel__next')[0].style.opacity = "100";
}
