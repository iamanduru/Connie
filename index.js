class WebsiteEnhancer {
    constructor() {
        this.lastScrollTop = 0;
        this.ticking = false;
        this.isMenuOpen = false;
        this.observers = new Map();
        this.init();
    }

    init() {
        this.setupNavbarEffects();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupIntersectionObservers();
        this.setupAdvancedInteractions();
        this.setupPreloader();
        this.setupAccessibility();
        this.setupPerformanceOptimizations();
    }

    setupNavbarEffects() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;

        const handleScroll = () => {
            if (!this.ticking) {
                requestAnimationFrame(() => {
                    this.updateNavbar();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    updateNavbar() {
        const navbar = document.getElementById('navbar');
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        if (currentScroll > this.lastScrollTop && currentScroll > 150 && !this.isMenuOpen) {
            // Scrolling down - hide navbar
            navbar.style.transform = 'translateY(-100%)';
            navbar.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        } else if (currentScroll < this.lastScrollTop || currentScroll <= 150) {
            // Scrolling up or near top - show navbar
            navbar.style.transform = 'translateY(0)';
            navbar.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        }
        
        this.lastScrollTop = Math.max(0, currentScroll);
    }

    setupMobileMenu() {
        const mobileToggle = document.getElementById('mobile-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (!mobileToggle || !navMenu) return;

        mobileToggle.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleMobileMenu();
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (this.isMenuOpen) {
                    this.toggleMobileMenu();
                }
            });
        });

        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                this.toggleMobileMenu();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.toggleMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        const navMenu = document.getElementById('nav-menu');
        const mobileToggle = document.getElementById('mobile-toggle');
        const spans = mobileToggle.querySelectorAll('span');
        
        this.isMenuOpen = !this.isMenuOpen;
        navMenu.classList.toggle('active');
        
        if (this.isMenuOpen) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[0].style.transformOrigin = 'center';
            
            setTimeout(() => {
                spans[1].style.opacity = '0';
                spans[1].style.transform = 'scaleX(0)';
            }, 100);
            
            setTimeout(() => {
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                spans[2].style.transformOrigin = 'center';
            }, 150);
            
            document.body.style.overflow = 'hidden';
        } else {
            spans.forEach((span, index) => {
                setTimeout(() => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }, index * 50);
            });
            
            document.body.style.overflow = '';
        }
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
                    
                    this.smoothScrollTo(offsetTop, 1000);
                    
                    this.updateActiveNavItem(targetId);
                }
            });
        });

        this.setupScrollSpy();
    }

    smoothScrollTo(targetPosition, duration) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            const ease = 1 - Math.pow(1 - progress, 3);
            
            window.scrollTo(0, startPosition + distance * ease);
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    }

    setupScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-item a[href^="#"]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.updateActiveNavItem(`#${entry.target.id}`);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-80px 0px -80px 0px'
        });

        sections.forEach(section => observer.observe(section));
    }

    updateActiveNavItem(targetId) {
        const navLinks = document.querySelectorAll('.nav-item a[href^="#"]');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });
    }

    setupIntersectionObservers() {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate__fadeInUp');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.hero-content > *').forEach(el => {
            if (!el.classList.contains('animate__animated')) {
                el.classList.add('animate__animated');
                fadeObserver.observe(el);
            }
        });

        this.setupParallaxEffect();
    }

    setupParallaxEffect() {
        const floatingCards = document.querySelectorAll('.floating-card');
        
        const handleParallax = () => {
            if (!this.ticking) {
                requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    floatingCards.forEach((card, index) => {
                        const rate = scrolled * -0.5 * (index + 1) * 0.1;
                        card.style.transform = `translateY(${rate}px) rotate(${rate * 0.02}deg)`;
                    });
                    this.ticking = false;
                });
                this.ticking = true;
            }
        };

        window.addEventListener('scroll', handleParallax, { passive: true });
    }

    setupAdvancedInteractions() {
        this.setupButtonEffects();
        
        this.setupFloatingShapesInteraction();
        
        this.setupScrollIndicator();
        
        this.setupLoadingStates();
    }

    setupButtonEffects() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('mousedown', (e) => {
                this.createRipple(e, button);
            });
            
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                
                button.style.setProperty('--mouse-x', `${x}%`);
                button.style.setProperty('--mouse-y', `${y}%`);
            });
        });
    }

    createRipple(e, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out forwards;
            pointer-events: none;
            z-index: 1;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    setupFloatingShapesInteraction() {
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach(shape => {
            shape.addEventListener('mouseenter', () => {
                shape.style.transform = 'scale(1.2) rotate(180deg)';
                shape.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            });
            
            shape.addEventListener('mouseleave', () => {
                shape.style.transform = '';
                shape.style.transition = '';
            });
        });
    }

    setupScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (!scrollIndicator) return;
        
        scrollIndicator.addEventListener('click', () => {
            const nextSection = document.querySelector('#about') || document.querySelector('section:nth-of-type(2)');
            if (nextSection) {
                const offsetTop = nextSection.getBoundingClientRect().top + window.pageYOffset - 80;
                this.smoothScrollTo(offsetTop, 1000);
            }
        });
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (scrolled > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        }, { passive: true });
    }

    setupLoadingStates() {
        const ctaButtons = document.querySelectorAll('.btn-primary');
        
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                if (button.getAttribute('href') === '#contact') {
                    e.preventDefault();
                    this.showLoadingState(button);
                    
                    setTimeout(() => {
                        this.hideLoadingState(button);
                        const contactSection = document.querySelector('#contact');
                        if (contactSection) {
                            const offsetTop = contactSection.getBoundingClientRect().top + window.pageYOffset - 80;
                            this.smoothScrollTo(offsetTop, 1000);
                        }
                    }, 1000);
                }
            });
        });
    }

    showLoadingState(button) {
        const originalText = button.innerHTML;
        button.dataset.originalText = originalText;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        button.disabled = true;
        button.style.opacity = '0.7';
    }

    hideLoadingState(button) {
        button.innerHTML = button.dataset.originalText;
        button.disabled = false;
        button.style.opacity = '1';
    }

    setupPreloader() {
        const preloader = document.createElement('div');
        preloader.className = 'preloader';
        preloader.innerHTML = `
            <div class="preloader-content">
                <div class="logo-icon">
                    <i class="fas fa-heart"></i>
                </div>
                <div class="loading-text">Loading...</div>
                <div class="loading-bar">
                    <div class="loading-progress"></div>
                </div>
            </div>
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            .preloader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #fefce8 0%, #f0fdf4 50%, #f0f9ff 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                transition: opacity 0.5s ease-out;
            }
            .preloader-content {
                text-align: center;
            }
            .preloader .logo-icon {
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #0891b2, #10b981);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 1.5rem;
                margin: 0 auto 1rem;
                animation: pulse 2s ease-in-out infinite;
            }
            .loading-text {
                font-size: 1.125rem;
                color: #0f172a;
                margin-bottom: 1rem;
                font-weight: 500;
            }
            .loading-bar {
                width: 200px;
                height: 4px;
                background: rgba(8, 145, 178, 0.1);
                border-radius: 2px;
                overflow: hidden;
                margin: 0 auto;
            }
            .loading-progress {
                height: 100%;
                background: linear-gradient(90deg, #0891b2, #10b981);
                border-radius: 2px;
                animation: loading 2s ease-in-out infinite;
            }
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
            @keyframes loading {
                0% { width: 0%; transform: translateX(-100%); }
                50% { width: 100%; transform: translateX(0); }
                100% { width: 100%; transform: translateX(100%); }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(preloader);
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.remove();
                    style.remove();
                }, 500);
            }, 800);
        });
    }

    setupAccessibility() {
        const skipLink = document.createElement('a');
        skipLink.href = '#home';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #0891b2;
            color: white;
            padding: 8px 16px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        this.setupKeyboardNavigation();
        
        this.setupFocusManagement();
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
        
        const focusStyle = document.createElement('style');
        focusStyle.textContent = `
            .keyboard-navigation *:focus {
                outline: 2px solid #0891b2 !important;
                outline-offset: 2px !important;
            }
        `;
        document.head.appendChild(focusStyle);
    }

    setupFocusManagement() {
        const mobileToggle = document.getElementById('mobile-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (mobileToggle && navMenu) {
            const focusableElements = navMenu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
            
            mobileToggle.addEventListener('click', () => {
                if (this.isMenuOpen && focusableElements.length > 0) {
                    setTimeout(() => focusableElements[0].focus(), 100);
                }
            });
        }
    }

    setupPerformanceOptimizations() {
        this.setupLazyLoading();
        
        this.setupResizeHandler();
        
        this.setupResourcePrefetching();
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
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
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }

    setupResizeHandler() {
        let resizeTimeout;
        
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
    }

    handleResize() {
        if (window.innerWidth > 768 && this.isMenuOpen) {
            this.toggleMobileMenu();
        }
        
        const floatingCards = document.querySelectorAll('.floating-card');
        floatingCards.forEach(card => {
            card.style.transform = '';
        });
    }

    setupResourcePrefetching() {
        const prefetchLinks = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap'
        ];
        
        prefetchLinks.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = href;
            document.head.appendChild(link);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const enhancer = new WebsiteEnhancer();
});

const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    /* Active navigation state */
    .nav-item a.active {
        color: var(--primary-teal) !important;
        background: linear-gradient(135deg, rgba(8, 145, 178, 0.1), rgba(16, 185, 129, 0.1)) !important;
    }
    
    .nav-item a.active::after {
        width: 70% !important;
    }
    
    /* Ripple effect keyframes */
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    /* Enhanced button hover effects */
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .btn::before {
        content: '';
        position: absolute;
        top: var(--mouse-y, 50%);
        left: var(--mouse-x, 50%);
        width: 0;
        height: 0;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: width 0.3s, height 0.3s;
        pointer-events: none;
    }
    
    .btn:hover::before {
        width: 300px;
        height: 300px;
    }
    
    /* Smooth transitions for all interactive elements */
    * {
        transition: transform 0.2s ease, opacity 0.2s ease;
    }
    
    /* Enhanced focus states */
    .btn:focus-visible,
    .nav-item a:focus-visible {
        outline: 2px solid var(--primary-teal);
        outline-offset: 2px;
    }
    
    /* Loading state animations */
    .btn:disabled {
        cursor: not-allowed;
    }
    
    .fa-spinner {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;

document.head.appendChild(additionalStyles);



function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;
    
    document.querySelectorAll('.floating__circle').forEach((circle, index) => {
        const speed = (index + 1) * 0.3;
        circle.style.transform = `translateY(${parallax * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

const profilePlaceholder = document.querySelector('.profile__placeholder');
profilePlaceholder.addEventListener('mouseenter', () => {
    profilePlaceholder.style.background = 'linear-gradient(135deg, var(--accent-green), var(--soft-lavender))';
});

profilePlaceholder.addEventListener('mouseleave', () => {
    profilePlaceholder.style.background = 'linear-gradient(135deg, var(--secondary-teal), var(--accent-green))';
});

const specialtyCards = document.querySelectorAll('.specialty__card');
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 150);
        }
    });
}, { threshold: 0.1 });

specialtyCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    cardObserver.observe(card);
});

function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

const highlights = document.querySelectorAll('.about__highlight');
const highlightObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.typed) {
            const originalText = entry.target.textContent;
            entry.target.dataset.typed = 'true';
            setTimeout(() => {
                typeWriter(entry.target, originalText, 80);
            }, 500);
        }
    });
}, { threshold: 0.5 });

highlights.forEach(highlight => {
    highlightObserver.observe(highlight);
});

//Service Section
 document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service__card').forEach(card => {
        observer.observe(card);
    });

    document.querySelectorAll('.service__card').forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            // Add subtle scale and glow effect
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 60px rgba(0,0,0,0.15)';
            
            const features = this.querySelectorAll('.service__features li');
            features.forEach((feature, i) => {
                setTimeout(() => {
                    feature.style.transform = 'translateX(5px)';
                    feature.style.color = 'var(--text-primary)';
                }, i * 50);
            });
        });

        card.addEventListener('mouseleave', function() {
            const features = this.querySelectorAll('.service__features li');
            features.forEach(feature => {
                feature.style.transform = 'translateX(0)';
                feature.style.color = 'var(--text-secondary)';
            });
        });
    });

    // Add click handlers for CTAs
    document.querySelectorAll('.service__cta').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelectorAll('.service__floating-circle');
        const speed = 0.5;

        parallax.forEach((element, index) => {
            const yPos = -(scrolled * speed * (index + 1) * 0.3);
            element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
        });
    });

    let hue = 0;
    setInterval(() => {
        hue = (hue + 1) % 360;
        const title = document.querySelector('.section__title');
        if (title) {
            title.style.background = `linear-gradient(135deg, 
                hsl(${hue + 180}, 70%, 45%), 
                hsl(${hue + 200}, 70%, 50%), 
                hsl(${hue + 120}, 70%, 55%))`;
            title.style.webkitBackgroundClip = 'text';
            title.style.backgroundClip = 'text';
        }
    }, 100);
});

