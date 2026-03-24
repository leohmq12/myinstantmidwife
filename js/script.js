// Testimonial Slider Data
const testimonialsArr = [
    { 
        text: "“Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry.”", 
        name: "Stacey Wil.", 
        location: "Manchester" 
    },
    { 
        text: "“Absolutely wonderful experience! The midwives were so supportive and knowledgeable. They made me feel safe and confident throughout my pregnancy journey. Highly recommend My Instant Midwife to all expecting mothers.”", 
        name: "Jessica M.", 
        location: "Liverpool" 
    },
    { 
        text: "“I felt so safe and cared for during my home birth. The team's expertise and compassion gave me confidence every step of the way. Truly a life-changing experience with amazing professionals.”", 
        name: "Emma R.", 
        location: "Blackpool" 
    }
];

// DOM Elements
let currentIdx = 0;
const textEl = document.getElementById('testimonialText');
const nameEl = document.querySelector('.client-name');
const locationEl = document.querySelector('.client-location');
const dots = document.querySelectorAll('.dot');

// Function to update testimonial content
function updateTestimonial(index) {
    currentIdx = (index + testimonialsArr.length) % testimonialsArr.length;
    const t = testimonialsArr[currentIdx];
    
    if (textEl) {
        textEl.style.opacity = '0';
        setTimeout(() => {
            textEl.innerText = t.text;
            textEl.style.opacity = '1';
        }, 150);
    }
    
    if (nameEl) {
        nameEl.style.opacity = '0';
        setTimeout(() => {
            nameEl.innerText = t.name;
            nameEl.style.opacity = '1';
        }, 150);
    }
    
    if (locationEl) {
        locationEl.style.opacity = '0';
        setTimeout(() => {
            locationEl.innerText = t.location;
            locationEl.style.opacity = '1';
        }, 150);
    }
    
    // Update active dot
    dots.forEach((dot, i) => {
        if (i === currentIdx) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Add click event listeners to dots
dots.forEach((dot, i) => {
    dot.addEventListener('click', () => updateTestimonial(i));
});

// Auto-rotate testimonials every 7 seconds
let autoRotateInterval = setInterval(() => {
    updateTestimonial(currentIdx + 1);
}, 7000);

// Pause auto-rotation on hover
const testimonialSection = document.querySelector('.testimonials');
if (testimonialSection) {
    testimonialSection.addEventListener('mouseenter', () => {
        clearInterval(autoRotateInterval);
    });
    testimonialSection.addEventListener('mouseleave', () => {
        autoRotateInterval = setInterval(() => {
            updateTestimonial(currentIdx + 1);
        }, 7000);
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href !== '#') {
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Button hover animations
const allButtons = document.querySelectorAll('.btn-beige, .btn-dark, .card-btn, .book-now-btn');
allButtons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        const icon = this.querySelector('i');
        if (icon) {
            icon.style.transform = 'translateX(5px)';
        }
    });
    btn.addEventListener('mouseleave', function() {
        const icon = this.querySelector('i');
        if (icon) {
            icon.style.transform = 'translateX(0)';
        }
    });
});

// Add fade-in animation on scroll for sections
const sections = document.querySelectorAll('.who-we-are, .packages, .midwife-section, .serve-section, .testimonials, .contact-footer');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            sectionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    sectionObserver.observe(section);
});

