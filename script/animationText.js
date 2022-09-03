const randomBetween = (min , max) => {
    return Math.floor(Math.random() * (max - min) + min)
};

const animateText = (element, index = 0) => {
    let text = element.parentElement.dataset.animate;

    if (index === -1) {
        element.textContent = '';
        index = 0;
    };

    if (index === text.length) {
        setTimeout(() => animateText(element, -1), 3000);
        return;
    };
    
    element.insertAdjacentText('beforeend', text[index]);
    setTimeout(() => animateText(element, index + 1), randomBetween(50, 200));
}

Array.from(document.querySelectorAll('[data-animate]')).forEach(element => {
    let cursor = element.dataset.animateCursor;

    element.insertAdjacentHTML('beforeend', `<span class="content"></span><span class="cursor">${cursor}</span>`);
    setTimeout(() => animateText(element.querySelector('.content')), 0);
})