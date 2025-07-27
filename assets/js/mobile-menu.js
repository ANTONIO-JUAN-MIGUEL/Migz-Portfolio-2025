// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function () {
            // Toggle active classes
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            body.classList.toggle('menu-open');

            // Prevent scrolling when menu is open
            if (navLinks.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        // Close menu when clicking on a link
        const navLinkItems = navLinks.querySelectorAll('a');
        navLinkItems.forEach(link => {
            link.addEventListener('click', function () {
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
    }
});