// Mobile menu toggle
const createMobileMenu = () => {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-btn')) {
        const menuBtn = document.createElement('button');
        menuBtn.className = 'mobile-menu-btn';
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        menuBtn.style.cssText = `
            background: #B6ACA0;
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 10px;
            font-size: 24px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        const existingBtn = document.querySelector('.mobile-menu-btn');
        if (!existingBtn && navbar) {
            navbar.appendChild(menuBtn);
            
            menuBtn.addEventListener('click', () => {
                if (navLinks) {
                    if (navLinks.style.display === 'flex') {
                        navLinks.style.display = 'none';
                    } else {
                        navLinks.style.display = 'flex';
                        navLinks.style.flexDirection = 'column';
                        navLinks.style.position = 'absolute';
                        navLinks.style.top = '160px';
                        navLinks.style.left = '0';
                        navLinks.style.width = '100%';
                        navLinks.style.background = 'white';
                        navLinks.style.padding = '20px';
                        navLinks.style.gap = '15px';
                        navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                        navLinks.style.zIndex = '100';
                    }
                }
            });
        }
    } else if (window.innerWidth > 768 && document.querySelector('.mobile-menu-btn')) {
        const btn = document.querySelector('.mobile-menu-btn');
        if (btn) btn.remove();
        if (navLinks) {
            navLinks.style.display = 'flex';
            navLinks.style.position = 'relative';
            navLinks.style.top = 'auto';
            navLinks.style.background = 'transparent';
            navLinks.style.padding = '0';
            navLinks.style.flexDirection = 'row';
        }
    }
};

// Run on load and resize
window.addEventListener('load', createMobileMenu);
window.addEventListener('resize', createMobileMenu);

console.log('My Instant Midwife - Website Loaded Successfully');

// Gallery Horizontal Scroll controlled by Testimonials Dots
(function() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGalleryScroll);
    } else {
        initGalleryScroll();
    }
    
    function initGalleryScroll() {
        const gallery = document.querySelector('.gallery');
        const testimonialsDots = document.querySelectorAll('.dot');
        
        if (!gallery || !testimonialsDots.length) return;
        
        const galleryImages = gallery.querySelectorAll('img');
        const totalImages = galleryImages.length;
        
        // Calculate how many images are visible based on screen width
        function getVisibleImagesCount() {
            const firstImage = galleryImages[0];
            if (!firstImage) return 3;
            
            const galleryWidth = gallery.clientWidth;
            const imageWidth = firstImage.offsetWidth;
            const gap = 30; // gap between images in px
            
            // Calculate how many full images fit in the visible area
            const visibleCount = Math.floor((galleryWidth + gap) / (imageWidth + gap));
            return Math.max(1, visibleCount);
        }
        
        let visibleImages = getVisibleImagesCount();
        let totalDotsNeeded = Math.ceil(totalImages / visibleImages);
        
        // Function to update the number of dots based on visible images
        function updateDotsVisibility() {
            const newVisibleImages = getVisibleImagesCount();
            if (newVisibleImages !== visibleImages) {
                visibleImages = newVisibleImages;
                totalDotsNeeded = Math.ceil(totalImages / visibleImages);
                updateDotsActiveState();
            }
        }
        
        // Function to scroll gallery to specific section based on dot index
        function scrollGalleryToDotIndex(dotIndex) {
            if (!galleryImages.length) return;
            
            const firstImage = galleryImages[0];
            const imageWidth = firstImage.offsetWidth;
            const gap = 30; // gap between images
            const totalWidthPerImage = imageWidth + gap;
            
            // Calculate how many images to scroll
            const imagesToScroll = dotIndex * visibleImages;
            const scrollPosition = imagesToScroll * totalWidthPerImage;
            
            gallery.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
        
        // Function to get current dot index based on scroll position
        function getCurrentDotIndexFromScroll() {
            if (!galleryImages.length) return 0;
            
            const scrollLeft = gallery.scrollLeft;
            const firstImage = galleryImages[0];
            const imageWidth = firstImage.offsetWidth;
            const gap = 30;
            const totalWidthPerImage = imageWidth + gap;
            
            const approximateIndex = scrollLeft / totalWidthPerImage / visibleImages;
            let dotIndex = Math.round(approximateIndex);
            
            // Clamp the index
            dotIndex = Math.max(0, Math.min(dotIndex, totalDotsNeeded - 1));
            return dotIndex;
        }
        
        // Function to update active state of testimonials dots
        function updateDotsActiveState() {
            const currentDotIndex = getCurrentDotIndexFromScroll();
            
            testimonialsDots.forEach((dot, index) => {
                if (index === currentDotIndex && index < totalDotsNeeded) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Function to handle scroll event
        let scrollTimeout;
        function handleGalleryScroll() {
            if (scrollTimeout) clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                updateDotsActiveState();
            }, 100);
        }
        
        // Function to handle window resize
        let resizeTimeout;
        function handleResize() {
            if (resizeTimeout) clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                updateDotsVisibility();
                updateDotsActiveState();
            }, 250);
        }
        
        // Add click event listeners to testimonials dots
        testimonialsDots.forEach((dot, index) => {
            // Remove existing listeners to avoid duplicates
            const newDot = dot.cloneNode(true);
            dot.parentNode.replaceChild(newDot, dot);
            
            newDot.addEventListener('click', function(e) {
                e.stopPropagation();
                // Only scroll if this dot index is within the range
                if (index < totalDotsNeeded) {
                    scrollGalleryToDotIndex(index);
                }
            });
        });
        
        // Update the dots reference
        const updatedDots = document.querySelectorAll('.dot');
        
        // Add scroll event listener to gallery
        gallery.addEventListener('scroll', handleGalleryScroll);
        
        // Add resize event listener
        window.addEventListener('resize', handleResize);
        
        // Initialize
        setTimeout(() => {
            updateDotsVisibility();
            updateDotsActiveState();
        }, 100);
        
        // Optional: Auto-hide dots that are not needed
        function updateDotsVisibilityForGallery() {
            const allDots = document.querySelectorAll('.dot');
            allDots.forEach((dot, idx) => {
                if (idx >= totalDotsNeeded) {
                    dot.style.opacity = '0.3';
                    dot.style.cursor = 'not-allowed';
                } else {
                    dot.style.opacity = '1';
                    dot.style.cursor = 'pointer';
                }
            });
        }
        
        updateDotsVisibilityForGallery();
        
        // Also update on resize
        const originalHandleResize = handleResize;
        window.removeEventListener('resize', handleResize);
        window.addEventListener('resize', () => {
            updateDotsVisibilityForGallery();
            originalHandleResize();
        });
        
        console.log('Gallery scroll initialized with', totalImages, 'images,', totalDotsNeeded, 'dots needed');
    }
})();


// Gallery Horizontal Scroll controlled by Testimonials Dots (No Scrollbar)
(function() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGalleryScroll);
    } else {
        initGalleryScroll();
    }
    
    function initGalleryScroll() {
        const gallery = document.querySelector('.gallery');
        const testimonialsDots = document.querySelectorAll('.dot');
        
        if (!gallery || !testimonialsDots.length) return;
        
        const galleryImages = gallery.querySelectorAll('img');
        const totalImages = galleryImages.length;
        
        // Store original dot click handlers to preserve testimonial functionality
        // We'll add gallery functionality without removing existing testimonial behavior
        
        // Calculate how many images are visible based on screen width
        function getVisibleImagesCount() {
            const firstImage = galleryImages[0];
            if (!firstImage) return 3;
            
            const galleryWidth = gallery.clientWidth;
            const imageWidth = firstImage.offsetWidth;
            const gap = 30; // gap between images in px
            
            // Calculate how many full images fit in the visible area
            const visibleCount = Math.floor((galleryWidth + gap) / (imageWidth + gap));
            return Math.max(1, visibleCount);
        }
        
        let visibleImages = getVisibleImagesCount();
        let totalDotsNeeded = Math.ceil(totalImages / visibleImages);
        
        // Function to scroll gallery to specific section based on dot index
        function scrollGalleryToDotIndex(dotIndex) {
            if (!galleryImages.length) return;
            
            const firstImage = galleryImages[0];
            const imageWidth = firstImage.offsetWidth;
            const gap = 30; // gap between images
            const totalWidthPerImage = imageWidth + gap;
            
            // Calculate how many images to scroll
            const imagesToScroll = dotIndex * visibleImages;
            const scrollPosition = imagesToScroll * totalWidthPerImage;
            
            gallery.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
        
        // Function to get current dot index based on scroll position
        function getCurrentDotIndexFromScroll() {
            if (!galleryImages.length) return 0;
            
            const scrollLeft = gallery.scrollLeft;
            const firstImage = galleryImages[0];
            const imageWidth = firstImage.offsetWidth;
            const gap = 30;
            const totalWidthPerImage = imageWidth + gap;
            
            const approximateIndex = scrollLeft / totalWidthPerImage / visibleImages;
            let dotIndex = Math.round(approximateIndex);
            
            // Clamp the index
            dotIndex = Math.max(0, Math.min(dotIndex, totalDotsNeeded - 1));
            return dotIndex;
        }
        
        // Function to update active state of testimonials dots
        function updateDotsActiveState() {
            const currentDotIndex = getCurrentDotIndexFromScroll();
            
            testimonialsDots.forEach((dot, index) => {
                if (index === currentDotIndex && index < totalDotsNeeded) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Function to handle scroll event
        let scrollTimeout;
        function handleGalleryScroll() {
            if (scrollTimeout) clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                updateDotsActiveState();
            }, 100);
        }
        
        // Function to handle window resize
        let resizeTimeout;
        function handleResize() {
            if (resizeTimeout) clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                visibleImages = getVisibleImagesCount();
                totalDotsNeeded = Math.ceil(totalImages / visibleImages);
                updateDotsActiveState();
            }, 250);
        }
        
        // Store original dot click handlers and add gallery scroll functionality
        // We need to preserve testimonial text change functionality
        
        // Save the original click handlers by removing and re-adding with combined functionality
        const originalDots = [...testimonialsDots];
        
        // Create new click handler that does both: update testimonial AND scroll gallery
        originalDots.forEach((dot, index) => {
            // Remove existing event listeners (we'll add new ones)
            const newDot = dot.cloneNode(true);
            dot.parentNode.replaceChild(newDot, dot);
            
            // Add click event that handles both testimonial AND gallery scroll
            newDot.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Update testimonial content (using the existing updateTestimonial function)
                if (typeof updateTestimonial === 'function') {
                    updateTestimonial(index);
                }
                
                // Scroll gallery if this dot is within range
                if (index < totalDotsNeeded) {
                    scrollGalleryToDotIndex(index);
                }
            });
            
            // Add hover effect to scroll gallery on hover
            newDot.addEventListener('mouseenter', function() {
                if (index < totalDotsNeeded) {
                    scrollGalleryToDotIndex(index);
                }
            });
        });
        
        // Update the dots reference
        const updatedDots = document.querySelectorAll('.dot');
        
        // Add scroll event listener to gallery
        gallery.addEventListener('scroll', handleGalleryScroll);
        
        // Add resize event listener
        window.addEventListener('resize', handleResize);
        
        // Initialize
        setTimeout(() => {
            visibleImages = getVisibleImagesCount();
            totalDotsNeeded = Math.ceil(totalImages / visibleImages);
            updateDotsActiveState();
        }, 100);
        
        // Style inactive dots
        function updateDotsStyle() {
            const allDots = document.querySelectorAll('.dot');
            allDots.forEach((dot, idx) => {
                if (idx >= totalDotsNeeded) {
                    dot.style.opacity = '0.3';
                    dot.style.cursor = 'not-allowed';
                } else {
                    dot.style.opacity = '1';
                    dot.style.cursor = 'pointer';
                }
            });
        }
        
        updateDotsStyle();
        
        // Update on resize
        window.addEventListener('resize', () => {
            setTimeout(() => {
                visibleImages = getVisibleImagesCount();
                totalDotsNeeded = Math.ceil(totalImages / visibleImages);
                updateDotsStyle();
            }, 100);
        });
        
        // Also add touch swipe support for mobile without scrollbar
        let touchStartX = 0;
        let touchStartY = 0;
        
        gallery.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        });
        
        gallery.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            const touchEndY = e.changedTouches[0].screenY;
            const deltaX = touchEndX - touchStartX;
            const deltaY = Math.abs(touchEndY - touchStartY);
            
            // Only handle horizontal swipe (more horizontal than vertical)
            if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > deltaY) {
                const currentDotIndex = getCurrentDotIndexFromScroll();
                if (deltaX < 0 && currentDotIndex < totalDotsNeeded - 1) {
                    // Swipe left - next
                    scrollGalleryToDotIndex(currentDotIndex + 1);
                    // Also update testimonial
                    if (typeof updateTestimonial === 'function') {
                        updateTestimonial(currentDotIndex + 1);
                    }
                } else if (deltaX > 0 && currentDotIndex > 0) {
                    // Swipe right - previous
                    scrollGalleryToDotIndex(currentDotIndex - 1);
                    // Also update testimonial
                    if (typeof updateTestimonial === 'function') {
                        updateTestimonial(currentDotIndex - 1);
                    }
                }
            }
        });
        
        console.log('Gallery scroll initialized - No scrollbar, dots control scroll');
    }
})();