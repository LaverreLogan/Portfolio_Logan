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

function setVh() {
    let vH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    sections.forEach( section => {
        section.setAttribute("style", "height:" + vH + "px")
    })
}
setVh();
window.addEventListener('onorientationchange', setVh, true);
window.addEventListener('resize', setVh, true);