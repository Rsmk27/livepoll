// Particle system for animated sand-like particles
class ParticleSystem {
    constructor() {
        this.container = document.getElementById('particles');
        this.particles = [];
        this.maxParticles = 50;
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
        
        // Random size between 1-4px
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random horizontal position
        const startX = Math.random() * window.innerWidth;
        particle.style.left = `${startX}px`;
        
        // Random horizontal drift
        const randomX = (Math.random() - 0.5) * 100;
        particle.style.setProperty('--random-x', `${randomX}px`);
        
        // Random animation duration between 8-15 seconds
        const duration = Math.random() * 7 + 8;
        particle.style.animationDuration = `${duration}s`;
        
        // Random delay to stagger particles
        const delay = Math.random() * 5;
        particle.style.animationDelay = `${delay}s`;
        
        // Random opacity
        const opacity = Math.random() * 0.6 + 0.2;
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
        this.init();
    }

    init() {
        this.createMouseTrail();
        this.addHoverEffects();
    }

    createMouseTrail() {
        let mouseX = 0;
        let mouseY = 0;
        let trail = [];

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Create subtle glow effect at mouse position
            this.createGlowEffect(mouseX, mouseY);
        });
    }

    createGlowEffect(x, y) {
        const glow = document.createElement('div');
        glow.style.position = 'fixed';
        glow.style.left = `${x}px`;
        glow.style.top = `${y}px`;
        glow.style.width = '20px';
        glow.style.height = '20px';
        glow.style.background = 'radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%)';
        glow.style.borderRadius = '50%';
        glow.style.pointerEvents = 'none';
        glow.style.zIndex = '5';
        glow.style.transform = 'translate(-50%, -50%)';
        glow.style.animation = 'fadeOut 1s ease-out forwards';

        document.body.appendChild(glow);

        // Remove glow after animation
        setTimeout(() => {
            if (glow.parentNode) {
                glow.parentNode.removeChild(glow);
            }
        }, 1000);
    }

    addHoverEffects() {
        const companyName = document.querySelector('.company-name');
        
        companyName.addEventListener('mouseenter', () => {
            companyName.style.transform = 'scale(1.05)';
            companyName.style.transition = 'transform 0.3s ease';
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
        // Reduce particle count
        const style = document.createElement('style');
        style.textContent = `
            .particle {
                animation-duration: 20s !important;
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

// Add fadeOut animation for mouse glow effect
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0);
        }
        50% {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.5);
        }
    }
`;
document.head.appendChild(fadeOutStyle);

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