// Enhanced button interactions and animations
document.addEventListener('DOMContentLoaded', function () {

    // Add pulse animation to buttons on page load
    const projectButtons = document.querySelectorAll('.project-card-img .btn');

    // Staggered pulse animation on load
    projectButtons.forEach((button, index) => {
        setTimeout(() => {
            button.classList.add('animate-pulse');

            // Remove pulse after animation completes
            setTimeout(() => {
                button.classList.remove('animate-pulse');
                // Add subtle breathing effect to keep them alive
                button.classList.add('btn-breathe');
            }, 4000);
        }, index * 300);
    });

    // Add ripple effect on click
    projectButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            // Add loading state
            this.classList.add('loading');

            // Create ripple effect
            createRipple(e, this);

            // Simulate loading (remove after navigation)
            setTimeout(() => {
                this.classList.remove('loading');
            }, 1000);
        });

        // Add magnetic effect on mouse move
        button.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;

            const tiltX = deltaY * 5;
            const tiltY = deltaX * -5;

            this.style.transform = `translateY(-8px) scale(1.05) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        });

        // Reset transform on mouse leave
        button.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });

        // Add focus ring animation
        button.addEventListener('focus', function () {
            this.style.animation = 'focusRing 0.3s ease-out';
        });

        button.addEventListener('blur', function () {
            this.style.animation = '';
        });
    });

    // Intersection Observer for entrance animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const button = entry.target.querySelector('.btn');
                if (button) {
                    button.style.animation = 'slideInUp 0.6s ease-out forwards';
                    button.style.animationDelay = '0.3s';
                }
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all project cards
    document.querySelectorAll('.project-card-img').forEach(card => {
        observer.observe(card);
    });
});

// Ripple effect function
function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.className = 'ripple';
    ripple.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
    `;

    element.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add additional CSS animations via JavaScript
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes focusRing {
        0% {
            box-shadow: 0 8px 25px rgba(231, 76, 60, 0.3);
        }
        50% {
            box-shadow: 0 8px 25px rgba(231, 76, 60, 0.6), 0 0 0 5px rgba(231, 76, 60, 0.3);
        }
        100% {
            box-shadow: 0 8px 25px rgba(231, 76, 60, 0.4), 0 0 0 3px rgba(231, 76, 60, 0.2);
        }
    }
    
    /* Particle effect on hover */
    .btn-particles {
        position: relative;
    }
    
    .btn-particles::before {
        content: '✨';
        position: absolute;
        top: -10px;
        right: -5px;
        opacity: 0;
        animation: sparkle 2s ease-in-out infinite;
        pointer-events: none;
    }
    
    @keyframes sparkle {
        0%, 100% {
            opacity: 0;
            transform: translateY(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: translateY(-5px) rotate(180deg);
        }
    }
`;
document.head.appendChild(additionalStyles);

// Add particle effects on special occasions
function addParticleEffect(button) {
    button.classList.add('btn-particles');
    setTimeout(() => {
        button.classList.remove('btn-particles');
    }, 3000);
}

// Random particle effects
setInterval(() => {
    const buttons = document.querySelectorAll('.project-card-img .btn');
    const randomButton = buttons[Math.floor(Math.random() * buttons.length)];
    if (randomButton && Math.random() > 0.7) {
        addParticleEffect(randomButton);
    }
}, 5000);