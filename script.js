// ========================================
// RISHI RAJE PORTFOLIO - OPTIMIZED JAVASCRIPT
// ALL PERFORMANCE IMPROVEMENTS APPLIED
// ========================================

// ⚡ PERFORMANCE FIX: Cache nav height to prevent forced reflows
let cachedNavHeight = 70; // Default fallback

// ========================================
// UTILITY FUNCTIONS
// ========================================

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    requestAnimationFrame(() => {
        container.appendChild(toast);
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(0)';
        });
    });
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(400px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function isValidEmail(email) {
    return emailRegex.test(email);
}

// Throttle function
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

// Debounce function
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

// ========================================
// MOBILE MENU
// ========================================

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
    
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.after(menuToggle);
    }
    
    // Toggle menu on click
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        
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

// ========================================
// SMOOTH SCROLLING
// ========================================

// ⚡ PERFORMANCE FIX: Update and cache nav height
const updateNavHeight = () => {
    const nav = document.querySelector('nav');
    if (nav) {
        cachedNavHeight = nav.offsetHeight;
    }
};

// Update nav height on load and resize (debounced)
window.addEventListener('load', updateNavHeight, { passive: true, once: true });
window.addEventListener('resize', debounce(updateNavHeight, 250), { passive: true });

// Smooth scrolling for navigation links
const initSmoothScrolling = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                // ⚡ Use cached nav height to avoid forced reflow
                if (cachedNavHeight === 0) updateNavHeight();
                
                // ⚡ Batch all reads together, then do writes
                requestAnimationFrame(() => {
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - cachedNavHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                });
            }
        }, { passive: false });
    });
};

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================

const initScrollAnimations = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                // Remove will-change after animation
                setTimeout(() => {
                    entry.target.style.willChange = 'auto';
                }, 600);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe service cards, stat cards, etc.
    document.querySelectorAll('.service-card, .skill-item, .contact-item, .client-logo').forEach(el => {
        observer.observe(el);
    });
};

// ========================================
// SKILL BAR ANIMATIONS
// ========================================

const animateSkillBars = () => {
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-progress');
                if (progressBar) {
                    const width = progressBar.style.width;
                    progressBar.style.width = '0';
                    
                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            progressBar.style.width = width;
                        }, 100);
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.skill-item').forEach(el => {
        observer.observe(el);
    });
};

// ========================================
// NEWSLETTER FORM (Non-Critical)
// ========================================

const initNewsletter = () => {
    const form = document.getElementById('newsletter-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = document.getElementById('newsletter-email');
        const email = emailInput.value.trim();
        
        if (!isValidEmail(email)) {
            showToast('Please enter a valid email address', 'error');
            return;
        }
        
        // Here you would normally send to your backend
        showToast('Thank you for subscribing!', 'success');
        emailInput.value = '';
    });
};

// ========================================
// LAZY LOADING IMAGES (Non-Critical)
// ========================================

const initLazyLoading = () => {
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    } else {
        // Fallback: Use Intersection Observer
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img.lazy').forEach(img => {
            imageObserver.observe(img);
        });
    }
};

// ========================================
// INITIALIZATION
// ========================================

// Critical features - Initialize immediately
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        createMobileMenu();
        initSmoothScrolling();
    });
} else {
    createMobileMenu();
    initSmoothScrolling();
}

// ⚡ PERFORMANCE FIX: Defer non-critical features to avoid blocking main thread
const initNonCriticalFeatures = () => {
    // Use requestIdleCallback if available, otherwise setTimeout
    const deferredInit = (callback, priority = 0) => {
        if ('requestIdleCallback' in window) {
            requestIdleCallback(callback, { timeout: 1000 + priority * 500 });
        } else {
            setTimeout(callback, 100 + priority * 100);
        }
    };
    
    // Priority 1: Animations (visible impact)
    deferredInit(() => {
        initScrollAnimations();
        animateSkillBars();
    }, 0);
    
    // Priority 2: Forms (interactive but not immediate)
    deferredInit(() => {
        initNewsletter();
    }, 1);
    
    // Priority 3: Lazy loading (lowest priority)
    deferredInit(() => {
        initLazyLoading();
    }, 2);
};

// Run non-critical features after page load
if (document.readyState === 'complete') {
    initNonCriticalFeatures();
} else {
    window.addEventListener('load', initNonCriticalFeatures, { passive: true, once: true });
}

// ========================================
// PERFORMANCE MONITORING (Development Only)
// ========================================

if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.addEventListener('load', () => {
        if ('performance' in window) {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            const connectTime = perfData.responseEnd - perfData.requestStart;
            const renderTime = perfData.domComplete - perfData.domLoading;
            
            console.log('⚡ Performance Metrics:');
            console.log(`Page Load Time: ${pageLoadTime}ms`);
            console.log(`Server Response: ${connectTime}ms`);
            console.log(`DOM Render: ${renderTime}ms`);
        }
    });
}

// ========================================
// ERROR HANDLING
// ========================================

window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.message);
    // In production, you might want to send this to an error tracking service
});
