class Carousel {

    constructor(element) {
        this.element = element
        let children = [].slice.call(element.children)
        this.currentSlide = 0
        this.moveCallbacks = []
        /* DOM modifications */
        this.root = this.createDivWithClass('carousel')
        this.container = this.createDivWithClass('carousel__container')
        this.main = document.getElementById('pagination_prev_next')
        this.root.setAttribute('tabindex', '0')
        this.element.appendChild(this.root)
        this.root.appendChild(this.container)
        this.items = children.map((child) => {
            let item = this.createDivWithClass('carousel__item')
            item.appendChild(child)
            this.container.appendChild(item)
            return item
        })
        this.setStyle()
        this.createNavigation()
        this.createPagination()
        
        //Events
        this.moveCallbacks.forEach(cb => cb(0))
        this.root.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'Right') {
                this.next()
            } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
                this.prev()
            }
        })
    }    
    setStyle () {
        let itemsLength = this.items.length
        this.container.style.width = (itemsLength * 100) + "%"
        this.items.forEach(item => item.style.width = 100 / itemsLength + "%")
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
        // if (this.options.loop === true){
        //     return
        // }
        // this.onMove(index => {
        //     if (index === 0) {
        //         prevButton.classList.add('carousel__prev-hidden')
        //     } else {
        //         prevButton.classList.remove('carousel__prev-hidden')
        //     }
        //     if (this.items[this.currentSlide + 1] === undefined) {
        //         nextButton.classList.add('carousel__next-hidden')
        //     } else {
        //         nextButton.classList.remove('carousel__next-hidden')
        //     }
        // })
    }

    createPagination () {
        let pagination = this.createDivWithClass('carousel__pagination')
        let buttons = []
        this.main.appendChild(pagination)
        
        for (let i = 0; i < this.items.length; i = i + 1) {
            let button = this.createDivWithClass('carousel__pagination--button')
            button.addEventListener('click' , () => this.gotoSlide(i))
            pagination.appendChild(button)
            buttons.push(button)
        }
        this.onMove(index => {
            let activeButton = buttons[index]
            if (activeButton) {
                buttons.forEach(button => button.classList.remove('carousel__pagination--button--active'))
                activeButton.classList.add('carousel__pagination--button--active')
            }
        })
    }
    
    gotoSlide (index) {
        if (index < 0) {
            index = this.items.length - 1
        }
        else if (index >= this.items.length || (this.items[this.currentSlide + 1] === undefined && index > this.currentSlide)) {
            index = 0
        }
        let translateX = index * -100 / this.items.length
        this.container.style.transform = 'translate3d('+ translateX +'%, 0, 0)'
        this.currentSlide = index
        this.moveCallbacks.forEach(cb => cb(index))
    }
    
    next () {
        this.gotoSlide(this.currentSlide + 1)
    }

    prev () {
        this.gotoSlide(this.currentSlide - 1)
    }


    onMove (cb) {
        this.moveCallbacks.push(cb)
    }

    // get slidesToScroll () {
    //     return this.isMobile ? 1 : 1
    // }

    // get slidesVisible () {
    //     return this.isMobile ? 1 : 1
    // }

    // onWindoResize () {
    //     let mobile = window.innerWidth < 800
    //     if (mobile !== this.isMobile) {
    //         this.isMobile = mobile
    //         this.setStyle()
    //         this.moveCallbacks.forEach(cb => cb(this.currentSlide))
    //     }
    // }
}

let onReady = () => {
    new Carousel(document.querySelector('#carouselContainer'))
}

if (document.readyState !== 'loading') {
    onReady()
}

document.addEventListener('DOMContentLoaded', onReady)