const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    button {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

//Testimonials Section
document.querySelectorAll('.testimonial__card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.style.boxShadow = '0 30px 60px var(--shadow-medium)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 20px 40px var(--shadow-light)';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Add entrance animations with delays
    setTimeout(() => {
        document.querySelector('#testimonials .testimonial__title').classList.add('animate__fadeInDown');
    }, 200);
    
    setTimeout(() => {
        document.querySelector('#contact .testimonial__title').classList.add('animate__fadeInDown');
    }, 400);
});


//Contact section
// Add hover effects to contact methods
const contactMethods = document.querySelectorAll('.contact-method');
contactMethods.forEach(method => {
    method.addEventListener('click', function() {
        const span = this.querySelector('span');
        const text = span.textContent;
        
        // Copy to clipboard (if supported)
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                // Show temporary feedback
                const originalText = span.textContent;
                span.textContent = 'Copied!';
                span.style.color = 'var(--accent-green)';
                
                setTimeout(() => {
                    span.textContent = originalText;
                    span.style.color = 'var(--text-primary)';
                }, 1500);
            });
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const therapistName   = 'Connie';         // for the greeting
    const therapistNumber = '254787982266';   // in E.164, no “+”
  
    // 1. “Choose Package” buttons → WhatsApp
    document.querySelectorAll('.service__cta').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        const card = btn.closest('.service__card');
        const packageName = card.querySelector('.service__title').textContent.trim();
        const text = `Hello, I’d like to book the *${packageName}* package. My name is `;
        const url  = `https://wa.me/${therapistNumber}?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
      });
    });
  
    // 2. Contact form → WhatsApp with greeting, bullets, closing
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', e => {
      e.preventDefault();
  
      const name    = document.getElementById('name').value.trim();
      const email   = document.getElementById('email').value.trim();
      const subj    = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();
  
      const text =
        `Hello ${therapistName},\n\n` +
        `I hope you’re well. I’d like to schedule a consultation—here are my details:\n` +
        `• Name: ${name}\n` +
        `• Email: ${email}\n` +
        `• Subject: ${subj}\n` +
        `• Message: ${message}\n\n` +
        `Thank you,\n` +
        `${name}`;
  
      const url = `https://wa.me/${therapistNumber}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
  
      form.reset();
    });
  });
  

  