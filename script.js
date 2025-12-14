// Toast notification system
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Email validation
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Mobile Menu Toggle
const createMobileMenu = () => {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    if (!nav || !navLinks) return;
    
    // Create hamburger menu button
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
    menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
    menuToggle.setAttribute('aria-expanded', 'false');
    
    // Insert after logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.after(menuToggle);
    }
    
    // Toggle menu on click
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        
        if (isActive) {
            icon.className = 'fas fa-times';
            menuToggle.setAttribute('aria-expanded', 'true');
        } else {
            icon.className = 'fas fa-bars';
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-bars';
            }
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-bars';
            }
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
};

// Initialize mobile menu on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createMobileMenu);
} else {
    createMobileMenu();
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const navHeight = document.querySelector('nav')?.offsetHeight || 0;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add animation on scroll with error handling
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const scrollObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements with error handling
try {
    document.querySelectorAll('section, .work-item, .service-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(el);
    });
} catch (error) {
    console.error('Error setting up scroll observer:', error);
}

// Carousel dots functionality with error handling
const dots = document.querySelectorAll('.dot');
if (dots.length > 0) {
    let currentDot = 0;
    
    const rotateDots = () => {
        if (dots[currentDot]) {
            dots[currentDot].classList.remove('active');
            dots[currentDot].setAttribute('aria-selected', 'false');
        }
        currentDot = (currentDot + 1) % dots.length;
        if (dots[currentDot]) {
            dots[currentDot].classList.add('active');
            dots[currentDot].setAttribute('aria-selected', 'true');
        }
    };
    
    setInterval(rotateDots, 3000);
}

// Newsletter form with proper validation
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const input = this.querySelector('input[type="email"]');
        const email = input.value.trim();
        
        if (!email) {
            showToast('Please enter your email address', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showToast('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate API call (replace with actual backend integration)
        showToast('Thank you for subscribing!', 'success');
        input.value = '';
    });
}

// Snowflake effect with performance optimization
let snowflakeCount = 0;
// PERFORMANCE: Reduce snowflakes on mobile
const MAX_SNOWFLAKES = window.matchMedia('(max-width: 768px)').matches ? 5 : 15;

function createSnowflake() {
    if (snowflakeCount >= MAX_SNOWFLAKES) return;
    
    snowflakeCount++;
    const snowflake = document.createElement('div');
    snowflake.innerHTML = '❄'; // Fixed: proper snowflake character
    snowflake.style.position = 'fixed';
    snowflake.style.top = '-20px';
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.fontSize = (Math.random() * 20 + 10) + 'px';
    snowflake.style.color = 'rgba(147, 197, 253, 0.6)';
    snowflake.style.pointerEvents = 'none';
    snowflake.style.zIndex = '9999';
    snowflake.style.animation = `fall ${Math.random() * 3 + 2}s linear`;
    snowflake.setAttribute('aria-hidden', 'true');
    
    document.body.appendChild(snowflake);
    
    setTimeout(() => {
        snowflake.remove();
        snowflakeCount--;
    }, 5000);
}

// Use matchMedia for better performance
const isMobile = window.matchMedia('(max-width: 768px)').matches;
const snowflakeInterval = isMobile ? 800 : 400;

// Start snowflake effect
const snowflakeTimer = setInterval(createSnowflake, snowflakeInterval);

// Stop snowflakes if page is hidden (performance optimization)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(snowflakeTimer);
    } else {
        setInterval(createSnowflake, snowflakeInterval);
    }
});

// Skill bars animation with error handling
const skillBars = document.querySelectorAll('.skill-progress');
if (skillBars.length > 0) {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                
                progressBar.style.width = '0%';
                
                setTimeout(() => {
                    progressBar.style.transition = 'width 1.5s ease';
                    progressBar.style.width = width;
                }, 100);
                
                skillObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        try {
            skillObserver.observe(bar);
        } catch (error) {
            console.error('Error observing skill bar:', error);
        }
    });
}

// Handle orientation change
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        // Recalculate viewport
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }, 100);
});

// Set initial viewport height
const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

// Optimize scroll performance with throttling
let ticking = false;
let lastScrollY = window.pageYOffset;

function handleScroll() {
    lastScrollY = window.pageYOffset;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
    }
}, { passive: true });

// Error boundary for image loading
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        if (!this.dataset.errorHandled) {
            this.dataset.errorHandled = 'true';
            console.warn('Image failed to load:', this.src);
        }
    });
});

// Prevent form submissions without validation
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        const inputs = this.querySelectorAll('input[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            e.preventDefault();
        }
    });
});

// Add loading state to buttons
document.querySelectorAll('button[type="submit"]').forEach(button => {
    button.addEventListener('click', function() {
        if (this.form && this.form.checkValidity()) {
            this.disabled = true;
            setTimeout(() => {
                this.disabled = false;
            }, 2000);
        }
    });
});

// Console welcome message
console.log('%c👋 Welcome to Rishi Raje Portfolio!', 'color: #d97236; font-size: 16px; font-weight: bold;');
console.log('%cInterested in collaboration? Email: rishi_raje07@yahoo.co.uk', 'color: #6b4423; font-size: 12px;');

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                console.log(`Page load time: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
            }
        }, 0);
    });
}

// Intersection Observer for lazy loading (future implementation)
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Service Worker registration (optional - for PWA)
if ('serviceWorker' in navigator) {
    // Uncomment when service worker file is ready
    // window.addEventListener('load', () => {
    //     navigator.serviceWorker.register('/sw.js')
    //         .then(reg => console.log('Service Worker registered'))
    //         .catch(err => console.log('Service Worker registration failed:', err));
    // });
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showToast,
        isValidEmail,
        createMobileMenu
    };
}
