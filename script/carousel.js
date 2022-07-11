class Carousel {

    constructor(element, options = {}) {
        this.element = element
        this.options = Object.assign({}, {
            slidesToScroll: 1,
            slidesVisible: 1,
            loop: false,
            pagination: false,
            navigation: true,
            play: true
        }, options)
        let children = [].slice.call(element.children)
        this.isMobile = false
        this.currentSlide = 0
        this.moveCallbacks = []

        /* DOM modifications */
        this.root = this.createDivWithClass('carousel')
        this.container = this.createDivWithClass('carousel__container')
        this.root.setAttribute('tabindex', '0')
        this.root.appendChild(this.container)
        this.element.appendChild(this.root)
        this.items = children.map((child) => {
            let item = this.createDivWithClass('carousel__item')
            item.appendChild(child)
            this.container.appendChild(item)
            return item
        })
        this.setStyle()
        if (this.options.navigation) {
            this.createNavigation()
        }
        if (this.options.pagination) {
            this.createPagination()
        }

        //Events
        this.moveCallbacks.forEach(cb => cb(0))
        this.onWindoResize()
        window.addEventListener('resize', this.onWindoResize.bind(this))
        this.root.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'Right') {
                this.next()
            } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
                this.prev()
            }
        })
    }    
    setStyle () {
        let ratio = this.items.length / this.slidesVisible
        this.container.style.width = (ratio * 100) + "%"
        this.items.forEach(item => item.style.width = ((100 / this.slidesVisible) / ratio) + "%")
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
        if (this.options.loop === true){
            return
        }
        this.onMove(index => {
            if (index === 0) {
                prevButton.classList.add('carousel__prev-hidden')
            } else {
                prevButton.classList.remove('carousel__prev-hidden')
            }
            if (this.items[this.currentSlide + this.slidesVisible] === undefined) {
                nextButton.classList.add('carousel__next-hidden')
            } else {
                nextButton.classList.remove('carousel__next-hidden')
            }
        })
    }

    createPagination () {
        let pagination = this.createDivWithClass('carousel__pagination')
        let buttons = []
        this.root.appendChild(pagination)
        for (let i = 0; i < this.items.length; i = i + this.options.slidesToScroll) {
            let button = this.createDivWithClass('carousel__pagination--button')
            button.addEventListener('click' , () => this.gotoSlide(i))
            pagination.appendChild(button)
            buttons.push(button)
        }
        this.onMove(index => {
            let activeButton = buttons[Math.floor(index / this.options.slidesToScroll)]
            if (activeButton) {
                buttons.forEach(button => button.classList.remove('carousel__pagination--button--active'))
                activeButton.classList.add('carousel__pagination--button--active')
            }
        })
    }

    gotoSlide (index) {
        if (index < 0) {
            if (this.options.loop) {
                index = this.items.length - this.slidesVisible
            } else {
                return
            }
        }
        else if (index >= this.items.length || (this.items[this.currentSlide + this.options.slidesVisible] === undefined && index > this.currentSlide)) {
            if (this.options.loop) {
                index = 0
            } else {
                return
            }
        }
        let translateX = index * -100 / this.items.length
        this.container.style.transform = 'translate3d('+ translateX +'%, 0, 0)'
        this.currentSlide = index
        this.moveCallbacks.forEach(cb => cb(index))
    }
    
    next () {
        this.gotoSlide(this.currentSlide + this.slidesToScroll)
    }

    prev () {
        this.gotoSlide(this.currentSlide - this.slidesToScroll)
    }


    onMove (cb) {
        this.moveCallbacks.push(cb)
    }

    get slidesToScroll () {
        return this.isMobile ? 1 : this.options.slidesToScroll
    }

    get slidesVisible () {
        return this.isMobile ? 1 : this.options.slidesVisible
    }

    onWindoResize () {
        let mobile = window.innerWidth < 800
        if (mobile !== this.isMobile) {
            this.isMobile = mobile
            this.setStyle()
            this.moveCallbacks.forEach(cb => cb(this.currentSlide))
        }
    }
}

let onReady = () => {
    new Carousel(document.querySelector('#carouselContainer'),{
        slidesToScroll: 1,
        slidesVisible: 1,
        loop: true,
        pagination: true,
        play: true
    })
}

if (document.readyState !== 'loading') {
    onReady()
}

document.addEventListener('DOMContentLoaded', onReady)
