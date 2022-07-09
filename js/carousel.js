class Carousel {

    constructor(element, options = {}) {
        this.element = element
        this.options = Object.assign({}, {
            slidesToScroll: 1,
            slidesVisible: 1
        }, options)
        let children = [].slice.call(element.children)
        this.currentSlide = 0
        this.root = this.createDivWithClass('carousel')
        this.container = this.createDivWithClass('carousel__container')
        this.root.appendChild(this.container)
        this.element.appendChild(this.root)
        this.items = children.map((child) => {
            let item = this.createDivWithClass('carousel__item')
            item.appendChild(child)
            this.container.appendChild(item)
            return item
        })
        this.setStyle()
        this.createNavigation()
    }    
    setStyle () {
        let ratio = this.items.length / this.options.slidesVisible
        this.container.style.width = (ratio * 100) + "%"
        this.items.forEach(item => item.style.width = ((100 / this.options.slidesVisible) / ratio) + "%")
    }

    createDivWithClass (className) {
        let div = document.createElement('div')
        div.setAttribute('class', className)
        return div
    }

    createNavigation () {
        let nextButton = this.createDivWithClass('carousel__next')
        let prevButton = this.createDivWithClass('carousel__prev')
        this.root.appendChild(nextButton)
        this.root.appendChild(prevButton)
        nextButton.addEventListener('click', this.next.bind(this))
        prevButton.addEventListener('click', this.prev.bind(this))
    }

    next() {
        this.gotoSlide(this.currentSlide + this.options.slidesToScroll)
    }

    prev () {
        this.gotoSlide(this.currentSlide - this.options.slidesToScroll)
    }

    gotoSlide (index) {
        if (index < 0) {
            index = this.items.length - this.options.slidesVisible
        }
        else if (index >= this.items.length) {
            index = 0
        }
        let translateX = index * -100 / this.items.length
        this.container.style.transform = 'translate3d('+ translateX +'%, 0, 0)'
        this.currentSlide = index
    }
}

document.addEventListener('DOMContentLoaded', function() {
    new Carousel(document.querySelector('#carouselContainer'),{
        slidesToScroll: 1,
        slidesVisible: 1
    })
})



/* GRAFIKART VIDEO PAUSE A 36:37 */
