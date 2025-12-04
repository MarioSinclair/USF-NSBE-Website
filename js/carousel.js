// Custom Carousel Implementation
class CustomCarousel {
    constructor(element) {
        this.carousel = element;
        this.slides = Array.from(element.querySelectorAll('.carousel-slide'));
        this.indicators = Array.from(element.querySelectorAll('.indicator'));
        this.prevBtn = element.querySelector('.carousel-btn-prev');
        this.nextBtn = element.querySelector('.carousel-btn-next');
        this.currentIndex = 0;
        this.autoplayInterval = null;
        this.autoplayDelay = 5000; // 5 seconds
        this.isPaused = false;
        
        // Touch support
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.touchThreshold = 50; // Minimum swipe distance
        
        this.init();
    }
    
    init() {
        // Set up event listeners
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Indicator clicks
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Keyboard navigation
        this.carousel.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Touch events for swipe support
        const track = this.carousel.querySelector('.carousel-container');
        track.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
        track.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });
        
        // Mouse drag support (optional enhancement)
        let isDragging = false;
        let startPos = 0;
        let currentTranslate = 0;
        
        track.addEventListener('mousedown', (e) => {
            isDragging = true;
            startPos = e.clientX;
            this.pauseAutoplay();
        });
        
        track.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            currentTranslate = e.clientX - startPos;
        });
        
        track.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            const movedBy = e.clientX - startPos;
            
            if (Math.abs(movedBy) > this.touchThreshold) {
                if (movedBy > 0) {
                    this.prevSlide();
                } else {
                    this.nextSlide();
                }
            }
            this.resumeAutoplay();
        });
        
        track.addEventListener('mouseleave', () => {
            isDragging = false;
        });
        
        // Pause on hover
        this.carousel.addEventListener('mouseenter', () => this.pauseAutoplay());
        this.carousel.addEventListener('mouseleave', () => this.resumeAutoplay());
        
        // Pause when tab is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAutoplay();
            } else {
                this.resumeAutoplay();
            }
        });
        
        // Start autoplay
        this.startAutoplay();
        
        // Initial display
        this.updateCarousel();
    }
    
    updateCarousel() {
        // Update slides
        this.slides.forEach((slide, index) => {
            if (index === this.currentIndex) {
                slide.classList.add('active');
                slide.setAttribute('aria-hidden', 'false');
            } else {
                slide.classList.remove('active');
                slide.setAttribute('aria-hidden', 'true');
            }
        });
        
        // Update indicators
        this.indicators.forEach((indicator, index) => {
            if (index === this.currentIndex) {
                indicator.classList.add('active');
                indicator.setAttribute('aria-selected', 'true');
            } else {
                indicator.classList.remove('active');
                indicator.setAttribute('aria-selected', 'false');
            }
        });
        
        // Update aria-live region
        this.carousel.setAttribute('aria-live', this.isPaused ? 'polite' : 'off');
    }
    
    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateCarousel();
        this.resetAutoplay();
    }
    
    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateCarousel();
        this.resetAutoplay();
    }
    
    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
        this.resetAutoplay();
    }
    
    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            if (!this.isPaused) {
                this.nextSlide();
            }
        }, this.autoplayDelay);
    }
    
    pauseAutoplay() {
        this.isPaused = true;
    }
    
    resumeAutoplay() {
        this.isPaused = false;
    }
    
    resetAutoplay() {
        clearInterval(this.autoplayInterval);
        this.startAutoplay();
    }
    
    handleKeyboard(e) {
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                this.prevSlide();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.nextSlide();
                break;
            case 'Home':
                e.preventDefault();
                this.goToSlide(0);
                break;
            case 'End':
                e.preventDefault();
                this.goToSlide(this.slides.length - 1);
                break;
        }
    }
    
    handleTouchStart(e) {
        this.touchStartX = e.changedTouches[0].screenX;
        this.pauseAutoplay();
    }
    
    handleTouchEnd(e) {
        this.touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
        this.resumeAutoplay();
    }
    
    handleSwipe() {
        const swipeDistance = this.touchEndX - this.touchStartX;
        
        if (Math.abs(swipeDistance) > this.touchThreshold) {
            if (swipeDistance > 0) {
                // Swipe right - go to previous
                this.prevSlide();
            } else {
                // Swipe left - go to next
                this.nextSlide();
            }
        }
    }
    
    // Public method to destroy carousel (cleanup)
    destroy() {
        clearInterval(this.autoplayInterval);
    }
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const carouselElement = document.querySelector('.custom-carousel');
    if (carouselElement) {
        const carousel = new CustomCarousel(carouselElement);
        
        // Store instance for potential cleanup
        window.customCarousel = carousel;
    }
});
