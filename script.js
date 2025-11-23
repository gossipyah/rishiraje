// Mobile Menu Toggle
const createMobileMenu = () => {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    // Create hamburger menu button
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    menuToggle.setAttribute('aria-label', 'Toggle menu');
    
    // Insert after logo
    const logo = document.querySelector('.logo');
    logo.after(menuToggle);
    
    // Toggle menu on click
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });
    
    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.querySelector('i').className = 'fas fa-bars';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target)) {
            navLinks.classList.remove('active');
            menuToggle.querySelector('i').className = 'fas fa-bars';
        }
    });
};

// Add mobile menu styles
const addMobileMenuStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        .menu-toggle {
            display: none;
            background: none;
            border: none;
            font-size: 1.5em;
            color: #1e3a5f;
            cursor: pointer;
            padding: 5px;
            transition: transform 0.3s;
        }
        
        .menu-toggle:hover {
            transform: scale(1.1);
        }
        
        @media (max-width: 768px) {
            .menu-toggle {
                display: block;
            }
        }
        
        /* Touch-friendly sizing */
        @media (hover: none) and (pointer: coarse) {
            .social-btn, .nav-cta, .btn-primary, .btn-secondary, .explore-btn {
                min-height: 48px;
                padding: 14px 30px;
            }
            
            .client-logo, .service-card, .work-item {
                min-height: 48px;
            }
            
            .dot {
                width: 12px;
                height: 12px;
            }
            
            .dot.active {
                width: 36px;
            }
        }
        
        /* Prevent zoom on input focus for iOS */
        @media screen and (max-width: 768px) {
            input, textarea, select {
                font-size: 16px !important;
            }
        }
        
        /* Better touch targets */
        @media (max-width: 768px) {
            .social-icon {
                width: 48px;
                height: 48px;
                font-size: 1.2em;
            }
            
            .work-arrow {
                width: 48px;
                height: 48px;
            }
            
            .contact-icon {
                width: 48px;
                height: 48px;
            }
        }
    `;
    document.head.appendChild(style);
};

// Initialize mobile menu
createMobileMenu();
addMobileMenuStyles();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section, .work-item, .service-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Carousel dots functionality
const dots = document.querySelectorAll('.dot');
let currentDot = 0;

setInterval(() => {
    dots[currentDot].classList.remove('active');
    currentDot = (currentDot + 1) % dots.length;
    dots[currentDot].classList.add('active');
}, 3000);

// Newsletter form
const newsletterForm = document.querySelector('.newsletter');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const input = this.querySelector('input');
        if (input.value) {
            alert('Thank you for subscribing!');
            input.value = '';
        }
    });
}

// Add snowflake effect (reduce for mobile performance)
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.innerHTML = '❄';
    snowflake.style.position = 'fixed';
    snowflake.style.top = '-20px';
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.fontSize = (Math.random() * 20 + 10) + 'px';
    snowflake.style.color = 'rgba(147, 197, 253, 0.6)';
    snowflake.style.pointerEvents = 'none';
    snowflake.style.zIndex = '9999';
    snowflake.style.animation = `fall ${Math.random() * 3 + 2}s linear`;
    
    document.body.appendChild(snowflake);
    
    setTimeout(() => {
        snowflake.remove();
    }, 5000);
}

// Add snowflake animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Reduce snowflakes on mobile for better performance
const isMobile = window.innerWidth <= 768;
const snowflakeInterval = isMobile ? 600 : 300;
setInterval(createSnowflake, snowflakeInterval);

// Skill bars animation
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.width = '0%';
            setTimeout(() => {
                entry.target.style.transition = 'width 1.5s ease';
                entry.target.style.width = width;
            }, 100);
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

// Handle orientation change
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
});

// Optimize scroll performance on mobile
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            ticking = false;
        });
        ticking = true;
    }
});
