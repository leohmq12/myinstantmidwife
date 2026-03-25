/* ============================================================
   SCRIPT.JS - My Instant Midwife - Main JavaScript
   ============================================================
   Table of Contents:
   1. Testimonial Slider (data + rotation)
   2. Smooth Scroll for Anchor Links
   3. Button Hover Animations
   4. Scroll-triggered Fade-in Animations
   5. Mobile Menu Toggle
   6. Gallery Drag-to-Scroll
   7. FAQ Accordion
   ============================================================ */


/* ==========================================================
   1. TESTIMONIAL SLIDER
   Rotates through client quotes with fade animation.
   Controlled by dot pagination and auto-advances every 7s.
   ========================================================== */

/* Testimonial data array */
const testimonialsArr = [
    {
        text: "\u201CLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\u2019s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry.\u201D",
        name: "Stacey Wil.",
        location: "Manchester"
    },
    {
        text: "\u201CAbsolutely wonderful experience! The midwives were so supportive and knowledgeable. They made me feel safe and confident throughout my pregnancy journey. Highly recommend My Instant Midwife to all expecting mothers.\u201D",
        name: "Jessica M.",
        location: "Liverpool"
    },
    {
        text: "\u201CI felt so safe and cared for during my home birth. The team\u2019s expertise and compassion gave me confidence every step of the way. Truly a life-changing experience with amazing professionals.\u201D",
        name: "Emma R.",
        location: "Blackpool"
    }
];

/* DOM element references */
let currentIdx = 0;
const textEl = document.getElementById('testimonialText');
const nameEl = document.querySelector('.client-name');
const locationEl = document.querySelector('.client-location');
const dots = document.querySelectorAll('.dot');
const prevArrow = document.querySelector('.nav-arrow.left');
const nextArrow = document.querySelector('.nav-arrow.right');

/**
 * Updates the testimonial content with a fade transition.
 * @param {number} index - Index of the testimonial to show
 */
function updateTestimonial(index) {
    currentIdx = (index + testimonialsArr.length) % testimonialsArr.length;
    const t = testimonialsArr[currentIdx];

    /* Fade out, swap content, fade in */
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

    /* Highlight the active dot */
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIdx);
    });
}

/* Attach click handlers to each dot */
dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        updateTestimonial(i);
        resetAutoRotate();
    });
});

/* Reset auto rotation timer when manually clicking */
function resetAutoRotate() {
    clearInterval(autoRotateInterval);
    autoRotateInterval = setInterval(() => {
        updateTestimonial(currentIdx + 1);
    }, 7000);
}

/* Attach click handlers to arrows */
if (prevArrow) {
    prevArrow.addEventListener('click', () => {
        updateTestimonial(currentIdx - 1);
        resetAutoRotate();
    });
}

if (nextArrow) {
    nextArrow.addEventListener('click', () => {
        updateTestimonial(currentIdx + 1);
        resetAutoRotate();
    });
}

/* Auto-rotate testimonials every 7 seconds */
let autoRotateInterval = setInterval(() => {
    updateTestimonial(currentIdx + 1);
}, 7000);

/* Pause rotation on hover, resume on leave */
const testimonialSection = document.querySelector('.testimonials');
if (testimonialSection) {
    testimonialSection.addEventListener('mouseenter', () => {
        clearInterval(autoRotateInterval);
    });
    testimonialSection.addEventListener('mouseleave', () => {
        resetAutoRotate();
    });
}


/* ==========================================================
   2. SMOOTH SCROLL FOR ANCHOR LINKS
   Enables smooth scrolling when clicking in-page #hash links.
   ========================================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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


/* ==========================================================
   3. BUTTON HOVER ANIMATIONS
   Slides the arrow icon right on hover for all CTA buttons.
   ========================================================== */

const allButtons = document.querySelectorAll('.btn-beige, .btn-dark, .card-btn, .book-now-btn, .btn-outline');
allButtons.forEach(btn => {
    btn.addEventListener('mouseenter', function () {
        const icon = this.querySelector('i');
        if (icon) icon.style.transform = 'translateX(5px)';
    });
    btn.addEventListener('mouseleave', function () {
        const icon = this.querySelector('i');
        if (icon) icon.style.transform = 'translateX(0)';
    });
});


/* ==========================================================
   4. SCROLL-TRIGGERED FADE-IN ANIMATIONS
   Sections fade up into view as the user scrolls down.
   Uses IntersectionObserver for performance.
   ========================================================== */

const sections = document.querySelectorAll(
    '.who-we-are, .packages, .midwife-section, .serve-section, ' +
    '.testimonials, .birthing-choices, .get-in-touch, .thank-you-section'
);

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            sectionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

/* Set initial hidden state and start observing */
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    sectionObserver.observe(section);
});


/* ==========================================================
   5. MOBILE MENU TOGGLE
   Shows/hides nav links when hamburger button is tapped.
   ========================================================== */

(function () {
    /* Wait for components.js to inject the navbar */
    function initMobileMenu() {
        const menuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');

        if (!menuBtn || !navLinks) return;

        menuBtn.addEventListener('click', () => {
            const isOpen = navLinks.classList.contains('mobile-open');
            if (isOpen) {
                navLinks.classList.remove('mobile-open');
                navLinks.style.display = '';
            } else {
                navLinks.classList.add('mobile-open');
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'white';
                navLinks.style.padding = '20px';
                navLinks.style.gap = '15px';
                navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                navLinks.style.zIndex = '100';
            }
        });
    }

    /* Run after a short delay to ensure components are injected */
    setTimeout(initMobileMenu, 100);
})();


/* ==========================================================
   6. GALLERY AUTO-LOOP MARQUEE
   Automatically scrolls the gallery continuously.
   ========================================================== */

(function () {
    function initGalleryLoop() {
        const galleries = document.querySelectorAll('.gallery');
        galleries.forEach(gallery => {
            if (gallery.querySelector('.gallery-track')) return; // Already initialized
            
            const originalItems = Array.from(gallery.children);
            if (originalItems.length === 0) return;

            // Create the track element that will animate
            const track = document.createElement('div');
            track.className = 'gallery-track';

            // Append all original items to the track
            originalItems.forEach(item => track.appendChild(item));

            // Clone and append items for a seamless loop
            originalItems.forEach(item => {
                const clone = item.cloneNode(true);
                track.appendChild(clone);
            });

            // Put the track back into the gallery wrapper
            gallery.appendChild(track);
        });
    }

    /* Initialise after components are loaded */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGalleryLoop);
    } else {
        initGalleryLoop();
    }
})();


/* ==========================================================
   7. FAQ ACCORDION
   Click a question to expand/collapse its answer.
   Only one item can be open at a time.
   ========================================================== */

const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            /* Close all items first */
            faqItems.forEach(faq => {
                faq.classList.remove('open');
                const icon = faq.querySelector('.fas');
                if (icon) {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                }
            });

            /* Toggle the clicked item */
            if (!isOpen) {
                item.classList.add('open');
                const icon = item.querySelector('.fas');
                if (icon) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                }
            }
        });
    }
});


/* ==========================================================
   INITIALISATION LOG
   ========================================================== */
console.log('My Instant Midwife - Website Loaded Successfully');
