/* filepath: c:\Users\Migz Antonio\Desktop\portfolio\Migz-Portfolio-2025\assets\js\mobile-menu.js */
// Mobile menu functionality - Enhanced version
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    console.log('Mobile menu script loaded'); // Debug log
    console.log('Toggle element:', mobileMenuToggle); // Debug log
    console.log('Nav links element:', navLinks); // Debug log

    if (mobileMenuToggle && navLinks) {
        // Add click event to toggle button
        mobileMenuToggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            console.log('Mobile menu toggle clicked'); // Debug log

            // Toggle active classes
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            body.classList.toggle('menu-open');

            // Prevent scrolling when menu is open
            if (navLinks.classList.contains('active')) {
                body.style.overflow = 'hidden';
                console.log('Menu opened'); // Debug log
            } else {
                body.style.overflow = '';
                console.log('Menu closed'); // Debug log
            }
        });

        // Close menu when clicking on a link
        const navLinkItems = navLinks.querySelectorAll('a');
        navLinkItems.forEach(link => {
            link.addEventListener('click', function () {
                console.log('Nav link clicked, closing menu'); // Debug log
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
                body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
                body.style.overflow = '';
            }
        });

        // Handle window resize
        window.addEventListener('resize', function () {
            if (window.innerWidth > 968) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
                body.style.overflow = '';
            }
        });

        // Add touch events for better mobile support
        mobileMenuToggle.addEventListener('touchstart', function (e) {
            e.preventDefault();
            // Trigger click event
            mobileMenuToggle.click();
        });

    } else {
        console.error('Mobile menu elements not found!'); // Debug log
    }
});