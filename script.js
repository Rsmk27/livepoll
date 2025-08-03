// Particle system for animated sand-like particles
class ParticleSystem {
    constructor() {
        this.container = document.getElementById('particles');
        this.particles = [];
        this.maxParticles = 120; // Increased for more luxury
        this.init();
    }

    init() {
        this.createParticles();
        this.animate();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    createParticles() {
        for (let i = 0; i < this.maxParticles; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 1-6px for more variety
        const size = Math.random() * 5 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random horizontal position
        const startX = Math.random() * window.innerWidth;
        particle.style.left = `${startX}px`;
        
        // Enhanced random horizontal drift
        const randomX = (Math.random() - 0.5) * 150;
        particle.style.setProperty('--random-x', `${randomX}px`);
        
        // Random animation duration between 6-18 seconds for more variety
        const duration = Math.random() * 12 + 6;
        particle.style.animationDuration = `${duration}s`;
        
        // Random delay to stagger particles more
        const delay = Math.random() * 8;
        particle.style.animationDelay = `${delay}s`;
        
        // Enhanced random opacity for luxury effect
        const opacity = Math.random() * 0.8 + 0.3;
        particle.style.opacity = opacity;
        
        // Add particle to container
        this.container.appendChild(particle);
        this.particles.push({
            element: particle,
            duration: duration,
            delay: delay
        });
        
        // Remove and recreate particle after animation completes
        setTimeout(() => {
            this.recycleParticle(particle);
        }, (duration + delay) * 1000);
    }

    recycleParticle(oldParticle) {
        if (oldParticle && oldParticle.parentNode) {
            oldParticle.parentNode.removeChild(oldParticle);
        }
        
        // Create new particle to maintain count
        setTimeout(() => {
            this.createParticle();
        }, Math.random() * 2000);
    }

    handleResize() {
        // Update particle positions on resize
        const particles = this.container.querySelectorAll('.particle');
        particles.forEach(particle => {
            const newX = Math.random() * window.innerWidth;
            particle.style.left = `${newX}px`;
        });
    }
}

// Enhanced mouse interaction effects
class MouseEffects {
    constructor() {
        this.customCursor = document.getElementById('customCursor');
        this.init();
    }

    init() {
        this.initCustomCursor();
        this.createMouseTrail();
        this.addHoverEffects();
    }

    initCustomCursor() {
        document.addEventListener('mousemove', (e) => {
            this.customCursor.style.left = `${e.clientX - 10}px`;
            this.customCursor.style.top = `${e.clientY - 10}px`;
        });

        // Add hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('.nav-link, .company-name');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.customCursor.classList.add('hover');
            });
            
            element.addEventListener('mouseleave', () => {
                this.customCursor.classList.remove('hover');
            });
        });
    }

    createMouseTrail() {
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Create enhanced glow effect at mouse position
            if (Math.random() > 0.7) { // Reduce frequency for performance
                this.createLuxuryGlowEffect(mouseX, mouseY);
            }
        });
    }

    createLuxuryGlowEffect(x, y) {
        const glow = document.createElement('div');
        glow.style.position = 'fixed';
        glow.style.left = `${x}px`;
        glow.style.top = `${y}px`;
        glow.style.width = '30px';
        glow.style.height = '30px';
        glow.style.background = 'radial-gradient(circle, rgba(255, 215, 0, 0.6) 0%, rgba(255, 215, 0, 0.2) 50%, transparent 100%)';
        glow.style.borderRadius = '50%';
        glow.style.pointerEvents = 'none';
        glow.style.zIndex = '5';
        glow.style.transform = 'translate(-50%, -50%)';
        glow.style.animation = 'luxuryFadeOut 1.5s ease-out forwards';

        document.body.appendChild(glow);

        // Remove glow after animation
        setTimeout(() => {
            if (glow.parentNode) {
                glow.parentNode.removeChild(glow);
            }
        }, 1500);
    }

    addHoverEffects() {
        const companyName = document.querySelector('.company-name');
        
        companyName.addEventListener('mouseenter', () => {
            companyName.style.transform = 'scale(1.08)';
            companyName.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        companyName.addEventListener('mouseleave', () => {
            companyName.style.transform = 'scale(1)';
        });
    }
}

// Performance optimization
class PerformanceManager {
    constructor() {
        this.isHighPerformance = this.checkPerformance();
        this.init();
    }

    checkPerformance() {
        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return false;
        }

        // Check device capabilities
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        return !!(gl && window.requestAnimationFrame);
    }

    init() {
        if (!this.isHighPerformance) {
            this.optimizeForLowPerformance();
        }
    }

    optimizeForLowPerformance() {
        // Reduce particle count and disable custom cursor on low performance devices
        const style = document.createElement('style');
        style.textContent = `
            .particle {
                animation-duration: 20s !important;
            }
            .custom-cursor {
                display: none !important;
            }
            body {
                cursor: auto !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Accessibility enhancements
class AccessibilityManager {
    constructor() {
        this.init();
    }

    init() {
        this.addKeyboardNavigation();
        this.addScreenReaderSupport();
        this.addFocusManagement();
    }

    addKeyboardNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach((link, index) => {
            link.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    const nextIndex = (index + 1) % navLinks.length;
                    navLinks[nextIndex].focus();
                }
                
                if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prevIndex = (index - 1 + navLinks.length) % navLinks.length;
                    navLinks[prevIndex].focus();
                }
            });
        });
    }

    addScreenReaderSupport() {
        // Add ARIA labels
        const companyName = document.querySelector('.company-name');
        companyName.setAttribute('aria-label', 'RSMK Company Name');
        
        const nav = document.querySelector('.main-nav');
        nav.setAttribute('role', 'navigation');
        nav.setAttribute('aria-label', 'Main navigation');
    }

    addFocusManagement() {
        // Ensure focus is visible
        const style = document.createElement('style');
        style.textContent = `
            .nav-link:focus {
                outline: 2px solid #ffd700;
                outline-offset: 2px;
            }
        `;
        document.head.appendChild(style);
    }
}

// Add luxury fadeOut animation for mouse glow effect
const luxuryFadeOutStyle = document.createElement('style');
luxuryFadeOutStyle.textContent = `
    @keyframes luxuryFadeOut {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0);
        }
        25% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0.5);
        }
        50% {
            opacity: 0.9;
            transform: translate(-50%, -50%) scale(1);
        }
        75% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(1.3);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(2);
        }
    }
`;
document.head.appendChild(luxuryFadeOutStyle);
// Initialize all systems when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle system
    new ParticleSystem();
    
    // Initialize mouse effects
    new MouseEffects();
    
    // Initialize performance manager
    new PerformanceManager();
    
    // Initialize accessibility manager
    new AccessibilityManager();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Handle visibility change for performance
document.addEventListener('visibilitychange', () => {
    const particles = document.querySelectorAll('.particle');
    
    if (document.hidden) {
        // Pause animations when tab is not visible
        particles.forEach(particle => {
            particle.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations when tab becomes visible
        particles.forEach(particle => {
            particle.style.animationPlayState = 'running';
        });
    }
});