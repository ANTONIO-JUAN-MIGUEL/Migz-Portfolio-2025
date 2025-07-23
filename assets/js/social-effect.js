// Enhanced social media effects and interactions
document.addEventListener('DOMContentLoaded', function () {

    // Add magnetic effect to social links
    const socialLinks = document.querySelectorAll('.social-link, .contact-social-link');

    socialLinks.forEach(link => {
        link.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;

            const tiltX = deltaY * 3;
            const tiltY = deltaX * -3;

            this.style.transform = `translateY(-5px) scale(1.05) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        });

        link.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });

        // Add click animation
        link.addEventListener('click', function (e) {
            // Create burst effect
            createSocialBurst(e, this);

            // Add click feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Add floating animation to social links on page load
    const heroSocialLinks = document.querySelectorAll('.social-link');
    heroSocialLinks.forEach((link, index) => {
        setTimeout(() => {
            link.style.animation = 'socialFloatIn 0.8s ease-out forwards';
            link.style.animationDelay = `${index * 0.2}s`;
        }, 500);
    });

    // Add hover particles to social icons
    const socialIcons = document.querySelectorAll('.social-icon-wrapper, .contact-social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function () {
            createHoverParticles(this);
        });
    });

    // Add pulsing effect to footer social links
    const footerSocialLinks = document.querySelectorAll('.footer-social-link');
    footerSocialLinks.forEach((link, index) => {
        setTimeout(() => {
            link.style.animation = 'footerSocialPulse 2s ease-in-out infinite';
            link.style.animationDelay = `${index * 0.3}s`;
        }, 2000);
    });

    // Add scroll-triggered animations for contact social links
    const contactSocialLinks = document.querySelectorAll('.contact-social-link');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInRight 0.6s ease-out forwards';
            }
        });
    });

    contactSocialLinks.forEach(link => {
        observer.observe(link);
    });
});

// Create burst effect on social link click
function createSocialBurst(event, element) {
    const colors = element.classList.contains('facebook-link') || element.classList.contains('facebook-contact')
        ? ['#1877f2', '#4267B2', '#5890FF']
        : ['#e1306c', '#f58529', '#dd2a7b', '#8134af'];

    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 6px;
            height: 6px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
        `;

        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';

        document.body.appendChild(particle);

        const angle = (360 / 8) * i;
        const velocity = 150;
        const radian = (angle * Math.PI) / 180;
        const vx = Math.cos(radian) * velocity;
        const vy = Math.sin(radian) * velocity;

        particle.animate([
            {
                transform: 'scale(1) translate(0, 0)',
                opacity: 1
            },
            {
                transform: `scale(0) translate(${vx}px, ${vy}px)`,
                opacity: 0
            }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => particle.remove();
    }
}

// Create hover particles for social icons
function createHoverParticles(element) {
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.innerHTML = '✨';
            particle.style.cssText = `
                position: absolute;
                font-size: 12px;
                pointer-events: none;
                z-index: 100;
                animation: particleFloat 2s ease-out forwards;
            `;

            const rect = element.getBoundingClientRect();
            const x = rect.left + Math.random() * rect.width;
            const y = rect.top + Math.random() * rect.height;

            particle.style.left = x + 'px';
            particle.style.top = y + 'px';

            document.body.appendChild(particle);

            setTimeout(() => particle.remove(), 2000);
        }, i * 200);
    }
}

// Add additional CSS animations via JavaScript
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes socialFloatIn {
        from {
            opacity: 0;
            transform: translateY(50px) rotateX(90deg);
        }
        to {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
        }
    }
    
    @keyframes footerSocialPulse {
        0%, 100% {
            transform: scale(1);
            opacity: 0.8;
        }
        50% {
            transform: scale(1.05);
            opacity: 1;
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes particleFloat {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translateY(-30px) scale(0.5) rotate(180deg);
        }
    }
    
    /* Breathing effect for social icons */
    .social-icon-wrapper {
        animation: iconBreathe 4s ease-in-out infinite;
    }
    
    @keyframes iconBreathe {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
    
    /* Glow pulse effect */
    .social-link::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 50px;
        background: inherit;
        opacity: 0;
        animation: glowPulse 3s ease-in-out infinite;
        z-index: -1;
    }
    
    @keyframes glowPulse {
        0%, 100% {
            opacity: 0;
            transform: scale(1);
        }
        50% {
            opacity: 0.3;
            transform: scale(1.1);
        }
    }
`;
document.head.appendChild(additionalStyles);