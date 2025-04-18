/*
 * PetTastic - Slider JavaScript
 * This file contains functionality for sliders and carousels
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize testimonial sliders
    initTestimonialSlider();
});

/**
 * Initialize testimonial slider functionality
 */
function initTestimonialSlider() {
    const testimonialContainers = document.querySelectorAll('.testimonial-container');
    
    testimonialContainers.forEach(container => {
        const testimonials = container.querySelectorAll('.testimonial');
        const dotsContainer = container.nextElementSibling;
        const prevButton = container.parentElement.querySelector('#prev-testimonial');
        const nextButton = container.parentElement.querySelector('#next-testimonial');
        
        if (testimonials.length === 0) return;
        
        // Set up the initial state
        let currentIndex = 0;
        updateTestimonialState(testimonials, dotsContainer, currentIndex);
        
        // Previous button click
        if (prevButton) {
            prevButton.addEventListener('click', function() {
                currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
                updateTestimonialState(testimonials, dotsContainer, currentIndex);
            });
        }
        
        // Next button click
        if (nextButton) {
            nextButton.addEventListener('click', function() {
                currentIndex = (currentIndex + 1) % testimonials.length;
                updateTestimonialState(testimonials, dotsContainer, currentIndex);
            });
        }
        
        // Dot clicks
        if (dotsContainer) {
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach(dot => {
                dot.addEventListener('click', function() {
                    currentIndex = parseInt(this.getAttribute('data-index'));
                    updateTestimonialState(testimonials, dotsContainer, currentIndex);
                });
            });
        }
        
        // Auto slide every 5 seconds
        setInterval(function() {
            if (document.hasFocus()) { // Only auto-slide when page is in focus
                currentIndex = (currentIndex + 1) % testimonials.length;
                updateTestimonialState(testimonials, dotsContainer, currentIndex);
            }
        }, 5000);
        
        // Touch swipe support
        let startX = 0;
        let endX = 0;
        
        container.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
        }, false);
        
        container.addEventListener('touchend', function(e) {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        }, false);
        
        function handleSwipe() {
            const threshold = 50; // Minimum distance for swipe
            if (startX - endX > threshold) {
                // Swipe left, show next
                currentIndex = (currentIndex + 1) % testimonials.length;
                updateTestimonialState(testimonials, dotsContainer, currentIndex);
            } else if (endX - startX > threshold) {
                // Swipe right, show previous
                currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
                updateTestimonialState(testimonials, dotsContainer, currentIndex);
            }
        }
    });
}

/**
 * Update the state of testimonials to show the current one
 * @param {NodeList} testimonials - All testimonial elements
 * @param {HTMLElement} dotsContainer - Container of dot indicators
 * @param {number} index - Current index to show
 */
function updateTestimonialState(testimonials, dotsContainer, index) {
    // Hide all testimonials and show the current one
    testimonials.forEach((testimonial, i) => {
        if (i === index) {
            testimonial.classList.add('active');
        } else {
            testimonial.classList.remove('active');
        }
    });
    
    // Update dots if they exist
    if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
}

/**
 * Initialize image gallery slider (for product page)
 * @param {string} mainImageSelector - Selector for main image
 * @param {string} thumbnailsSelector - Selector for thumbnail container
 */
function initImageGallery(mainImageSelector = '.main-image img', thumbnailsSelector = '.thumbnail') {
    const mainImage = document.querySelector(mainImageSelector);
    const thumbnails = document.querySelectorAll(thumbnailsSelector);
    
    if (!mainImage || thumbnails.length === 0) return;
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Update main image
            const thumbnailImg = this.querySelector('img');
            mainImage.src = thumbnailImg.src;
            mainImage.alt = thumbnailImg.alt;
        });
    });
}

/**
 * Create and initialize a simple image slider
 * @param {string} containerId - ID of the container element
 * @param {Array} images - Array of image objects with src and alt properties
 */
function createImageSlider(containerId, images) {
    const container = document.getElementById(containerId);
    if (!container || !images || images.length === 0) return;
    
    // Create slider HTML
    const sliderHTML = `
        <div class="image-slider">
            <div class="slider-container">
                <div class="slider-track">
                    ${images.map(image => `
                        <div class="slider-slide">
                            <img src="${image.src}" alt="${image.alt || ''}">
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="slider-controls">
                <button class="slider-prev"><i class="fas fa-chevron-left"></i></button>
                <div class="slider-dots">
                    ${images.map((_, i) => `
                        <span class="slider-dot${i === 0 ? ' active' : ''}" data-index="${i}"></span>
                    `).join('')}
                </div>
                <button class="slider-next"><i class="fas fa-chevron-right"></i></button>
            </div>
        </div>
    `;
    
    container.innerHTML = sliderHTML;
    
    // Initialize slider functionality
    const track = container.querySelector('.slider-track');
    const slides = container.querySelectorAll('.slider-slide');
    const dots = container.querySelectorAll('.slider-dot');
    const prevBtn = container.querySelector('.slider-prev');
    const nextBtn = container.querySelector('.slider-next');
    
    let currentIndex = 0;
    const slideWidth = 100; // percentage
    
    // Set initial position
    updateSliderPosition();
    
    // Previous button click
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSliderPosition();
    });
    
    // Next button click
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSliderPosition();
    });
    
    // Dot clicks
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            currentIndex = parseInt(this.getAttribute('data-index'));
            updateSliderPosition();
        });
    });
    
    // Update slider position
    function updateSliderPosition() {
        // Move track
        track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
}
