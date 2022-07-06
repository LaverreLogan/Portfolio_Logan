
const title = document.getElementById('mainTitle');
const text = "Hi, I am Logan Web Developper";
let index = 0;
const randomSpeed = (min , max) => {
    return Math.floor(Math.random() * (max - min) + min)
};

var caret = "<span style='color:#60B450'> _</span>";
const play = () => {
    if (index > text.length) {
        console.log('end');
        index = 0;
        timer = setTimeout(play, 5000);
    }else{
        caret === "<span style='color:#60B450'>_</span>" ? caret = "" : caret = "<span style='color:#60B450'>_</span>";

        if (index > text.length-1) {
            caret = "";
        }
        console.log(index)
        title.innerHTML = text.slice(0, index) + caret;
        index++;
        timer = setTimeout(play, randomSpeed(50, 300));
    }   
};
var timer = setTimeout(play);