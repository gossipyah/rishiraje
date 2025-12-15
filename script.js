// FINAL OPTIMIZED script.js - All INP Improvements + No Snowflakes
// Performance-optimized for fast, responsive interactions

// ==================== UTILITY FUNCTIONS ====================

// Toast notification system (optimized with requestAnimationFrame)
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    // Use requestAnimationFrame for smooth, non-blocking animation
    requestAnimationFrame(() => {
        container.appendChild(toast);
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
        });
    });
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Email validation (cached regex for performance)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function isValidEmail(email) {
    return emailRegex.test(email);
}

// Throttle function for performance optimization
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Debounce function for delayed execution
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ==================== MOBILE MENU ====================

// Mobile Menu Toggle (optimized for fast interaction)
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
    
    // Toggle menu on click - optimized with requestAnimationFrame
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Batch DOM updates for better performance
        requestAnimationFrame(() => {
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
    }, { passive: false });
    
    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            requestAnimationFrame(() => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        }, { passive: true });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
            requestAnimationFrame(() => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        }
    }, { passive: true });
};

// Initialize mobile menu when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createMobileMenu);
} else {
    createMobileMenu();
}

// ==================== SMOOTH SCROLLING ====================

// Smooth scrolling for navigation links (optimized)
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
    }, { passive: false });
});

// ==================== SCROLL ANIMATIONS ====================

// Intersection Observer for scroll animations (optimized)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const scrollObserver = new IntersectionObserver(function(entries) {
    // Batch DOM updates with requestAnimationFrame
    requestAnimationFrame(() => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
}, observerOptions);

// Observe elements with error handling
try {
    document.querySelectorAll('section, .work-item, .service-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.willChange = 'opacity, transform'; // GPU acceleration hint
        scrollObserver.observe(el);
    });
} catch (error) {
    console.error('Error setting up scroll observer:', error);
}

// ==================== CAROUSEL DOTS ====================

// Carousel dots functionality (optimized)
const dots = document.querySelectorAll('.dot');
if (dots.length > 0) {
    let currentDot = 0;
    
    const rotateDots = () => {
        // Batch DOM updates
        requestAnimationFrame(() => {
            if (dots[currentDot]) {
                dots[currentDot].classList.remove('active');
                dots[currentDot].setAttribute('aria-selected', 'false');
            }
            currentDot = (currentDot + 1) % dots.length;
            if (dots[currentDot]) {
                dots[currentDot].classList.add('active');
                dots[currentDot].classList('aria-selected', 'true');
            }
        });
    };
    
    setInterval(rotateDots, 3000);
}

// ==================== NEWSLETTER FORM ====================

// Newsletter form (optimized validation)
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const input = this.querySelector('input[type="email"]');
        const email = input.value.trim();
        
        // Early exit for validation
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
    }, { passive: false });
}

// ==================== SKILL BARS ANIMATION ====================

// Skill bars animation (optimized)
const skillBars = document.querySelectorAll('.skill-progress');
if (skillBars.length > 0) {
    const skillObserver = new IntersectionObserver((entries) => {
        // Batch animations with requestAnimationFrame
        requestAnimationFrame(() => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const width = progressBar.style.width;
                    
                    progressBar.style.width = '0%';
                    
                    // Use requestAnimationFrame for smooth animation
                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            progressBar.style.transition = 'width 1.5s ease';
                            progressBar.style.width = width;
                            progressBar.style.willChange = 'width'; // GPU hint
                        }, 100);
                    });
                    
                    skillObserver.unobserve(progressBar);
                }
            });
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

// ==================== VIEWPORT & ORIENTATION ====================

// Handle orientation change (debounced for performance)
const handleOrientationChange = debounce(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}, 100);

window.addEventListener('orientationchange', handleOrientationChange, { passive: true });

// Set initial viewport height
const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

// ==================== SCROLL HANDLING ====================

// Optimized scroll handling with throttle
const handleScroll = throttle(() => {
    const scrollY = window.pageYOffset;
    // Add any scroll-based logic here if needed
}, 100);

window.addEventListener('scroll', handleScroll, { passive: true });

// ==================== IMAGE ERROR HANDLING ====================

// Efficient image error handling with event delegation
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG' && !e.target.dataset.errorHandled) {
        e.target.dataset.errorHandled = 'true';
        console.warn('Image failed to load:', e.target.src);
    }
}, true);

// ==================== FORM VALIDATION ====================

// Optimized form validation with early exit
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        const inputs = this.querySelectorAll('input[required]');
        let isValid = true;
        
        // Early exit on first invalid input for better performance
        for (const input of inputs) {
            if (!input.value.trim()) {
                isValid = false;
                break;
            }
        }
        
        if (!isValid) {
            e.preventDefault();
        }
    }, { passive: false });
});

// ==================== BUTTON LOADING STATE ====================

// Optimized button loading state
document.querySelectorAll('button[type="submit"]').forEach(button => {
    button.addEventListener('click', function() {
        if (this.form && this.form.checkValidity()) {
            this.disabled = true;
            setTimeout(() => {
                this.disabled = false;
            }, 2000);
        }
    }, { passive: false });
});

// ==================== CONSOLE MESSAGES ====================

// Console welcome message (deferred to not block main thread)
setTimeout(() => {
    console.log('%c👋 Welcome to Rishi Raje Portfolio!', 'color: #d97236; font-size: 16px; font-weight: bold;');
    console.log('%cInterested in collaboration? Email: rishi_raje07@yahoo.co.uk', 'color: #6b4423; font-size: 12px;');
}, 1000);

// ==================== PERFORMANCE MONITORING ====================

// Performance monitoring (deferred)
if ('performance' in window) {
    window.addEventListener('load', () => {
        // Use requestIdleCallback if available for non-blocking monitoring
        const measurePerformance = () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                console.log(`Page load time: ${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms`);
            }
        };
        
        if ('requestIdleCallback' in window) {
            requestIdleCallback(measurePerformance);
        } else {
            setTimeout(measurePerformance, 0);
        }
    }, { passive: true, once: true });
}

// ==================== LAZY LOADING ====================

// Intersection Observer for lazy loading images
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            // Batch image loads with requestAnimationFrame
            requestAnimationFrame(() => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
        }, { rootMargin: '50px' }); // Start loading slightly before visible
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// ==================== SERVICE WORKER ====================

// Service Worker registration (optional - for PWA)
if ('serviceWorker' in navigator) {
    // Register after page load to not interfere with critical rendering
    window.addEventListener('load', () => {
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                // Uncomment when service worker file is ready
                // navigator.serviceWorker.register('/sw.js')
                //     .then(reg => console.log('Service Worker registered'))
                //     .catch(err => console.log('Service Worker registration failed:', err));
            });
        }
    }, { passive: true, once: true });
}

// ==================== CLEANUP ====================

// Clean up resources on page unload
window.addEventListener('beforeunload', () => {
    // Disconnect observers to prevent memory leaks
    if (scrollObserver) {
        scrollObserver.disconnect();
    }
}, { passive: true, once: true });

// ==================== EXPORTS ====================

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showToast,
        isValidEmail,
        createMobileMenu,
        throttle,
        debounce
    };
}
